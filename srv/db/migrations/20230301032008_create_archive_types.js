/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("archive_types", function (table) {
    table.increments("id");
    table.string("name").comment("Название типа архива");
    table.comment(
      "Таблица со списком всех возможных типов архива для всех типов документов"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("archive_types");
};
