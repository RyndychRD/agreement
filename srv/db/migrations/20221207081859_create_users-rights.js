/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users-rights", function (table) {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .comment("Ссылается на пользователя из таблицы users");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table
      .integer("right_id")
      .unsigned()
      .comment("Ссылается на общий список прав");
    table.foreign("right_id").references("rights.id").onDelete("CASCADE");
    table.comment(
      "Таблица, которая сопоставляет пользователей и права, привязанные непосредственно к пользователям" +
        "Права по должностям и по департаментам в это таблицу не входят." +
        " Права пользователя являются суммой индивидуальных прав, прав по должности и прав по департаменту"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users-rights");
};
