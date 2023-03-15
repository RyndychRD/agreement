//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentArchiveSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("document_archives")
      .first("document_archives.*")
      .where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} archive
   * @returns
   */
  async create(archive) {
    return await this.knexProvider("document_archives")
      .insert(archive)
      .onConflict("document_id")
      .merge();
  }
  async update({ archive, filter }) {
    return await this.knexProvider("document_archives")
      .update(archive)
      .where(filter);
  }

  async find({ filter }) {
    let query = this.knexProvider("document_archives")
      .select("document_archives.*")
      .where(filter);
    return await query;
  }
}

module.exports = new DocumentArchiveSchema();
