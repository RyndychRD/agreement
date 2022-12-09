/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_type_views", function (table) {
		table.increments("id");
		table.integer("document_type_id").unsigned();
		table
			.foreign("document_type_id")
			.references("document_types.id")
			.onDelete("SET NULL");
		table.json("view").comment("Список фрагментов для отображения");
		table.json("view_print").comment("Список фрагментов для печати");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_type_views");
};
