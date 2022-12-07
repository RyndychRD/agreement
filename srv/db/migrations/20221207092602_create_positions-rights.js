/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("positions-rights", function (table) {
			table.increments("id");
			table.integer("position_id").unsigned();
			table.foreign("position_id").references("positions.id");
			table.integer("rights_id").unsigned();
			table.foreign("rights_id").references("rights.id");
		})
		.alterTable("users", function (table) {
			table.integer("position_id").unsigned();
			table.foreign("position_id").references("positions.id");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("positions-rights");
};
