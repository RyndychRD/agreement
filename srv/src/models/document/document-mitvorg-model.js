//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentMitvorgSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("document_mitvorg")
      .first("document_mitvorg.*")
      .where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} mitvorg
   * @returns
   */
  async create(mitvorg) {
    return await this.knexProvider("document_mitvorg").insert(mitvorg);
  }
}

module.exports = new DocumentMitvorgSchema();
