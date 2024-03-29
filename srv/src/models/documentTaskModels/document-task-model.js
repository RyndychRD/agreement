//Доступ в БД
const knexConfig = require("../../../db/knexfile");
const { DOCUMENT_STATUS_DELETE } = require("../../consts");

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

  //Вытаскиваем только один последний результат по подтвержденным для 2 страницы поручениям
  addConfirmedForSecondPageOnly(query) {
    query = query.limit(1).orderBy("id", "desc");
    return query;
  }

  /**
   * @param {json} filter
   */
  async getDocumentTasks({
    filter,
    isAddForeignTables,
    isConfirmedForSecondPageOnly,
  }) {
    let query = this.knexProvider("document_tasks")
      .select("document_tasks.*")
      .leftJoin("documents", "documents.id", "document_tasks.document_id")
      .where("documents.document_status_id", "!=", DOCUMENT_STATUS_DELETE);
    if (isConfirmedForSecondPageOnly) {
      filter["is_confirmed"] = true;
    }
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    if (isConfirmedForSecondPageOnly)
      query = this.addConfirmedForSecondPageOnly(query);
    return await query;
  }
  async getDocumentTask({ filter, isAddForeignTables }) {
    let query = this.knexProvider("document_tasks").first("document_tasks.*");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    return await query;
  }

  async create(documentTask) {
    return await this.knexProvider("document_tasks")
      .insert(documentTask)
      .returning("id");
  }
  async delete(filter) {
    return await this.knexProvider("document_tasks").where(filter).delete();
  }
  async update(filter, documentTask) {
    return await this.knexProvider("document_tasks")
      .where(filter)
      .update(documentTask)
      .returning("document_id");
  }
}

module.exports = new DocumentTaskSchema();
