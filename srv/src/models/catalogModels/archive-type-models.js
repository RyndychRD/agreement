//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class ArchiveTypeSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter }) {
    let query = this.knexProvider("archive_types")
      .first("archive_types.*")
      .orderBy("archive_types.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find(props) {
    const { filter } = props;
    let query = this.knexProvider("archive_types")
      .select("archive_types.*")
      .orderBy("archive_types.id", "asc");
    if (filter) query = query.where(filter);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} right
   * @returns
   */
  async create(right) {
    return await this.knexProvider("archive_types").insert(right);
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("archive_types").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update(filter, ArchiveType) {
    return await this.knexProvider("archive_types")
      .where(filter)
      .update(ArchiveType);
  }
}

module.exports = new ArchiveTypeSchema();
