//Доступ в БД
const knexConfig = require("../../../db/knexfile")

class PositionSchema {
   constructor() {
      this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV])
   }

   /**
    * Находит первое вхождение в таблице
    * @param {json} filter
    */
   async findOne(filter) {
      return await this.knexProvider("positions").first("*").where(filter)
   }

   /**
    * Находит все вхождение в таблице
    * @param {json} filter
    */
   async find(filter) {
      if (!filter)
         return await this.knexProvider("positions")
            .select("*")
            .orderBy("id", "asc")
      return await this.knexProvider("positions")
         .select("*")
         .where(filter)
         .orderBy("id", "asc")
   }

   //    /**
   //     * Создаёт новый департамент
   //     * @param {*} department
   //     * @returns
   //     */
   //    async create(department) {
   //       await this.knexProvider("positions").insert(department)
   //       return await this.find()
   //    }
   //    /**
   //     * Удаляет департамент
   //     * @param {*} token
   //     * @returns
   //     */
   //    async deleteOne(filter) {
   //       await this.knexProvider("positions").where(filter).delete()
   //       return await this.find()
   //    }

   //    /**
   //     * Обновляет департамент
   //     * @param {*} filter
   //     * @returns
   //     */
   //    async update(filter, department) {
   //       await this.knexProvider("positions").where(filter).update(department)
   //       return await this.find()
   //    }
}

module.exports = new PositionSchema()
