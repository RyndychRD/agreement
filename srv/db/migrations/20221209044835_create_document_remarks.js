/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_remarks", function (table) {
		table.increments("id");
		table
			.integer("document_id")
			.unsigned()
			.comment("Ссылка на документ, на который создано замечание");
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.integer("user_id").unsigned().comment("Кто создал замечание");
		table.foreign("user_id").references("users.id").onDelete("SET NULL");
		table
			.integer("position_id")
			.unsigned()
			.comment("В какой должности был пользователь, когда создавал замечание");
		table
			.foreign("position_id")
			.references("positions.id")
			.onDelete("SET NULL");
		table.text("remark").comment("Сам текст замечания");
		table.comment("Таблица, которая хранит в себе замечания к документу");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_remarks");
};
