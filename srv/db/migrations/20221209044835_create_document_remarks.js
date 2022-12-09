/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_remarks", function (table) {
		table.increments("id");
		table.integer("document_id").unsigned();
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.integer("user_id").unsigned();
		table.foreign("user_id").references("users.id").onDelete("SET NULL");
		table.integer("position_id").unsigned();
		table
			.foreign("position_id")
			.references("positions.id")
			.onDelete("SET NULL");
		table.text("remark");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_remarks");
};
