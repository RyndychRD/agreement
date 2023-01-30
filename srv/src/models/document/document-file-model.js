//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentFileSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOneDocumentFiles({ filter }) {
    let query = this.knexProvider("document_files")
      .select("document_files.*")
      .orderBy("document_files.id", "asc");
    if (filter) query = query.where(filter);
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
