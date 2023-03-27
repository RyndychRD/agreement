/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("document_task_types", function (table) {
      table.increments("id");
      table.string("name").comment("Название типа задачи");
      table.comment("Таблица со списком всех возможных типов задач");
    })
    .then(() => {
      return knex("document_task_types").insert([
        { id: 1, name: "Обычное поручение" },
      ]);
    })
    .then(() => {
      return knex.schema.alterTable("document_tasks", function (table) {
        table
          .integer("document_task_type_id")
          .comment("Ссылка на тип поручения")
          .defaultTo(1)
          .references("document_task_types.id")
          .onDelete("SET NULL");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("document_tasks", function (table) {
      table.dropColumn("document_task_type_id");
    })
    .dropTableIfExists("document_task_types");
};
