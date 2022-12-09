/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("departments", function (table) {
		table.increments("id");
		table
			.string("name")
			.comment(
				"Название департамента для отображения и использования в документах"
			);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("departments");
};
