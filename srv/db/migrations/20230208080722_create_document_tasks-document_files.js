/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "documents_tasks-document_files",
    function (table) {
      table.increments("id");
      table
        .integer("document_task_id")
        .unsigned()
        .comment("Ссылка на поручение, к которому прикреплен файл")
        .references("document_tasks.id")
        .onDelete("CASCADE");

      table
        .integer("file_id")
        .unsigned()
        .comment("Ссылка на файл из таблицы файлов")
        .references("files.id")
        .onDelete("CASCADE");

      table.comment(
        "Таблица со списком файлов, которые были прикреплены к поручению при создании"
      );
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("documents_tasks-files");
};
