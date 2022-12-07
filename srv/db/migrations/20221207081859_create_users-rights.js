/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users-rights", function (table) {
		table.increments("id");
		table.integer("users_id").unsigned();
		table.foreign("users_id").references("users.id").onDelete("CASCADE");
		table.integer("rights_id").unsigned();
		table.foreign("rights_id").references("rights.id").onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users-rights");
};
