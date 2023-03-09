/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("document_archives", function (table) {
    table
      .timestamp("pass_by")
      .comment("Дата, после которой документ должен быть отправлен в архив");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("document_archives", function (table) {
    table.dropColumn("pass_by");
  });
};
