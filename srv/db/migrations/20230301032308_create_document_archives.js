/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_archives", function (table) {
    table.increments("id");
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, помещенный в архив")
      .references("documents.id")
      .onDelete("CASCADE");

    table
      .integer("archive_type_id")
      .unsigned()
      .comment("Ссылка на тип архива")
      .references("archive_types.id")
      .onDelete("SET NULL");

    table.timestamp("passed_at").comment("Когда документ помещен в архив");
    table.comment(
      "Таблица, которая отображает помещенные в архив документы." +
        "Так как требуется нести дополнительную информацию и просто разграничить модули, не стал дополнять основную таблицу"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_archives");
};
