/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("logs", function (table) {
    table.string("log_type").comment("Тип лога. Никаких ограничений нет");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("logs", function (table) {
    table.dropColumn("log_type");
  });
};
