//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentValuesSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOneDocumentValues({ filter }) {
    let query = this.knexProvider("document_values")
      .select("document_values.*")
      .orderBy("document_values.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} routes
   * @returns
   */
  async create(routes) {
    return await this.knexProvider("document_values").insert(routes);
  }
}

module.exports = new DocumentValuesSchema();
