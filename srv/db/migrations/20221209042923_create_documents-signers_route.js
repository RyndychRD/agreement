/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("documents-signers_route", function (table) {
    table.increments("id");
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, к которому относится этот маршрут");
    table.foreign("document_id").references("documents.id").onDelete("CASCADE");
    table
      .integer("signer_id")
      .unsigned()
      .comment(
        "Ссылка на пользователя из таблицы users, который является изначальным подписантом"
      );
    table.foreign("signer_id").references("users.id").onDelete("SET NULL");
    table
      .integer("deputy_signer_id")
      .unsigned()
      .comment(
        "Ссылка на пользователя, который замещает изначального подписанта"
      );
    table
      .foreign("deputy_signer_id")
      .references("users.id")
      .onDelete("SET NULL");
    table
      .smallint("step")
      .unsigned()
      .comment("К какому шагу маршрута относится этот подписант");

    table
      .integer("actual_signer_id")
      .unsigned()
      .comment("Ссылка на фактического подписанта на этом шаге");
    table
      .foreign("actual_signer_id")
      .references("users.id")
      .onDelete("SET NULL");
    table
      .integer("document_signature_type_id")
      .unsigned()
      .comment("Тип подписи");
    table.timestamp("sign_date").comment("Когда была поставлена подпись");
    table.comment(
      "Таблица с роутом для документа. Состоит из списка подписантов, которые должны подписать документ, а также содержит информацию о том, кто и когда подписал документ"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("documents-signers_route");
};
