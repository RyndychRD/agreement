//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class LogSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит все вхождения в таблице
   * @param {json} filter
   */
  async find(filter) {
    return await this.knexProvider("logs").select("*").where(filter);
  }

  /**
   * Создаёт новую запись в таблице логов
   * @param {*} log
   * @returns
   */
  async create(log) {
    return await this.knexProvider("logs").insert(log);
  }
}

module.exports = new LogSchema();
