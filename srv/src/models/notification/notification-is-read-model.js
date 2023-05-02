//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentNotificationIsReadSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * @param {json} filter
   */
  async getNotifications({ filter }) {
    let query = this.knexProvider("notification_is_read")
      .distinct("notification_is_read.element_id")
      .select("notification_is_read.notification_type")
      .where(filter);
    return await query;
  }
  async getNotificationsCount({ filter }) {
    let query = this.knexProvider("notification_is_read")
      .countDistinct("notification_is_read.element_id")
      .select("notification_is_read.notification_type")
      .groupBy("notification_is_read.notification_type")
      .where(filter);
    return await query;
  }

  async readNotifications(filter) {
    let query = this.knexProvider("notification_is_read")
      .update({ is_read: true })
      .where(filter)
      .returning(["reader_id", "notification_type", "element_id"]);
    return await query;
  }

  /**
   * @param {Array} notifications
   * @returns
   */
  async create(notifications) {
    return await this.knexProvider("notification_is_read").insert(
      notifications
    );
  }
}

module.exports = new DocumentNotificationIsReadSchema();
