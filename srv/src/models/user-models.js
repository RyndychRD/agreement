//Доступ в БД
const knexConfig = require('../../db/knexfile')

class UserSchema {
	constructor() {
		this.knexProvider = require('knex')(knexConfig[process.env.NODE_ENV])
	}

	/**
	 * Находит первое вхождение в таблице
	 * @param {json} filter
	 */
	async findOne(filter) {
		return await this.knexProvider('users').first('*').where(filter)
	}

	/**
	 * Находит все вхождение в таблице
	 * @param {json} filter
	 */
	async find(filter) {
		if (!filter) return await this.knexProvider('users').select('*')
		return await this.knexProvider('users').select('*').where(filter)
	}

	/**
	 * Создаёт нового пользователя
	 * @param {*} candidate
	 * @returns
	 */
	async create(candidate) {
		await this.knexProvider('users').insert(candidate)
		return await this.knexProvider('users').first('*').where({
			login: candidate.login,
		})
	}

	/**
	 * Обновляет пользователя
	 * @param {*} filter
	 * @returns
	 */
	async update(filter, token) {
		return await this.knexProvider('users').where(filter).update(token)
	}
}

module.exports = new UserSchema()
