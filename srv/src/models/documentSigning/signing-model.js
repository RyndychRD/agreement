//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class SigningSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOneDocument({ filter }) {
    let query = this.knexProvider("documents-signers_route")
      .select("documents-signers_route.*")
      .orderBy("documents-signers_route.step", "asc");
    if (filter) query = query.where(filter);
    // query = this.addForeignTables(query);
    return await query;
  }

  async signCurrentStep({ filter, sign }) {
    const query = this.knexProvider("documents-signers_route")
      .where(filter)
      .update(sign);

    return await query;
  }
}

module.exports = new SigningSchema();
