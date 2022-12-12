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
		table.comment(
			"Таблица с роутом для документа. Состоит из списка подписантов, которые должны подписать документ"
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
