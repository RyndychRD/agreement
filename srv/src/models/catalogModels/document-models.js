//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("documents")
      .first("documents.*")
      .orderBy("documents.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("documents")
      .select("documents.*")
      .orderBy("documents.id", "asc");
    if (filter) query = query.where(filter);
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
