/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_values", function (table) {
		table.increments("id");
		table.integer("document_id").unsigned();
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.integer("document_element_IO_dictionary_id").unsigned();
		table.text("value");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_values");
};
