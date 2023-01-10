//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class TypeSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("document_types")
      .first("document_types.*")
      .orderBy("document_types.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("document_types")
      .select("document_types.*")
      .orderBy("document_types.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} right
   * @returns
   */
  async create(right) {
    return await this.knexProvider("document_types").insert(right);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("document_types").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, Right) {
    return await this.knexProvider("document_types")
      .where(filter)
      .update(Right);
  }
}

module.exports = new TypeSchema();
