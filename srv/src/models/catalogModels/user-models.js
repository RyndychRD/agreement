//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class UserSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  rightsJoin(query, isAddForeignTables) {
    query = query.select(
      //Подтягиваем права, принадлежащие непосредственно объекту
      this.knexProvider.raw(
        "json_agg (json_build_object('name',rights.name,'id',rights.id,'code_name',rights.code_name)) rights"
      ),
      //Подтягиваем права, принадлежащие сюзеренам объекта(наследуемые права)
      this.knexProvider.raw(
        `json_agg (json_build_object('name',"inheritedRightsPosition".name,'id',"inheritedRightsPosition".id,'code_name',"inheritedRightsPosition".code_name,'isInherited',true)) rights_inherited_position`
      ),
      this.knexProvider.raw(
        `json_agg (json_build_object('name',"inheritedRightsDepartment".name,'id',"inheritedRightsDepartment".id,'code_name',"inheritedRightsDepartment".code_name,'isInherited',true)) rights_inherited_department`
      )
    );
    //Подтягиваем либо группировку, если уже есть таблица departments(для вытаскивания всех записей)
    //либо джойним таблицу departments для правильного разыменовывания прав
    if (isAddForeignTables) {
      query = query.groupBy("departments.name");
      query = query.groupBy("positions.name");
    } else {
      query = query
        .innerJoin("positions", "users.position_id", "positions.id")
        .innerJoin("departments", "positions.department_id", "departments.id");
    }
    //Джоиним права, принадлежащие непосредственно объекту
    query = query
      .leftJoin("users-rights", "users-rights.user_id", "users.id")
      .leftJoin("rights", "users-rights.right_id", "rights.id")
      //Джоиним наследуемые права от должности
      .leftJoin(
        "positions-rights",
        "positions-rights.position_id",
        "positions.id"
      )
      .leftJoin(
        "rights as inheritedRightsPosition",
        "positions-rights.right_id",
        "inheritedRightsPosition.id"
      )
      //Джоиним наследуемые права от должности
      .leftJoin(
        "departments-rights",
        "departments-rights.department_id",
        "departments.id"
      )
      .leftJoin(
        "rights as inheritedRightsDepartment",
        "departments-rights.right_id",
        "inheritedRightsDepartment.id"
      )
      .groupBy("users.id");

    return query;
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter, isAddForeignTables, isAddRights }) {
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
    if (isAddRights) query = this.rightsJoin(query, isAddForeignTables);
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddForeignTables, isAddRights }) {
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
    if (isAddRights) query = this.rightsJoin(query, isAddForeignTables);
    return await query;
  }

  /**
   * Создаёт нового пользователя
   * @param {*} candidate
   * @returns
   */
  async create({ candidate, userRights }) {
    let response = await this.knexProvider("users")
      .insert(candidate)
      .returning("id");
    if (userRights?.length) {
      await this.knexProvider("users-rights").insert(
        userRights.map((right) => ({
          user_id: response[0].id,
          right_id: right,
        }))
      );
    }
    return await this.knexProvider("users").first("*").where({
      login: candidate.login,
    });
  }

  /**
   * Обновляет пользователя
   * @param {*} filter
   * @returns
   */
  async update({ filter, user, userRights }) {
    await this.knexProvider("users").where(filter).update(user);
    await this.knexProvider("users-rights").where({ user_id: filter.id }).del();
    if (userRights?.length)
      await this.knexProvider("users-rights").insert(
        userRights.map((right) => ({
          user_id: filter.id,
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
    return await this.knexProvider("users").where(filter).delete();
  }
}

module.exports = new UserSchema();
