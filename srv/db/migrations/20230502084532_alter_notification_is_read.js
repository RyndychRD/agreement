/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("notification_is_read", function (table) {
    table
      .integer("document_id")
      .references("documents.id")
      .onDelete("CASCADE")
      .comment("Ссылка на документ, к которому привязана нотификация");
    table
      .integer("document_task_id")
      .references("document_tasks.id")
      .onDelete("CASCADE")
      .comment("Ссылка на поручение, к которому привязана нотификация");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("documents", function (table) {
    table.dropColumn("document_id");
    table.dropColumn("document_task_id");
  });
};
