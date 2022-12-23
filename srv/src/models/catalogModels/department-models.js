//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DepartmentSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne(filter) {
    return await this.knexProvider("departments").first("*").where(filter);
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find(filter) {
    if (!filter)
      return await this.knexProvider("departments")
        .select("*")
        .orderBy("id", "asc");
    return await this.knexProvider("departments")
      .select("*")
      .where(filter)
      .orderBy("id", "asc");
  }

  /**
   * Создаёт новый департамент
   * @param {*} department
   * @returns
   */
  async create(department) {
    return await this.knexProvider("departments").insert(department);
  }
  /**
   * Удаляет департамент
   * @param {*} filter
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("departments").where(filter).delete();
  }

  /**
   * Обновляет департамент
   * @param {*} filter
   * @returns
   */
  async update(filter, department) {
    return await this.knexProvider("departments")
      .where(filter)
      .update(department);
  }
}

module.exports = new DepartmentSchema();
