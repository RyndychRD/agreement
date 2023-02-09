/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("document_task_is_read", function (table) {
      table.comment(
        "Таблица, которая показывает прочитано ли поручение при появлении на него нотификации"
      );
      table.increments("id");
      table
        .integer("document_task_id")
        .unsigned()
        .comment("Ссылка на документ, на который есть нотификация").references("document_tasks.id").onDelete("CASCADE");
      table
        .integer("reader_id")
        .unsigned()
        .comment("Ссылка на пользователя, который должен прочесть нотификацию").references("users.id").onDelete("SET NULL");
      table
        .boolean("is_read")
        .defaultTo(false)
        .comment("Прочитана ли нотификация");
      //Индекс для быстрого поиска не прочитанных документов
      table.index(["is_read", "reader_id"], "not_read_person_document_tasks_index");
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("document_task_is_read");
  };
  