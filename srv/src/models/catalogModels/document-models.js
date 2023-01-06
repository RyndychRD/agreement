//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Собирает информацию, которая привязана непосредственно к документу в таблице documents
   * @param {*} query
   * @returns
   */
  addForeignTablesInformation(query) {
    //Подтягиваем статусы документа
    query = query
      .select("document_statuses.name as document_status_name")
      .leftJoin(
        "document_statuses",
        "documents.document_status_id",
        "document_statuses.id"
      );
    //подтягиваем тип документа
    query = query
      .select("document_types.name as document_type_name")
      .leftJoin(
        "document_types",
        "documents.document_type_id",
        "document_types.id"
      );
    //подтягиваем создателя документа
    query = query
      .select("users.last_name as user_last_name")
      .select("users.first_name as user_first_name")
      .select("users.middle_name as user_middle_name")
      .leftJoin("users", "documents.creator_id", "users.id");
    return query;
  }
  /**
   * Собирает информацию по внутреннему наполнению документа(document_values, document_files ...)
   * @param {*} query
   * @returns
   */
  addDocumentData(query) {
    return query;
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   * @param {boolean} isAddForeignTables - Добавить разыменование метаданных документа?
   * @param {boolean} isAddDocumentData - Добавить разыменование данных документа, введенных пользователем?
   */
  async findOne({ filter, isAddForeignTables, isAddDocumentData }) {
    let query = this.knexProvider("documents")
      .first("documents.*")
      .orderBy("documents.id", "asc");

    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    if (isAddDocumentData) query = this.addDocumentData(query);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   * @param {boolean} isAddForeignTables - Добавить разыменование метаданных документа?
   * @param {boolean} isAddDocumentData - Добавить разыменование данных документа, введенных пользователем?
   */
  async find({ filter, isAddForeignTables, isAddDocumentData }) {
    let query = this.knexProvider("documents")
      .select("documents.*")
      .orderBy("documents.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTablesInformation(query);
    if (isAddDocumentData) query = this.addDocumentData(query);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} Document
   * @returns
   */
  async create(Document) {
    return await this.knexProvider("documents").insert(Document);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("documents").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, Document) {
    return await this.knexProvider("documents").where(filter).update(Document);
  }
}

module.exports = new DocumentSchema();
