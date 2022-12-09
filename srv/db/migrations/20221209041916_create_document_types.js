/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("document_types", function (table) {
			table.increments("id");
			table
				.string("name")
				.comment(
					"Название типа документа. По сути тип документа влияет на отображение и на шаблон маршрута"
				);
		})
		.alterTable("documents", function (table) {
			table
				.foreign("document_type_id")
				.references("document_types.id")
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
			table.dropForeign("document_type_id");
		})
		.dropTableIfExists("document_types");
};
