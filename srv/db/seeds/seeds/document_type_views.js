/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTypeViewsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("document_type_views").del();
  // await knex.raw(
  // 	"SELECT setval('document_element_IO_dictionary_id_seq', 10, true);"
  // );
  await knex("document_type_views").insert([
    {
      id: 1,
      document_type_id: 10,
      view: {
        elements_order: [
          {
            label: "Валюта",
            key: "Payment_currency",
          },
          {
            label: "Дата",
            key: "Data_Document",
          },
          {
            label: "Контакты",
            key: "Counterparty_contacts",
          },
          {
            key: "Subdivision_name",
            label: "Подразделение",
          },
          {
            key: "Contractors_phone_number",
            label: "Телефон",
          },
          {
            key: "Email_contacts",
            label: "Мыло",
          },
          {
            key: "Name_of_Goods_Works_Services",
            label: "Поле ввода",
          },
        ],
      },
      view_print: {
        elements_order: [
          {
            label: "Валюта",
            key: "Payment_currency",
          },
          {
            label: "Дата",
            key: "Data_Document",
          },
          {
            label: "Контакты",
            key: "Counterparty_contacts",
          },
          {
            key: "Subdivision_name",
            label: "Подразделение",
          },
          {
            key: "Contractors_phone_number",
            label: "Телефон",
          },
          {
            key: "Email_contacts",
            label: "Мыло",
          },
          {
            key: "Name_of_Goods_Works_Services",
            label: "Поле ввода",
          },
        ],
      },
    },
  ]);

  console.log("document_type_viewsSeed executed");
};
