/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("document_type_views", function (table) {
    table.dropColumn("view_print");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("document_type_views", function (table) {
    table.json("view_print").comment("Список фрагментов для печати");
  });
};
