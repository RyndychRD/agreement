/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable("document_element_IO_dictionary", function (table) {
			table.increments("id");
			table
				.string("key")
				.unique()
				.notNullable()
				.comment(
					"Ключ, аналогичный идшнику. Служит для лучшего понимания какой фрагмент используется для отображения"
				);
			table
				.text("name")
				.notNullable()
				.comment("Текст, используемый при отображении фрагмента");
			table
				.json("select_value")
				.comment(
					"Опциональное поле. Если значение является выборным из некоторого множества, это множество описано здесь"
				);
			table.comment(
				"Таблица, которая представляет собой словарь типов значений. Из этой таблицы можно понять какой фрагмент используется для заполнения значения и для отображения его в документе"
			);
		})

		.alterTable("document_values", function (table) {
			table
				.foreign("document_element_IO_dictionary_id")
				.references("document_element_IO_dictionary.id")
				.onDelete("SET NULL");
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("document_values", function (table) {
			table.dropForeign("document_element_IO_dictionary_id");
		})
		.dropTableIfExists("document_element_IO_dictionary");
};
