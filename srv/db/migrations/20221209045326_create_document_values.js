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
			.integer("document_element_IO_dictionary_id")
			.unsigned()
			.comment(
				"Ссылка на словарь типов значений. Для каждого типа значения - свой вариант отображения"
			);
		table
			.json("value")
			.comment(
				"Непосредственно значение, введенное пользователем. Может быть как значением, так и ссылкой на элемент из селекта, представленного в словаре типов значений." +
					" Представлено парой {data, typeData}, где data - значение, typeData - тип значения. Тип может быть int/float для любых чисел, text для строк, date для дат, id для выборных значений, phone(пока что без масок) для телефона, email(пока что без масок) для email"
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
