/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_is_read", function (table) {
		table.increments("id");
		table.integer("document_id").unsigned();
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.integer("reader_id").unsigned();
		table.foreign("reader_id").references("users.id").onDelete("SET NULL");
		table.boolean("is_read").defaultTo(false);
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_is_read");
};
