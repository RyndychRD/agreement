const { default: knex } = require("knex");
const DocumentModels = require("../../models/catalogModels/document-models");
const signingModel = require("../../models/documentSigning/signing-model");
const DevTools = require("../DevTools");
const { getOneUser } = require("./user-service");

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
  async createNewDocument(body) {
    const func = await DocumentModels.create({
      name: body.newDocumentName,
    });
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
        name: body.newDocumentName,
      }
    );
    return await DevTools.addDelay(func);
  }
  static async getOneDocumentRouteStepsCount(documentId) {
    if (!documentId) return null;
    const func = signingModel.findOneDocument({
      filter: {
        "documents-signers_route.document_id": documentId,
      },
    });
    const steps = await DevTools.addDelay(func);
    return steps.length;
  }
  async incrementDocumentLastSignedStepBySignedStepId({ stepId }) {
    const func = DocumentModels.incrementLastSignedStepByStepId({ stepId });
    const documentAfterSigning = await DevTools.addDelay(func);
    const documentRouteStepsCount =
      await DocumentService.getOneDocumentRouteStepsCount(
        documentAfterSigning.id
      );
    if (documentRouteStepsCount === documentAfterSigning.last_signed_step) {
      //Поменять статус на Согласовано
      await DocumentService.changeDocumentStatus(documentAfterSigning.id, 4);
    }
    return documentAfterSigning;
  }

  static async changeDocumentStatus(documentId, newStatusId) {
    return await DocumentModels.update(
      {
        id: documentId,
      },
      {
        document_status_id: newStatusId,
      }
    );
  }
}

module.exports = new DocumentService();
