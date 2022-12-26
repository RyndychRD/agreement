//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class UserSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne(filter) {
    let query = this.knexProvider("users")
      .first("users.*")
      .orderBy("users.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .first("positions.name as position_name")
        .first("departments.name as department_name")
        .leftJoin("positions", "users.position_id", "positions.id")
        .leftJoin("departments", "positions.department_id", "departments.id");
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddForeignTables }) {
    let query = this.knexProvider("users")
      .select("users.*")
      .orderBy("users.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .select("positions.name as position_name")
        .select("departments.name as department_name")
        .leftJoin("positions", "users.position_id", "positions.id")
        .leftJoin("departments", "positions.department_id", "departments.id");
    return await query;
  }
  // async find(filter) {
  //   if (!filter) return await this.knexProvider("users").select("*");
  //   return await this.knexProvider("users").select("*").where(filter);
  // }

  /**
   * Создаёт нового пользователя
   * @param {*} candidate
   * @returns
   */
  async create(candidate) {
    await this.knexProvider("users").insert(candidate);
    return await this.knexProvider("users").first("*").where({
      login: candidate.login,
    });
  }

  /**
   * Обновляет пользователя
   * @param {*} filter
   * @returns
   */
  async update(filter, token) {
    return await this.knexProvider("users").where(filter).update(token);
  }
}

module.exports = new UserSchema();
