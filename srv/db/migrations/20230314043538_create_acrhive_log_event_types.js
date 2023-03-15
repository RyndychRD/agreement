/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists(
    "archive_log_event_types",
    function (table) {
      table.increments("id");
      table.string("name").comment("Название типа действия в архиве");
      table.comment(
        "Таблица со списком всех возможных типов действий пользователя в архиве для всех типов документов"
      );
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("archive_log_event_types");
};
