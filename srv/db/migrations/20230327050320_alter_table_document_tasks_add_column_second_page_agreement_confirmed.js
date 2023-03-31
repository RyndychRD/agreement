/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("document_tasks", function (table) {
    table
      .boolean("is_second_page_agreement_from_custom_fields_confirmed")
      .defaultTo(false)
      .comment(
        "После выполнения поручения по заполнению 2 листа согласования договора поручатель должен подтвердить информацию. Это поле служит для обозначения того что информация подтверждена"
      );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("document_tasks", function (table) {
    table.dropColumn("is_second_page_agreement_from_custom_fields_confirmed");
  });
};
