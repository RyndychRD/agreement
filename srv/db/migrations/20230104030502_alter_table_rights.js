/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("rights", function (table) {
    table
      .string("code_name")
      .unique()
      .comment(
        "Уникальное имя права, которое используется как элиас в коде. Можно проверять по id, а можно по этому имени"
      );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("rights", function (table) {
    table.dropColumn("code_name");
  });
};
