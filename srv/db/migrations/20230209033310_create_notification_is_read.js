/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notification_is_read", function (table) {
    table.comment("Таблица, которая показывает прочитана ли нотификация");
    table.increments("id");
    table
      .integer("element_id")
      .unsigned()
      .comment(
        "Ссылка на некоторый элемент. Что это конкретно - будет понятно по notification_type"
      );
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
      .enu("notification_type", ["ReworkDocument", "Signing", "IncomeTask"])
      .comment(
        "Это просто захардкоженый список с типами нотификации для каждого раздела"
      );
    //Индекс для быстрого поиска непрочитанных документов
    table.index(["is_read", "reader_id"], "not_read_person_documents_index");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notification_is_read");
};
