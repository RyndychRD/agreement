/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("files", function (table) {
    table.increments("id");
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
    table
      .boolean("isTemp")
      .defaultTo(true)
      .comment("Находится ли файл в временном хранилище");
    table.comment(
      "Таблица со списком файлов, которые были загружены пользователями. Определение к какому виду документа относится какой файл происходит в отдельных таблицах"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("files");
};
