//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class PositionSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  rightsJoin(query, isAddForeignTables) {
    query = query.select(
      //Подтягиваем права, принадлежащие непосредственно объекту
      this.knexProvider.raw(
        "json_agg (json_build_object('name',rights.name,'id',rights.id)) rights"
      ),
      //Подтягиваем права, принадлежащие сюзеренам объекта(наследуемые права)
      this.knexProvider.raw(
        `json_agg (json_build_object('name',"inheritedRights".name,'id',"inheritedRights".id,'isInherited',true)) rights_inherited`
      )
    );
    //Подтягиваем либо группировку, если уже есть таблица departments(для вытаскивания всех записей)
    //либо джойним таблицу departments для правильного разыменовывания прав
    if (isAddForeignTables) {
      query = query.groupBy("departments.name");
    } else {
      query = query.innerJoin(
        "departments",
        "positions.department_id",
        "departments.id"
      );
    }
    //Джоиним права, принадлежащие непосредственно объекту
    query = query
      .innerJoin(
        "positions-rights",
        "positions-rights.position_id",
        "positions.id"
      )
      .innerJoin("rights", "positions-rights.right_id", "rights.id")
      //Джоиним наследуемые права
      .innerJoin(
        "departments-rights",
        "departments-rights.department_id",
        "departments.id"
      )
      .innerJoin(
        "rights as inheritedRights",
        "departments-rights.right_id",
        "inheritedRights.id"
      )
      .groupBy("positions.id");

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
