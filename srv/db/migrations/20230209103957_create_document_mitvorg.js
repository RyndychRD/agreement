/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_mitvorg", function (table) {
    table.increments("id");
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, к которому привязано это значение")
      .references("documents.id")
      .onDelete("CASCADE");
    table.date("registration_date").comment("Дата регистрации на Митворге");
    table.string("number").comment("Митворг номер");
    table.comment(
      "Таблица, которая хранит в себе информацию по Митворгу. Возможно, излишняя"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_mitvorg");
};
