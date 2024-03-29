//Доступ в БД
const knexConfig = require("../../../db/knexfile");
const documentSigningHistoryModel = require("./document-signing-history-model");

class SigningSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOneDocument({ filter }) {
    let query = this.knexProvider("documents-signers_route")
      .select("documents-signers_route.*")
      .orderBy("documents-signers_route.step", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  async signCurrentStep({ filter, sign }) {
    const query = this.knexProvider("documents-signers_route")
      .where(filter)
      .update(sign)
      .returning("document_id");
    return await query;
  }

  async unsignLastStep({ filter }) {
    const sign = {
      remark: this.knexProvider.raw("DEFAULT"),
      actual_signer_id: this.knexProvider.raw("DEFAULT"),
      document_signature_type_id: this.knexProvider.raw("DEFAULT"),
      sign_date: this.knexProvider.raw("DEFAULT"),
    };
    const query = this.knexProvider("documents-signers_route")
      .where(filter)
      .update(sign)
      .returning("document_id");
    return await query;
  }

  async getOneStep({ filter }) {
    let query = this.knexProvider("documents-signers_route")
      .first("documents-signers_route.*")
      .where(filter)
      .orderBy("documents-signers_route.step", "asc");
    return await query;
  }
  /**
   * Создаёт новый путь для документа
   * @param {Array} routes
   * @returns
   */
  async create(routes) {
    return await this.knexProvider("documents-signers_route").insert(routes);
  }

  async update(filter, route) {
    return await this.knexProvider("documents-signers_route")
      .where(filter)
      .update(route)
      .returning("id");
  }

  async getCurrentDocumentSigningStep(documentId) {
    let query = this.knexProvider("documents-signers_route")
      .first("*")
      .whereRaw(`document_id=${documentId} AND actual_signer_id IS NULL`)
      .orderBy("step", "asc");

    return await query;
  }

  async deleteRouteSteps(documentId, lastStep) {
    let query = this.knexProvider("documents-signers_route")
      .whereRaw(
        `document_id=${documentId} AND step > ${lastStep} AND actual_signer_id IS NULL`
      )
      .delete()
      .returning("id")
      .then((deletedIds) => {
        if (deletedIds && deletedIds.length > 0) {
          deletedIds.forEach((deletedId) => {
            documentSigningHistoryModel.delete({
              "documents-signers_route_id": deletedId.id,
            });
          });
        }
      });

    return await query;
  }
}

module.exports = new SigningSchema();
