/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("departments-rights", function (table) {
		table.increments("id");
		table
			.integer("right_id")
			.unsigned()
			.comment("Ссылка на таблицу с общим списком прав");
		table.foreign("right_id").references("rights.id").onDelete("CASCADE");
		table
			.integer("department_id")
			.unsigned()
			.comment("Ссылка на общий список департаментов");
		table
			.foreign("department_id")
			.references("departments.id")
			.onDelete("CASCADE");
		table.comment(
			"Таблица, которая связывает департамент и права пользователя. Права пользователя определяются в зависимости от департамента"
		);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("departments-rights");
};
