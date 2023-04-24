/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(
    "documents-signers_route_history",
    function (table) {
      table.increments("id");
      table
        .integer("documents-signers_route_id")
        .references("documents-signers_route.id")
        .onDelete("CASCADE");
      table
        .integer("signer_id")
        .references("users.id")
        .onDelete("SET NULL")
        .comment("Подписант из таблицы пользователей в это время");
      table
        .timestamp("created_at")
        .comment("Когда был установлен этот подписант");
      table.comment(
        "Таблица отображает все преобразования подписантов в рамках одного шага подписания"
      );
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("documents-signers_route_history");
};
