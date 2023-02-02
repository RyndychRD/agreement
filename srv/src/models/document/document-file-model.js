//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentFileSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  async findFiles({ filter }) {
    let query = this.knexProvider("document_files")
      .select("document_files.*")
      .orderBy("document_files.id", "asc")
      .where(filter);
    return await query;
  }

  async findFile({ filter }) {
    let query = this.knexProvider("document_files")
      .first("document_files.*")
      .orderBy("document_files.id", "asc")
      .where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} files
   * @returns
   */
  async create(files) {
    return await this.knexProvider("document_files").insert(files);
  }
}

module.exports = new DocumentFileSchema();
