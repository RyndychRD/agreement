/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("positions", function (table) {
			table.increments("id");
			table
				.string("name")
				.comment(
					"Название должности для отображения и использования в документах"
				);
			table
				.boolean("is_signer")
				.comment("Может ли пользователь этой должности являться подписантом");
			table
				.integer("department_id")
				.unsigned()
				.comment("Ссылка на департамент, к которому относится должность");
			table
				.foreign("department_id")
				.references("departments.id")
				.onDelete("CASCADE");
			table.comment("Таблица всех должностей в системе");
		})

		.alterTable("users", function (table) {
			table
				.foreign("position_id")
				.references("positions.id")
				.onDelete("SET NULL");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("users", function (table) {
			table.dropForeign("position_id");
		})
		.dropTableIfExists("positions");
};
