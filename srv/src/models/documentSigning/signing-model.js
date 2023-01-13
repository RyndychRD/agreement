//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class SigningSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  addForeignTables(query) {
    query = query.select("document_types.name as document_type_name");
    query = query.leftJoin(
      "document_types",
      "document_type_default_routes.document_type_id",
      "document_types.id"
    );
    return query;
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("documents-signers_route")
      .select("documents-signers_route.*")
      .orderBy("documents-signers_route.step", "asc");
    if (filter) query = query.where(filter);
    // query = this.addForeignTables(query);
    return await query;
  }
}

module.exports = new SigningSchema();
