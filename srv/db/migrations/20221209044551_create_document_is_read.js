/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_is_read", function (table) {
    table.comment(
      "Таблица, которая показывает прочитан ли документ при появлении на него нотификации"
    );
    table.increments("id");
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, на который есть нотификация");
    table.foreign("document_id").references("documents.id").onDelete("CASCADE");
    table
      .integer("reader_id")
      .unsigned()
      .comment("Ссылка на пользователя, который должен прочесть нотификацию");
    table.foreign("reader_id").references("users.id").onDelete("SET NULL");
    table
      .boolean("is_read")
      .defaultTo(false)
      .comment("Прочитана ли нотификация");
    table
      .string("notification_type")
      .comment(
        "В зависимости от этого параметра количество отображается в своем разделе"
      );
    //Индекс для быстрого поиска не прочитанных документов
    table.index(["is_read", "reader_id"], "not_read_person_documents_index");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_is_read");
};
