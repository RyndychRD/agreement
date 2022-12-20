//Доступ в БД
const knexConfig = require('../../../db/knexfile')

class DepartmentSchema {
	constructor() {
		this.knexProvider = require('knex')(knexConfig[process.env.NODE_ENV])
	}

	/**
	 * Находит первое вхождение в таблице
	 * @param {json} filter
	 */
	async findOne(filter) {
		return await this.knexProvider('departments').first('*').where(filter)
	}

	/**
	 * Находит все вхождение в таблице
	 * @param {json} filter
	 */
	async find(filter) {
		if (!filter) return await this.knexProvider('departments').select('*')
		return await this.knexProvider('departments').select('*').where(filter)
	}

	/**
	 * Создаёт новый департамент
	 * @param {*} department
	 * @returns
	 */
	async create(department) {
		await this.knexProvider('departments').insert(department)
		return await this.find()
	}

	/**
	 * Обновляет департамент
	 * @param {*} filter
	 * @returns
	 */
	async update(filter, department) {
		return await this.knexProvider('departments')
			.where(filter)
			.update(department)
	}
}

module.exports = new DepartmentSchema()