/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("document_statuses", function (table) {
			table.increments("id");
			table.string("name").comment("Название статуса для отображения");
			table.comment("Таблица со статусами документа");
		})

		.alterTable("documents", function (table) {
			table
				.foreign("document_status_id")
				.references("document_statuses.id")
				.onDelete("NO ACTION");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("documents", function (table) {
			table.dropForeign("document_status_id");
		})
		.dropTableIfExists("document_statuses");
};
