/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("archive_logs", function (table) {
    table.increments("id");
    table
      .string("user_fio_login")
      .comment(
        "Запоминаем пользователя не с помощью id, так как пользователя могут удалить, а логи должны сохраниться"
      );
    table
      .string("user_ip")
      .comment(
        "С какого ipшника зашел пользователь. Можно будет четче определить проказника)"
      );
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, с которым проводились операции")
      .references("documents.id")
      .onDelete("CASCADE");

    table
      .integer("file_id")
      .unsigned()
      .comment(
        "Ссылка на файл из таблицы файлов, который пользователь скачивал/предпросматривал"
      )
      .references("files.id")
      .onDelete("CASCADE");
    table
      .integer("event_type_id")
      .unsigned()
      .comment("Ссылка на тип действия пользователя")
      .references("archive_log_event_types.id")
      .onDelete("SET NULL");
    table
      .timestamp("created_at")
      .comment("Когда было произведено действие")
      .defaultTo("now");
    table.comment(
      "Таблица, которая отображает помещенные в архив документы." +
        "Так как требуется нести дополнительную информацию и просто разграничить модули, не стал дополнять основную таблицу"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("archive_logs");
};
