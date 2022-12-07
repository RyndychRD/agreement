/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("departments-rights", function (table) {
		table.increments("id");
		table.integer("right_id").unsigned();
		table.foreign("right_id").references("rights.id").onDelete("CASCADE");
		table.integer("department_id").unsigned();
		table
			.foreign("department_id")
			.references("departments.id")
			.onDelete("CASCADE");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("departments-rights");
};
