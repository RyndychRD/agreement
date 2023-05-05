/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table
      .boolean("is_available_from_global")
      .defaultTo(false)
      .comment(
        "Может ли пользователь получить доступ к системе вне сетки клиента"
      );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("is_available_from_global");
  });
};
