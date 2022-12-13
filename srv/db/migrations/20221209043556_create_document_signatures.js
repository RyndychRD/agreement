/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("documents_signatures", function (table) {
		table.increments("id");
		table
			.integer("document_id")
			.unsigned()
			.comment("Ссылка на документ, на который привязана подпись");
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table
			.integer("signer_id")
			.unsigned()
			.comment("Ссылка на фактического подписанта на этом шаге");
		table.foreign("signer_id").references("users.id").onDelete("SET NULL");
		table.smallint("step").unsigned().comment("Какой шаг был подписан");
		table
			.integer("document_signature_type_id")
			.unsigned()
			.comment(
				"Тип подписи(Согласован/Не согласован/ Согласован с замечаниями)"
			);
		table
			.timestamp("created_at")
			.defaultTo(knex.fn.now())
			.comment("Когда была подпись");
		table.comment(
			"Таблица, которая в себе хранит уже имеющиеся подписи у документа"
		);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("documents_signatures");
};
