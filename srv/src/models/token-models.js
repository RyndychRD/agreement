//Доступ в БД
const knexConfig = require("../../db/knexfile");

class TokenSchema {
	constructor() {
		this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
	}

	/**
	 * Находит первое вхождение в таблице
	 * @param {json} filter
	 */
	async findOne(filter) {
		return await this.knexProvider("users_sessions").first("*").where(filter);
	}

	/**
	 * Создаёт новый токен
	 * @param {*} token
	 * @returns
	 */
	async create(token) {
		return await this.knexProvider("users_sessions").insert(token);
	}

	/**
	 * Обновляет токен
	 * @param {*} token
	 * @returns
	 */
	async update(filter, token) {
		return await this.knexProvider("users_sessions")
			.where(filter)
			.update(token);
	}

	/**
	 * Удаляет токен
	 * @param {*} token
	 * @returns
	 */
	async deleteOne(filter) {
		return await this.knexProvider("users_sessions").where(filter).delete();
	}
}

module.exports = new TokenSchema();
