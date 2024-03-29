//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class RouteSchema {
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
    let query = this.knexProvider("document_type_default_routes")
      .first("document_type_default_routes.*")
      .orderBy("document_type_default_routes.id", "asc");
    if (filter) query = query.where(filter);
    query = this.addForeignTables(query);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter }) {
    let query = this.knexProvider("document_type_default_routes")
      .select("document_type_default_routes.*")
      .orderBy("document_type_default_routes.id", "asc");
    if (filter) query = query.where(filter);
    query = this.addForeignTables(query);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} route
   * @returns
   */
  async create(route) {
    return await this.knexProvider("document_type_default_routes").insert(
      route
    );
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("document_type_default_routes")
      .where(filter)
      .delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, route) {
    const query = this.knexProvider("document_type_default_routes")
      .where(filter)
      .update(route);
    return await query;
  }
}

module.exports = new RouteSchema();
