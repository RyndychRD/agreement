/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("archive_logs", function (table) {
    table.jsonb("log_message").comment("Дополнительная информация по логу");
    table
      .integer("user_id")
      .comment(
        "Ссылка на пользователя. Если пользователь будет удален, инфа по нему будет в log_message"
      )
      .references("users.id")
      .onDelete("SET NULL");
    table.dropColumn("document_id");
    table.dropColumn("file_id");
    table.dropColumn("user_fio_login");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("archive_logs", function (table) {
    table.dropColumn("log_message");
  });
};
