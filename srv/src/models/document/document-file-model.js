//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentFileSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  async findFiles({ filter }) {
    let query = this.knexProvider("documents-files")
      .select("files.*")
      .select("documents-files.*")
      .leftJoin("files", "files.id", "documents-files.file_id")
      .orderBy("documents-files.id", "asc")
      .where(filter);
    return await query;
  }

  async findFile({ filter }) {
    let query = this.knexProvider("documents-files")
      .select("files.*")
      .first("documents-files.*")
      .leftJoin("files", "files.id", "documents-files.file_id")
      .orderBy("documents-files.id", "asc")
      .where(filter);
    return await query;
  }

  /**
   * Создаёт новый путь для документа
   * @param {Array} files
   * @returns
   */
  async create(files) {
    return await this.knexProvider("documents-files").insert(files);
  }
}

module.exports = new DocumentFileSchema();
