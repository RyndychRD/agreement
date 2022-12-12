/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("document_types").del();
	await knex.raw("SELECT setval('document_types_id_seq', 29, true);");
	await knex("document_types").insert([
		{ id: 10, name: "Закуп ТРУ" },
		{ id: 26, name: "Согласование на продажу готовой продукции" },
		{ id: 24, name: "Согласование на закуп ТРУ для производства продукции" },
		{
			id: 27,
			name: "Согласование на закуп ТРУ для внутризаводских нужд и капитальных затрат",
		},
		{ id: 29, name: "Другой" },
	]);
};
