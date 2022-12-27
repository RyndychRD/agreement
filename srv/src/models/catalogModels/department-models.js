//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DepartmentSchema {
  constructor() {
    this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
  }

  rightsJoin(query) {
    return query
      .select(
        this.knexProvider.raw(
          "json_agg (json_build_object('name',rights.name,'id',rights.id)) rights"
        )
      )
      .innerJoin(
        "departments-rights",
        "departments-rights.department_id",
        "departments.id"
      )
      .innerJoin("rights", "departments-rights.right_id", "rights.id")
      .groupBy("departments.id");
  }

  /**
   * Находит первое вхождение в таблице
   * @param {json} filter
   */
  async findOne({ filter, isAddRights }) {
    let query = this.knexProvider("departments")
      .first("departments.*")
      .orderBy("departments.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddRights) {
      query = this.rightsJoin(query);
    }
    return await query;
  }

  /**
   * Находит все вхождение в таблице
   * @param {json} filter
   */
  async find({ filter, isAddRights }) {
    let query = this.knexProvider("departments")
      .select("departments.*")
      .orderBy("departments.id", "asc");
    if (filter) query = query.where(filter);
    if (isAddRights) {
      query = this.rightsJoin(query);
    }
    return await query;
  }

  /**
   * Создаёт новый департамент
   * @param {*} department
   * @returns
   */
  async create({ department, departmentRights }) {
    let response = await this.knexProvider("departments")
      .insert(department)
      .returning("id");
    return await this.knexProvider("departments-rights").insert(
      departmentRights.map((right) => ({
        department_id: response[0].id,
        right_id: right,
      }))
    );
  }
  /**
   * Удаляет департамент
   * @param {*} filter
   * @returns
   */
  async deleteOne(filter) {
    return await this.knexProvider("departments").where(filter).delete();
  }

  /**
   * Обновляет департамент
   * @param {*} filter
   * @returns
   */
  async update({ filter, department, departmentRights }) {
    console.log(departmentRights);
    await this.knexProvider("departments").where(filter).update(department);
    await this.knexProvider("departments-rights")
      .where({ department_id: filter.id })
      .del();
    return await this.knexProvider("departments-rights").insert(
      departmentRights.map((right) => ({
        department_id: filter.id,
        right_id: right,
      }))
    );
  }
}

module.exports = new DepartmentSchema();
