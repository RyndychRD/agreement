/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "document-document_task_files",
    function (table) {
      table.increments("id");
      table
        .integer("document_id")
        .comment(
          "Ссылка на документ, в который мы должны загрузить файл по поручению"
        )
        .references("documents.id")
        .onDelete("CASCADE");
      table
        .integer("document_task_file_id")
        .comment(
          "Ссылка на файл документа, который привязал создатель документа"
        )
        .references("document_task_files.id")
        .onDelete("CASCADE");
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document-document_task_files");
};
