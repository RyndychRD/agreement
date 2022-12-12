/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("documents", function (table) {
		table.increments("id");
		table
			.integer("document_status_id")
			.unsigned()
			.comment("Ссылка на статус документа(В работе/Исполнен и тд)");
		table
			.integer("document_type_id")
			.unsigned()
			.comment("Ссылка на тип документа(Закуп ТРУ и тд))");
		table
			.integer("creator_id")
			.unsigned()
			.comment("Ссылка на пользователя- создателя документа");

		table.foreign("creator_id").references("users.id").onDelete("SET NULL");
		table
			.string("name")
			.notNullable()
			.comment(
				"Название документа. Используется при генерации печатного листа"
			);
		table.timestamps(true, true);
		table
			.timestamp("finished_at")
			.comment("Время перехода в окончательный статус(Исполнено/Отклонено)");
		table.comment("Таблица со всеми документами, которые завели пользователи");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("documents");
};
