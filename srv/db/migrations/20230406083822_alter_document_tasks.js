/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("document_tasks", function (table) {
    table.renameColumn(
      "is_second_page_agreement_from_custom_fields_confirmed",
      "is_confirmed"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("document_tasks", function (table) {
    table.renameColumn(
      "is_confirmed",
      "is_second_page_agreement_from_custom_fields_confirmed"
    );
  });
};
