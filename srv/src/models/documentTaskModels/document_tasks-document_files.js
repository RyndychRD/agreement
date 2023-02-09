//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentTasksDocumentFilesSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  async find({ filter }) {
    let query = this.knexProvider("documents_tasks-document_files")
      .select("documents_tasks-document_files.*")
      .where(filter);
    return await query;
  }

  async create(values) {
    return await this.knexProvider("documents_tasks-document_files").insert(
      values
    );
  }
}

module.exports = new DocumentTasksDocumentFilesSchema();
