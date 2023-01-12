//Доступ в БД
const knexConfig = require("../../../db/knexfile");

class DocumentStatusesSchema {
	constructor() {
		this.knexProvider = require("knex")(knexConfig[process.env.NODE_ENV]);
	}

	/**
	 * Находит первое вхождение в таблице
	 * @param {json} filter
	 */
	async findOne({ filter }) {
		let query = this.knexProvider("document_statuses")
			.first("document_statuses.*")
			.orderBy("document_statuses.id", "asc");
		if (filter) query = query.where(filter);
		return await query;
	}

	/**
	 * Находит все вхождение в таблице
	 * @param {json} filter
	 */
	async find({ filter }) {
		let query = this.knexProvider("document_statuses")
			.select("document_statuses.*")
			.orderBy("document_statuses.id", "asc");
		if (filter) query = query.where(filter);
		return await query;
	}

	/**
	 * Создаёт новую запись статуса
	 * @param {*} Document
	 * @returns
	 */
	async create(Document) {
		return await this.knexProvider("document_statuses").insert(Document);
	}
	/**
	 * Удаляет запись статуса
	 * @param {*} token
	 * @returns
	 */
	async deleteOne(filter) {
		return await this.knexProvider("document_statuses").where(filter).delete();
	}

	/**
	 * Обновляет запись статуса
	 * @param {*} filter
	 * @returns
	 */
	async update(filter, Document) {
		return await this.knexProvider("document_statuses")
			.where(filter)
			.update(Document);
	}
}

module.exports = new DocumentStatusesSchema();
