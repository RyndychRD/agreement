//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class PositionSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  //Разыменовывание прав, принадлежащих непосредственно объекту. Наследуемые права тягаются отдельно
  rightsJoin(query, isAddForeignTables) {
    query = query
      .select(
        this.knexProvider.raw(
          "json_agg (json_build_object('name',rights.name,'id',rights.id)) rights"
        )
      )
      .innerJoin(
        "positions-rights",
        "positions-rights.position_id",
        "positions.id"
      )
      .innerJoin("rights", "positions-rights.right_id", "rights.id")
      .groupBy("positions.id");
    if (isAddForeignTables) query = query.groupBy("departments.name");
    return query;
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter, isAddForeignTables, isAddRights }) {
    let query = this.knexProvider("positions")
      .first("positions.*")
      .orderBy("positions.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .first("departments.name as department_name")
        .leftJoin("departments", "positions.department_id", "departments.id");
    if (isAddRights) query = this.rightsJoin(query, isAddForeignTables);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddForeignTables, isAddRights }) {
    let query = this.knexProvider("positions")
      .select("positions.*")
      .orderBy("positions.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddForeignTables)
      query = query
        .select("departments.name as department_name")
        .leftJoin("departments", "positions.department_id", "departments.id");
    if (isAddRights) query = this.rightsJoin(query, isAddForeignTables);
    return await query;
  }

  /**
   * Создаёт новую должность
   * @param {*} position
   * @returns
   */
  async create({ position, positionRights }) {
    let response = await this.knexProvider("positions")
      .insert(position)
      .returning("id");
    return await this.knexProvider("positions-rights").insert(
      positionRights.map((right) => ({
        position_id: response[0].id,
        right_id: right,
      }))
    );
  }
  /**
   * Удаляет должность
   * @param {*} token
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("positions").where(filter).delete();
  }

  /**
   * Обновляет должность
   * @param {*} filter
   * @returns
   */
  async update({ filter, position, positionRights }) {
    await this.knexProvider("positions").where(filter).update(position);
    await this.knexProvider("positions-rights")
      .where({ position_id: filter.id })
      .del();
    return await this.knexProvider("positions-rights").insert(
      positionRights.map((right) => ({
        position_id: filter.id,
        right_id: right,
      }))
    );
  }
}

module.exports = new PositionSchema();
