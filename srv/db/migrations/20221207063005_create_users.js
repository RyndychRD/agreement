/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", function (table) {
		table.increments("id");
		table.string("login").notNullable();
		table.string("password").notNullable();
		table.string("email");
		table.string("last_name").notNullable();
		table.string("first_name").notNullable();
		table.string("middle_name");
		table.boolean("is_active").notNullable().defaultTo(true);
		table.integer("position_id").unsigned();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
