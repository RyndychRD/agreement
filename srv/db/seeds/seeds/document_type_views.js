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
            label: "Наименование ТРУ",
            key: "Name_of_Goods_Works_Services",
          },
          {
            label: "Поставщик ТРУ",
            key: "Suppliers_of_Goods_Works_Services",
          },
          {
            label: "Основание",
            key: "Reason",
          },
          {
            label: "Общая сумма договора",
            key: "Total_contract_amount",
          },
          {
            label: "Валюта платежа",
            key: "Payment_currency",
          },
        ],
      },
      view_print: {
        elements_order: [],
      },
    },
    {
      id: 2,
      document_type_id: 24,
      view: {
        elements_order: [
          {
            label: "Наименование контрагента",
            key: "Suppliers_of_Goods_Works_Services",
          },
          {
            label: "Предмет договора",
            key: "Subject_Of_The_Contract",
          },
          {
            label: "Общая сумма договора в валюте цены договора",
            key: "Total_contract_amount",
          },
          {
            label: "Общая сумма договора в тенге, по курсу НБ РК",
            key: "Total_contract_amount",
          },
          {
            label:
              "Наименование подразделения, фамилия ответственного исполнителя",
            key: "Surname_of_the_responsible_person",
          },
          {
            label:
              "Подписанный сторонами оригинал договора получен, дата, способ получения от контрагента",
            key: "Date_And_Method_Of_Receipt_From_The_Counterparty",
          },
          {
            label:
              "Дата получение проекта договора, способ получения от контрагента",
            key: "Date_And_Method_Of_Receipt_From_The_Counterparty",
          },
        ],
      },
      view_print: {
        elements_order: [],
      },
    },
    {
      id: 3,
      document_type_id: 26,
      view: {
        elements_order: [
          {
            label: "Наименование контрагента",
            key: "Suppliers_of_Goods_Works_Services",
          },
          {
            label: "Предмет договора",
            key: "Subject_Of_The_Contract",
          },
          {
            label: "Общая сумма договора",
            key: "Total_contract_amount",
          },
          {
            label: "Валюта платежа",
            key: "Payment_currency",
          },
          {
            label:
              "Наименование подразделения, фамилия ответственного исполнителя",
            key: "Surname_of_the_responsible_person",
          },
          {
            label: "Телефон исполнителя",
            key: "Contractors_phone_number",
          },
          {
            label: "Контакты контрагента",
            key: "Counterparty_contacts",
          },
        ],
      },
      view_print: {
        elements_order: [],
      },
    },
    {
      id: 4,
      document_type_id: 27,
      view: {
        elements_order: [
          {
            label: "Наименование контрагента",
            key: "Suppliers_of_Goods_Works_Services",
          },
          {
            label: "Предмет договора",
            key: "Subject_Of_The_Contract",
          },
          {
            label: "Общая сумма договора",
            key: "Total_contract_amount",
          },
          {
            label: "Валюта платежа",
            key: "Payment_currency",
          },
          {
            label:
              "Наименование подразделения, фамилия ответственного исполнителя",
            key: "Surname_of_the_responsible_person",
          },
          {
            label: "Телефон исполнителя",
            key: "Contractors_phone_number",
          },
          {
            label: "Контакты контрагента",
            key: "Counterparty_contacts",
          },
        ],
      },
      view_print: {
        elements_order: [],
      },
    },
    {
      id: 5,
      document_type_id: 29,
      view: {
        elements_order: [
          {
            label: "Наименование ТРУ",
            key: "Name_of_Goods_Works_Services",
          },
          {
            label: "Примечание",
            key: "Note",
          },
          {
            label: "Основание",
            key: "Reason",
          },
        ],
      },
      view_print: {
        elements_order: [],
      },
    },
  ]);

  console.log("document_type_viewsSeed executed");
};
