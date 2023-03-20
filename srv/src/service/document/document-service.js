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
} = require("../file-service");
const NotificationService = require("../notification/notification-service");
const FilesModel = require("../../models/catalogModels/files-model");
const DocumentValuesService = require("./document-values-service");
const DocumentMitvorgModel = require("../../models/document/document-mitvorg-model");
const NotificationIsReadModel = require("../../models/notification/notification-is-read-model");
const DocumentArchiveModel = require("../../models/document/document-archive-model");
const moment = require("moment/moment");

function getCurrentSigner(document) {
  //Изначально никто не текущий подписант
  let currentSignerId = "-1";
  //Если у нас нет замещающего, то останется просто текущий подписант
  currentSignerId = document.current_signer_id
    ? document.current_signer_id
    : currentSignerId;
  //Если у нас есть замещающий, то он встанет на место текущего подписанта
  currentSignerId = document.current_deputy_signer_id
    ? document.current_deputy_signer_id
    : currentSignerId;
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
          "document_mitvorg.registration_date",
          ">=",
          dateCreationRange.start
        );
      }
      if (dateCreationRange?.end) {
        this.where(
          "document_mitvorg.registration_date",
          "<=",
          dateCreationRange.end
        );
      }
      this.where("documents.document_status_id", "=", 11);
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
      })
    );

    const func = DocumentFilesModel.create(insertArray);
    return await DevTools.addDelay(func);
  }

  async deleteDocument(query) {
    const func = await DocumentModels.deleteOne({
      id: query.id,
    });

    const readNotification = NotificationIsReadModel.readeNotifications({
      filter: {
        element_id: query.id,
        notification_type: "Signing",
      },
    });
    DevTools.addDelay(readNotification);
    return await DevTools.addDelay(func);
  }

  async updateDocumentMitvorgAndChangeStatus(body) {
    let result = null;
    const func = DocumentMitvorgModel.create({
      number: body.mitvorgNumber,
      registration_date: body.mitvorgRegistrationDate,
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
    if (body?.newRemark) {
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
    if (body?.newDocumentStatusId) {
      result = DocumentService.changeDocumentStatus(
        query.id,
        body.newDocumentStatusId
      );
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
        await DocumentService.changeDocumentStatus(documentAfterSigning.id, 4);
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
    NotificationService.notifyDocumentStatusChanged(documentId, newStatusId);
    return await DevTools.addDelay(func);
  }
  async changeDocumentStatusObj(documentId, newStatusId) {
    return DocumentService.changeDocumentStatus(documentId, newStatusId);
  }
}

module.exports = new DocumentService();
