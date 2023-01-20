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
            key: "From_whom",
            typeData: "table",
          },
          {
            key: "Job_title",
            typeData: "table",
          },
          {
            key: "Position_type",
            typeData: "table",
          },
          {
            key: "Name_of_Goods_Works_Services",
            typeData: "text",
          },
          {
            key: "Suppliers_of_Goods_Works_Services",
            typeData: "text",
          },
          {
            key: "Base",
            typeData: "text",
          },
          {
            key: "Total_contract_amount",
            typeData: "text",
          },
          {
            key: "Payment_currency",
            typeData: "select_id",
          },
          {
            key: "Data_Document",
            typeData: "datePicker",
          },
          {
            key: "Subdivision_name",
            typeData: "table",
          },
          {
            key: "Surname_of_the_responsible_person",
            typeData: "table",
          },
          {
            key: "Contractors_phone_number",
            typeData: "phone",
          },
          {
            key: "Counterparty_contacts",
            typeData: "phone",
          },
          {
            key: "Email_contacts",
            typeData: "email",
          },
        ],
      },
      view_print: {
        elements_order: [
          {
            key: "From_whom",
            typeData: "table",
          },
          {
            key: "Job_title",
            typeData: "text",
          },
          {
            key: "Position_type",
            typeData: "table",
          },
          {
            key: "Name_of_Goods_Works_Services",
            typeData: "text",
          },
          {
            key: "Suppliers_of_Goods_Works_Services",
            typeData: "text",
          },
          {
            key: "Base",
            typeData: "text",
          },
          {
            key: "Total_contract_amount",
            typeData: "text",
          },
          {
            key: "Payment_currency",
            typeData: "select_id",
          },
          {
            key: "Data_Document",
            typeData: "datePicker",
          },
          {
            key: "Subdivision_name",
            typeData: "table",
          },
          {
            key: "Surname_of_the_responsible_person",
            typeData: "table",
          },
          {
            key: "Contractors_phone_number",
            typeData: "phone",
          },
          {
            key: "Counterparty_contacts",
            typeData: "phone",
          },
          {
            key: "Email_contacts",
            typeData: "email",
          },
        ],
      },
    },
  ]);

  console.log("document_type_viewsSeed executed");
};
