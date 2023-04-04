exports.up = function (knex) {
  return knex.schema.table("document_types", function (table) {
    table
      .boolean("is_show_for_document_creation")
      .defaultTo(true)
      .notNullable()
      .comment("Доступен ли этот тип для создания на нем документов");
    table
      .boolean("is_file_upload_required")
      .defaultTo(true)
      .notNullable()
      .comment(
        "Обязательно ли загружать файлы при создании документа с этим типом"
      );
  });
};

exports.down = function (knex) {
  return knex.schema.table("document_types", function (table) {
    table.dropColumn("is_show_for_document_creation");
    table.dropColumn("is_file_upload_required");
  });
};
