//Доступ в БД
const knexConfig = require("../../../../db/knexfile");

class DocumentTypeViewSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }
  addForeignTables(query) {
    query = query.select("document_types.name as document_type_name");
    query = query.leftJoin(
      "document_types",
      "document_type_views.document_type_id",
      "document_types.id"
    );
    return query;
  }
  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter, isAddForeignTables }) {
    let query = this.knexProvider("document_type_views")
      .first("document_type_views.*")
      .orderBy("document_type_views.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTables(query);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddForeignTables }) {
    let query = this.knexProvider("document_type_views")
      .select("document_type_views.*")
      .orderBy("document_type_views.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables) query = this.addForeignTables(query);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} Document
   * @returns
   */
  async create(Document) {
    return await this.knexProvider("document_type_views").insert(Document);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("document_type_views")
      .where(filter)
      .delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, Document) {
    return await this.knexProvider("document_type_views")
      .where(filter)
      .update(Document);
  }
}

module.exports = new DocumentTypeViewSchema();
