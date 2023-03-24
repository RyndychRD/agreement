/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("document_tasks", function (table) {
    table
      .json("document_task_custom_fields")
      .comment(
        "Здесь хранится вся дополнительная информация по поручению. Для разных типов поручения информация будет своя"
      );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("document_tasks", function (table) {
    table.dropColumn("document_task_custom_fields");
  });
};
