/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.document_element_IO_dictionarySeed = async function (knex) {
	// Deletes ALL existing entries
	await knex("document_element_IO_dictionary").del();
	// await knex.raw(
	// 	"SELECT setval('document_element_IO_dictionary_id_seq', 10, true);"
	// );
	await knex("document_element_IO_dictionary").insert([
		{
			id: 1,
			key: "From_whom",
			name: "От кого:",
			select_value: { table: "users" },
		},
		{
			id: 2,
			key: "Job_title",
			name: "Должность:",
			select_value: { table: "position" },
		},
		{
			id: 3,
			key: "Position_type",
			name: "Тип должности:",
			select_value: { table: "position" },
		},
		{
			id: 4,
			key: "Name_of_Goods_Works_Services",
			name: "Наименование Товаров Работ Услуг:",
			select_value: null,
		},
		{
			id: 5,
			key: "Suppliers_of_Goods_Works_Services",
			name: "Поставщики Товаров Работ Услуг:",
			select_value: null,
		},
		{ id: 6, key: "Base", name: "Основание:", select_value: null },
		{
			id: 7,
			key: "Total_contract_amount",
			name: "Общая сумма договора:",
			select_value: null,
		},
		{
			id: 8,
			key: "Payment_currency",
			name: "Валюта платежа:",
			select_value: {
				select_id: [
					{ value: "Казахстанский тенге", label: "Казахстанский тенге" },
					{ value: "Доллар США", label: "Доллар США" },
					{ value: "Фунт стерлингов", label: "Фунт стерлингов" },
					{ value: "Евро", label: "Евро" },
					{ value: "Китайский юань", label: "Китайский юань" },
					{ value: "Белорусский рубль", label: "Белорусский рубль" },
					{ value: "Российский рубль", label: "Российский рубль" },
				],
			},
		},
		{
			id: 9,
			key: "Data_Document",
			name: "Дата:",
			select_value: null,
		},
		{
			id: 10,
			key: "Subdivision_name",
			name: "Наименование подразделения:",
			select_value: { table: "departments" },
		},
		{
			id: 11,
			key: "Surname_of_the_responsible_person",
			name: "Фамилия ответственного исполнителя:",
			select_value: { table: "users" },
		},
		{
			id: 12,
			key: "Contractors_phone_number",
			name: "Телефон исполнителя:",
			select_value: null,
		},
		{
			id: 13,
			key: "Counterparty_contacts",
			name: "Контакты контрагента:",
			select_value: null,
		},
		{
			id: 14,
			key: "Email_contacts",
			name: "Электронная почта:",
			select_value: null,
		},
	]);
	console.log("document_element_IO_dictionarySeed executed");
};
