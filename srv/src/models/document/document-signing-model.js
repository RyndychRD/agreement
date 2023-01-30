//Доступ в БД
const knexConfig = require("../../../db/knexfile");

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
}

module.exports = new SigningSchema();
