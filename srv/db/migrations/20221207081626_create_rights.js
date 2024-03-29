/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("rights", function (table) {
		table.increments("id");
		table.string("name").comment("Название права для отображения");
		table.comment("Таблица со списком всех прав, которые определены в системе");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("rights");
};
