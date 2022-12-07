/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("positions", function (table) {
		table.increments("id");
		table.string("name");
		table.boolean("is_signer");
		table.integer("department_id").unsigned();
		table.foreign("department_id").references("departments.id");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("positions");
};
