/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("document_files", function (table) {
		table.increments("id");
		table.integer("document_id").unsigned();
		table.foreign("document_id").references("documents.id").onDelete("CASCADE");
		table.text("name").notNullable();
		table.string("extension").notNullable();
		table.string("uniq").notNullable().comment("Название файла в системе");
		table.string("path").notNullable().comment("Путь до файла");
		table.integer("uploader_id").unsigned();
		table.foreign("uploader_id").references("users.id").onDelete("SET NULL");
		table.text("hash").notNullable().comment("хеш сумма файла");
		table.integer("size").unsigned().notNullable().comment("хеш сумма файла");
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("document_files");
};
