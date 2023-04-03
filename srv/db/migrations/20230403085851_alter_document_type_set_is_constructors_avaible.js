exports.up = function (knex) {
  return knex.schema.table("document_types", function (table) {
    table
      .boolean("is_form_construct_available")
      .defaultTo(false)
      .notNullable()
      .comment(
        "Доступен ли для обычного пользователя конструктор форм при создании для этого типа"
      );
    table
      .boolean("is_route_construct_available")
      .defaultTo(false)
      .notNullable()
      .comment(
        "Доступен ли для обычного пользователя конструктор маршрутов при создании для этого типа"
      );
  });
};

exports.down = function (knex) {
  return knex.schema.table("document_types", function (table) {
    table.dropColumn("is_form_construct_available");
    table.dropColumn("is_route_construct_available");
  });
};
