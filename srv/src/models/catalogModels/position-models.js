//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class PositionSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter, isAddForeignTables }) {
    let query = this.knexProvider("positions")
      .first("positions.*")
      .orderBy("positions.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .first("departments.name as department_name")
        .leftJoin("departments", "positions.department_id", "departments.id");
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddForeignTables }) {
    let query = this.knexProvider("positions")
      .select("positions.*")
      .orderBy("positions.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .select("departments.name as department_name")
        .leftJoin("departments", "positions.department_id", "departments.id");
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} position
   * @returns
   */
  async create(position) {
    return await this.knexProvider("positions").insert(position);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("positions").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, position) {
    return await this.knexProvider("positions").where(filter).update(position);
  }
}

module.exports = new PositionSchema();
