/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("document_task_statuses", function (table) {
      table.increments("id");
      table.string("name").comment("Название статуса");
      table.comment(
        "Таблица со списком всех всех возможных статусов по задаче"
      );
    })
    .alterTable("document_tasks", function (table) {
      table
        .integer("document_task_status_id")
        .comment("Ссылка на статус поручения")
        .references("document_task_statuses.id")
        .onDelete("SET NULL");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("document_tasks", function (table) {
      table.dropColumn("document_task_status_id");
    })
    .dropTableIfExists("document_task_statuses");
};
