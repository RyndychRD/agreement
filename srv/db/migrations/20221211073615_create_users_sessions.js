/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users_sessions", function (table) {
		table.increments("id");
		table
			.integer("user_id")
			.comment("Ссылка на пользователя с этим токеном")
			.unsigned()
			.references("users.id")
			.onDelete("CASCADE");
		table
			.text("refresh_token")
			.comment("Токен для обновление сессии (авторизации)");
		table.comment("Таблица со списком активных сессий");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users_sessions");
};
