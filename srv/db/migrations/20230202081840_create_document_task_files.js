/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_task_files", function (table) {
    table.increments("id");
    table
      .integer("document_task_id")
      .comment(
        "Ссылка на документ, в который мы должны загрузить файл по поручению"
      )
      .references("document_tasks.id")
      .onDelete("SET NULL");
    table
      .text("name")
      .notNullable()
      .comment("Имя документа поручения, отображаемое для пользователя");
    table
      .string("type")
      .comment(
        "Расширение документа как был загружен файл. То что после точки в имени файла. Если нет - значит нет"
      );
    table.string("uniq").notNullable().comment("Название файла в системе");
    table.string("path").notNullable().comment("Путь до файла");
    table
      .integer("uploader_id")
      .unsigned()
      .comment("Ссылка на пользователя, который загрузил файл")
      .references("users.id")
      .onDelete("SET NULL");
    table.text("hash").notNullable().comment("хеш сумма файла");
    table.integer("size").unsigned().notNullable().comment("Размер файла");
    table.comment(
      "Таблица со списком файлов, которые были загружены пользователями в поручение"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_task_files");
};
