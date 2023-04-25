//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentSigningHistorySchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   *
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("documents-signers_route_history")
      .select("documents-signers_route_history.*")
      .where(filter);
    return await query;
  }

  /**
   *
   * @param {Array|Object} history
   * @returns
   */
  async create(history) {
    return await this.knexProvider("documents-signers_route_history").insert(
      history
    );
  }
}

module.exports = new DocumentSigningHistorySchema();
