//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class RightSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("rights")
      .first("rights.*")
      .orderBy("rights.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("rights")
      .select("rights.*")
      .orderBy("rights.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} right
   * @returns
   */
  async create(right) {
    return await this.knexProvider("rights").insert(right);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("rights").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, Right) {
    return await this.knexProvider("rights").where(filter).update(Right);
  }
}

module.exports = new RightSchema();
