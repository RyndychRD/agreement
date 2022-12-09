/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("documents-signers_route", function (table) {
		table.increments("id");
		table.integer("document_id").unsigned();
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.integer("signer_id").unsigned();
		table.foreign("signer_id").references("users.id").onDelete("SET NULL");
		table.integer("deputy_signer_id").unsigned();
		table
			.foreign("deputy_signer_id")
			.references("users.id")
			.onDelete("SET NULL");
		table.smallint("step").unsigned();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("documents-signers_route");
};
