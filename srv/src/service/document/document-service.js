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
      isAddDocumentData: query?.isAddDocumentData.trim() === "true",
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

  async getOneDocument(query) {
    const filter = {
      id: query.id,
    };
    const func = DocumentModels.findOne({
      isAddForeignTables: query?.isAddForeignTables === "true",
      isAddDocumentData: query?.isAddDocumentData === "true",
      filter,
    });
    return await DevTools.addDelay(func);
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
    if (!body?.documentRoute) return null;
    const insertArray = body.documentRoute.map((routeStep) => ({
      document_id: documentId,
      signer_id: routeStep.signerId,
      step: routeStep.step,
    }));
    const func = SigningModel.create(insertArray);
    return await DevTools.addDelay(func);
  }

  async createDocumentValues(body, documentId) {
    if (!body?.documentFilledInformation) return null;
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
    return await DevTools.addDelay(func);
  }

  async updateDocument(query, body) {
    const func = DocumentModels.update(
      {
        id: query.id,
      },
      {
        remark: body.newRemark,
      }
    );
    const result = await DevTools.addDelay(func);
    if (body?.newDocumentStatusId) {
      DocumentService.changeDocumentStatus(query.id, body.newDocumentStatusId);
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
}

module.exports = new DocumentService();
