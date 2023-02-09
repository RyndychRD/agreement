//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentFileSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  addFiles(query) {
    query = query.leftJoin("files", "files.id", "documents-files.file_id");
    return query;
  }

  async findFiles({ filter }) {
    let query = this.knexProvider("documents-files")
      .select("documents-files.*")
      .select("files.*")
      .orderBy("documents-files.id", "asc")
      .where(filter);
    query = this.addFiles(query);
    return await query;
  }

  async findFile({ filter }) {
    let query = this.knexProvider("documents-files")
      .first("documents-files.*")
      .select("files.*")
      .orderBy("documents-files.id", "asc")
      .where(filter);
    query = this.addFiles(query);
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
