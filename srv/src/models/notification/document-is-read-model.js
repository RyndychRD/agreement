//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentIsReadSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * @param {json} filter
   */
  async getNotifications({ filter }) {
    let query = this.knexProvider("document_is_read")
      .distinct("document_is_read.document_id")
      .where(filter);
    return await query;
  }
  async getNotificationsCount({ filter }) {
    let query = this.knexProvider("document_is_read")
      .countDistinct("document_is_read.document_id")
      .where(filter);
    return await query;
  }

  /**
   * @param {Array} files
   * @returns
   */
  async create(files) {
    return await this.knexProvider("document_is_read").insert(files);
  }
}

module.exports = new DocumentIsReadSchema();
