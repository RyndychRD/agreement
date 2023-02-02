//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentTaskSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  addForeignTablesInformation(query) {
    //Подтягиваем статусы поручения
    query = query
      .select("document_task_statuses.name as document_task_status_name")
      .leftJoin(
        "document_task_statuses",
        "document_tasks.document_task_status_id",
        "document_task_statuses.id"
      );

    return query;
  }

  /**
   * @param {json} filter
   */
  async getDocumentTasks({ filter, isAddForeignTables }) {
    let query = this.knexProvider("document_tasks").select("document_tasks.*");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    return await query;
  }
}

module.exports = new DocumentTaskSchema();
