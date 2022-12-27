/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("positions-rights", function (table) {
    table.increments("id");
    table
      .integer("position_id")
      .unsigned()
      .comment("Ссылка на должность, к которой привязаны эти права");
    table.foreign("position_id").references("positions.id").onDelete("CASCADE");
    table.integer("right_id").unsigned().comment("Ссылка на общий список прав");
    table.foreign("right_id").references("rights.id").onDelete("CASCADE");
    table.comment(
      "Таблица, связывающая должность и права. Права от департамента не представлены в этой таблице. Права пользователя определяются от должности"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("positions-rights");
};
