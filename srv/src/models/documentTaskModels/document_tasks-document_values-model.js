//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentTasksDocumentValuesSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  async find({ filter }) {
    let query = this.knexProvider("document_tasks-document_values")
      .select("document_tasks-document_values.*")
      .where(filter);
    return await query;
  }

  async create(values) {
    return await this.knexProvider("document_tasks-document_values").insert(
      values
    );
  }
}

module.exports = new DocumentTasksDocumentValuesSchema();
