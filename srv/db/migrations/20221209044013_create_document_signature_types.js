/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("document_signature_types", function (table) {
			table.increments("id");
			table.string("name").comment("Название статуса для отображения");
			table.comment(
				"Таблица, которая хранит в себе типы подписи документа(Согласован, не согласован и тд)"
			);
		})

		.alterTable("documents_signatures", function (table) {
			table
				.foreign("document_signature_type_id")
				.references("document_signature_types.id")
				.onDelete("NO ACTION");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("documents_signatures", function (table) {
			table.dropForeign("document_signature_type_id");
		})
		.dropTableIfExists("document_signature_types");
};
