/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("FAQs", function (table) {
    table.increments("id");
    table
      .string("name")
      .comment("Название справки для отображения пользователю");
    table.string("url").comment("Путь в папке Static");
    table.comment("Таблица со списком всех справочных материалов");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("FAQs");
};
