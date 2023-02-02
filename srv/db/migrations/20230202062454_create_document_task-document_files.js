/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "document_tasks-document_files",
    function (table) {
      table.increments("id");
      table
        .integer("document_task_id")
        .comment("Ссылка на поручение")
        .references("document_tasks.id")
        .onDelete("CASCADE");
      table
        .integer("document_file_id")
        .comment(
          "Ссылка на файл документа, который привязал создатель документа"
        )
        .references("document_files.id")
        .onDelete("CASCADE");
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_tasks-document_files");
};
