//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentTaskFileSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }
  addFiles(query) {
    query = query.leftJoin(
      "files",
      "files.id",
      "documents_tasks-files.file_id"
    );
    return query;
  }
  async findFiles({ filter }) {
    let query = this.knexProvider("documents_tasks-files")
      .select("documents_tasks-files.*")
      .select("files.*")
      .orderBy("documents_tasks-files.id", "asc")
      .where(filter);
    query = this.addFiles(query);
    return await query;
  }

  async findFile({ filter }) {
    let query = this.knexProvider("documents_tasks-files")
      .first("documents_tasks-files.*")
      .select("files.*")
      .orderBy("documents_tasks-files.id", "asc")
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
    return await this.knexProvider("documents_tasks-files").insert(files);
  }
}

module.exports = new DocumentTaskFileSchema();
