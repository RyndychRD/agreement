/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("document_element_IO_dictionary", function (table) {
			table.increments("id");
			table.string("key").unique().notNullable();
			table.text("name").notNullable();
			table.json("select_value").notNullable();
		})
		.alterTable("document_values", function (table) {
			table
				.foreign("document_element_IO_dictionary_id")
				.references("document_element_IO_dictionary.id")
				.onDelete("SET NULL");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("document_values", function (table) {
			table.dropForeign("document_element_IO_dictionary_id");
		})
		.dropTableIfExists("document_element_IO_dictionary");
};
