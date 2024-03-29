/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table
      .string("login")
      .notNullable()
      .comment("Логин пользователя для входа в систему");
    table
      .string("password")
      .notNullable()
      .comment("Пароль пользователя для входа в систему");
    table
      .string("email")
      .comment("email пользователя для отправки уведомлений");
    table.string("last_name").notNullable().comment("Фамилия пользователя");
    table.string("first_name").notNullable().comment("Имя пользователя");
    table.string("middle_name").comment("Отчество пользователя");
    table
      .boolean("is_disabled")
      .notNullable()
      .defaultTo(false)
      .comment("Доступен ли для пользователя вход в систему");
    table
      .integer("position_id")
      .unsigned()
      .comment("Должность пользователя. Пока что одна");

    table
      .string("activation_link")
      .comment("Ссылка для активации аккаунта пользователя");
    table.comment("Таблица с списком всех пользователей в системе");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
