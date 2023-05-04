const DocumentModels = require("../../models/catalogModels/document-models");
const SigningModel = require("../../models/document/document-signing-model");
const DocumentValuesModel = require("../../models/document/document-values-models");
const DocumentFilesModel = require("../../models/document/document-file-model");
const DevTools = require("../DevTools");
const { getOneUser } = require("../catalogServices/user-service");
const fs = require("fs");
const {
  createDocumentFilePath,
  getDocumentFileDirectoryPath,
  getFileTempPath,
  deleteFile,
} = require("../file-service");
const NotificationService = require("../notification/notification-service");
const FilesModel = require("../../models/catalogModels/files-model");
const DocumentRegistrationModel = require("../../models/document/document-registration-model");
const DocumentArchiveModel = require("../../models/document/document-archive-model");
const moment = require("moment/moment");
const DocumentTasksService = require("../documentTasksService/document-task-service");
const {
  DOCUMENT_STATUS_ARCHIVE,
  DOCUMENT_STATUS_APPROVED,
} = require("../../consts");
const NotificationIsReadService = require("../notification/notification-is-read-service");
const documentFilesService = require("./document-files-service");

function getCurrentSigner(document) {
  const currentSignerId = document.current_signer_id
    ? document.current_signer_id
    : -1;
  return currentSignerId;
}

class DocumentService {
  async getAllDocuments({ query, userId }) {
    let filter = {};
    if (query?.status && query?.status.trim() !== "0") {
      filter.document_status_id = query.status.trim();
    }

    filter.creator_id = userId ? userId : -1;

    //При передачи флага показать все документы или при запросе подписываемых документов удаляем ограничения на пользователя
    if (
      query?.isShowAllDocs.trim() === "true" ||
      query?.isOnlyForSigningDocuments.trim() === "true" ||
      query?.isOnlyMySignedDocuments.trim() === "true"
    ) {
      delete filter.creator_id;
    }

    const func = DocumentModels.find({
      isAddForeignTables: query?.isAddForeignTables.trim() === "true",
      isOnlyForSigningDocuments:
        query?.isOnlyForSigningDocuments.trim() === "true",
      isOnlyMySignedDocuments: query?.isOnlyMySignedDocuments.trim() === "true",
      filter,
      currentUser: userId,
      isShowDeletedDocs: query?.isShowDeletedDocs.trim() === "true",
    });
    //подтягиваем общее количество шагов для подписания
    //разыменовываем текущего подписанта
    let documents = await func;
    if (query?.isAddForeignTables.trim() === "true") {
      documents = await Promise.all(
        documents.map(async (document) => {
          const currentSignerId = getCurrentSigner(document);
          return {
            ...document,
            route_steps_count:
              await DocumentService.getOneDocumentRouteStepsCount(document.id),
            current_signer: await getOneUser({
              id: currentSignerId,
              isAddForeignTables: "true",
            }),
            creator: await getOneUser({
              id: document.creator_id,
              isAddForeignTables: "true",
            }),
          };
        })
      );
    }
    // Подтягиваем количество выполненных и общее количество задач по документу
    if (query?.isOnlyForSigningDocuments.trim() === "true") {
      documents = await Promise.all(
        documents.map(async (document) => {
          let documentTasksForDocument =
            await DocumentTasksService.getDocumentTasksByDocument(
              {
                documentId: document.id,
              },
              null
            );
          return {
            ...document,
            document_tasks_assigned_count: documentTasksForDocument.length,
            document_tasks_completed_count: documentTasksForDocument.filter(
              (task) => task.document_task_status_id === 2
            ).length,
          };
        })
      );
    }
    // Если передан тип интересующих поручений, то вытаскиваем их
    if (query?.addDocumentTasksByType.trim() != -1) {
      let typeId = query?.addDocumentTasksByType.trim();
      typeId = typeId === "all" ? undefined : typeId;
      documents = await Promise.all(
        documents.map(async (document) => {
          let documentTasksForDocument =
            await DocumentTasksService.getDocumentTasks({
              document_task_type_id: typeId,
              document_id: document.id,
            });
          return {
            ...document,
            document_tasks_by_type: {
              type: typeId,
              tasks: documentTasksForDocument,
            },
          };
        })
      );
    }
    return await documents;
  }
  async getAllDocumentArchives(props) {
    const { query } = props;
    const archiveTypes = JSON.parse(query.archiveTypes);
    const dateCreationRange = query.dateCreationRange
      ? JSON.parse(query.dateCreationRange)
      : {};
    const filter = function () {
      if (dateCreationRange?.start) {
        this.where(
          "document_registration.registration_date",
          ">=",
          dateCreationRange.start
        );
      }
      if (dateCreationRange?.end) {
        this.where(
          "document_registration.registration_date",
          "<=",
          dateCreationRange.end
        );
      }
      this.where("documents.document_status_id", "=", DOCUMENT_STATUS_ARCHIVE);
      this.whereIn("document_archives.archive_type_id", archiveTypes);
    };

    const func = DocumentModels.find({
      isAddForeignTables: true,
      filter,
    });
    //подтягиваем общее количество шагов для подписания
    //разыменовываем текущего подписанта
    let documents = await func;
    documents = await Promise.all(
      documents.map(async (document) => {
        return {
          ...document,
          creator: await getOneUser({
            id: document.creator_id,
            isAddForeignTables: "true",
          }),
        };
      })
    );
    return await documents;
  }

  async getOneDocument(query) {
    const filter = {
      "documents.id": query.id,
    };
    const func = DocumentModels.findOne({
      isAddForeignTables: query?.isAddForeignTables === "true",
      isGetDocumentArchiveType: query?.isGetDocumentArchiveType === "true",
      filter,
    });
    let document = await DevTools.addDelay(func);
    if (query?.isAddForeignTables.trim() === "true") {
      const currentSignerId = getCurrentSigner(document);
      document = await {
        ...document,
        route_steps_count: await DocumentService.getOneDocumentRouteStepsCount(
          document.id
        ),
        current_signer: await getOneUser({
          id: currentSignerId,
          isAddForeignTables: "true",
        }),
        creator: await getOneUser({
          id: document.creator_id,
          isAddForeignTables: "true",
        }),
      };
    }

    return document;
  }

  /**
   * Создание документы проходит через стадии
   * 1. Создание самого документа, заполнение имени, создателя, типа документа
   * 2. Заполнение маршрута документа
   * 3. Заполнение данных по документу
   * 4. Заполнение файлов по документу
   */
  async createNewDocument(body, currentUserId) {
    const newDocument = await DocumentService.createDocument(
      body,
      currentUserId
    );
    const newDocumentId = newDocument[0].id;
    await this.createDocumentSignerRoute(body, newDocumentId);
    await this.createDocumentValues(body, newDocumentId);
    await this.createDocumentFiles(body, newDocumentId, currentUserId);
    NotificationService.notifyDocumentSigning(newDocumentId);
    return newDocument;
  }

  static async createDocument(body, creatorId) {
    const func = await DocumentModels.create({
      name: body.documentName,
      document_status_id: body.documentStatusId,
      document_type_id: body.documentTypeId,
      creator_id: creatorId,
    });
    return await DevTools.addDelay(func);
  }
  async createDocumentSignerRoute(body, documentId) {
    if (!body?.documentRoute || body.documentRoute.length === 0) return null;
    const insertArray = body.documentRoute.map((routeStep) => ({
      document_id: documentId,
      signer_id: routeStep.signerId,
      step: routeStep.step,
    }));
    const func = SigningModel.create(insertArray);
    return await DevTools.addDelay(func);
  }

  async createDocumentValues(body, documentId) {
    if (
      !body?.documentFilledInformation ||
      body.documentFilledInformation.length === 0
    )
      return null;
    const insertArray = body.documentFilledInformation.map((valueStep) => ({
      document_id: documentId,
      document_element_IO_dictionary_key: valueStep.key,
      value: valueStep.value,
      label: valueStep.label,
    }));
    const func = DocumentValuesModel.create(insertArray);
    return await DevTools.addDelay(func);
  }

  async createDocumentFiles(body, documentId) {
    if (!body?.documentFileIds || body.documentFileIds.length === 0)
      return null;

    DevTools.createFolderIfNotExist(
      await getDocumentFileDirectoryPath({
        documentId,
      })
    );

    const insertArray = await Promise.all(
      body.documentFileIds.map(async (fileIdToSave) => {
        const file = await FilesModel.findOne(fileIdToSave);
        if (file) {
          const tempFilePath = getFileTempPath(file.path);
          const storageFilePath = await createDocumentFilePath({
            documentId,
            fileUuid: file.uniq,
            fileName: file.name,
          });
          // Передвигаем файл в место постоянного хранения. Функция ассинхронна, дожидаться завершения не будет
          // TODO: Сделать нормальную обработку ошибки
          fs.rename(tempFilePath, storageFilePath, function (err) {
            if (err) {
              console.log(err);
            }
          });
          file.isTemp = false;
          file.path = await createDocumentFilePath(
            {
              documentId,
              fileUuid: file.uniq,
              fileName: file.name,
            },
            false
          );
          FilesModel.update({ file });

          return {
            document_id: documentId,
            file_id: file.id,
          };
        }
        return {};
      })
    );

    const func = DocumentFilesModel.create(insertArray);
    return await DevTools.addDelay(func);
  }

  async deleteDocument(query) {
    const documentFiles = await documentFilesService.getFiles({
      query: { documentId: query.id },
    });

    // Удаляем все файлы, привязанные к этому документу
    if (documentFiles && documentFiles.length > 0) {
      documentFiles.forEach((file) => {
        deleteFile(file);
      });
      DevTools.deleteFileFolder(documentFiles[0].path);
    }

    const func = await DocumentModels.deleteOne({
      id: query.id,
    });
    return await DevTools.addDelay(func);
  }

  async updateDocumentRegistrationAndChangeStatus(body) {
    let result = null;
    const func = DocumentRegistrationModel.create({
      registration_number: body.registrationNumber,
      registration_date: body.registrationDate,
      document_id: body.documentId,
    });
    result = await DevTools.addDelay(func);
    result = DocumentService.changeDocumentStatus(
      body.documentId,
      body.newDocumentStatusId
    );

    return result;
  }

  async setArchiveType(body) {
    let result = null;
    const archive = {
      document_id: body.documentId,
      archive_type_id: body.archiveTypeId,
    };
    // Мы можем предварительно определить время, после которого мы должны отправить документ в архив
    // Или пользователь может сам отправить документ в архив, тогда проверять дату этого документа нет смысла
    if (body.isAddPassBy) {
      archive.pass_by = moment().add(1, "month").format("YYYY-MM-DD");
    } else {
      archive.passed_at = "now";
      archive.pass_by = null;
    }
    const func = DocumentArchiveModel.create(archive);
    result = await DevTools.addDelay(func);

    return result;
  }

  async updateDocument(query, body) {
    let result = null;
    if (body?.newRemark !== undefined) {
      const func = DocumentModels.update(
        {
          id: query.id,
        },
        {
          remark: body.newRemark,
        }
      );
      result = await DevTools.addDelay(func);
    }
    if (body?.finishedAt) {
      const func = DocumentModels.update(
        {
          id: query.id,
        },
        {
          finished_at: body.finishedAt,
        }
      );
      result = await DevTools.addDelay(func);
    }
    // Если мы удаляем документ и запоминаем предыдущий статус, то нотификация нам не нужна
    if (body?.newDocumentStatusId && !body?.previousDocumentStatusId) {
      result = DocumentService.changeDocumentStatus(
        query.id,
        body.newDocumentStatusId
      );
    }
    if (body?.newDocumentStatusId && body?.previousDocumentStatusId) {
      const filter = function () {
        this.whereIn(
          "notification_type",
          NotificationIsReadService.documentNotificationTypes.concat(
            NotificationIsReadService.documentTaskNotificationTypes
          )
        );
        this.where("document_id", "=", query.id);
        this.where("is_read", "=", "false");
      };
      NotificationIsReadService.readNotifications(null, null, filter);
      const func = DocumentModels.update(
        {
          id: query.id,
        },
        {
          document_status_id: body.newDocumentStatusId,
          document_status_before_soft_delete: body.previousDocumentStatusId,
        }
      );
      result = await DevTools.addDelay(func);
    }
    return result;
  }

  static async getOneDocumentRouteStepsCount(documentId) {
    if (!documentId) return null;
    const func = SigningModel.findOneDocument({
      filter: {
        "documents-signers_route.document_id": documentId,
      },
    });
    const steps = await DevTools.addDelay(func);
    return steps.length;
  }

  async changeDocumentLastSignedStep({ documentId, isIncrement }) {
    const func = DocumentModels.changeLastSignedStep({
      documentId,
      isIncrement,
    });
    const documentAfterSigning = await DevTools.addDelay(func);
    //Проверять на статус согласованно имеет смысл только при увеличении шага подписи
    if (isIncrement) {
      const documentRouteStepsCount =
        await DocumentService.getOneDocumentRouteStepsCount(
          documentAfterSigning.id
        );
      if (documentRouteStepsCount === documentAfterSigning.last_signed_step) {
        //Поменять статус на Согласовано
        await DocumentService.changeDocumentStatus(
          documentAfterSigning.id,
          DOCUMENT_STATUS_APPROVED
        );
      }
    }
    return documentAfterSigning;
  }

  static async changeDocumentStatus(documentId, newStatusId) {
    const func = DocumentModels.update(
      {
        id: documentId,
      },
      {
        document_status_id: newStatusId,
      }
    );

    const filter = function () {
      this.whereIn(
        "notification_type",
        NotificationIsReadService.documentNotificationTypes.concat(
          NotificationIsReadService.documentTaskNotificationTypes
        )
      );
      this.where("element_id", "=", documentId);
      this.where("is_read", "=", "false");
    };
    await NotificationIsReadService.readNotifications(null, null, filter);
    NotificationService.notifyDocumentStatusChanged(documentId, newStatusId);
    return await DevTools.addDelay(func);
  }

  // Создано из-за проблем с циркулярными зависимостями. Используется в schedule
  async changeDocumentStatusObj(documentId, newStatusId) {
    return DocumentService.changeDocumentStatus(documentId, newStatusId);
  }
}

module.exports = new DocumentService();
