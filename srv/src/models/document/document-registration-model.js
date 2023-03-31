//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentRegistrationSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("document_registration")
      .first("document_registration.*")
      .where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} registration
   * @returns
   */
  async create(registration) {
    return await this.knexProvider("document_registration").insert(
      registration
    );
  }
}

module.exports = new DocumentRegistrationSchema();
