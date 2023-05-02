/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("documents", function (table) {
    table
      .integer("document_status_before_soft_delete")
      .references("document_statuses.id")
      .onDelete("NO ACTION")
      .comment("Какой был статус до мягкого удаления");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("documents", function (table) {
    table.dropColumn("document_status_before_soft_delete");
  });
};
