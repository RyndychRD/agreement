//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class FAQSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }
  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("FAQs")
      .select("FAQs.*")
      .orderBy("FAQs.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }
}

module.exports = new FAQSchema();
