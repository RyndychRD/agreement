/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_values", function (table) {
    table.increments("id");
    table
      .integer("document_id")
      .unsigned()
      .comment("Ссылка на документ, к которому привязано это значение");
    table.foreign("document_id").references("documents.id").onDelete("CASCADE");
    table
      .string("document_element_IO_dictionary_key")
      .comment(
        "Ссылка на словарь типов значений. Для каждого типа значения - свой вариант отображения"
      );
    table
      .string("value")
      .comment(
        "Непосредственно значение, введенное пользователем. Может быть как значением, так и ссылкой на элемент из селекта, представленного в словаре типов значений."
      );
    table
      .string("label")
      .comment(
        "Непосредственно значение, введенное пользователем для отображения названия компонента"
      );
    table.comment(
      "Таблица, которая хранит в себе значения документа." +
        "Каждое значение записано как строка, само значение может быть непосредственно введенным пользователем значением" +
        " либо идшником значения из соответствующего селекта в словаре типов значений"
    );
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_values");
};
