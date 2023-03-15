//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class ArchiveLogEventTypesSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит все вхождения в таблице
   * @param {json} filter
   */
  async find(filter) {
    return await this.knexProvider("archive_log_event_types")
      .select("*")
      .where(filter);
  }
  async findOne(filter) {
    return await this.knexProvider("archive_log_event_types")
      .first("*")
      .where(filter);
  }
}

module.exports = new ArchiveLogEventTypesSchema();
