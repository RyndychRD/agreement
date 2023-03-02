const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTypeViewsSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    {document_type_id: 10,view: {elements_order: [{label: "Наименование ТРУ",key: "Name_of_Goods_Works_Services",},{label: "Поставщик ТРУ",key: "Suppliers_of_Goods_Works_Services",},{label: "Основание",key: "Reason",},{label: "Общая сумма договора",key: "Total_contract_amount",},{label: "Валюта платежа",key: "Payment_currency",},],},},
    {document_type_id: 24,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",},{label: "Предмет договора",key: "Subject_Of_The_Contract",},{label: "Общая сумма договора в валюте цены договора",key: "Total_contract_amount",},{label: "Общая сумма договора в тенге, по курсу НБ РК",key: "Total_contract_amount",},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",},{label:"Подписанный сторонами оригинал договора получен, дата, способ получения от контрагента",key: "Date_And_Method_Of_Receipt_From_The_Counterparty",},{label:"Дата получение проекта договора, способ получения от контрагента",key: "Date_And_Method_Of_Receipt_From_The_Counterparty",},],},},
    {document_type_id: 26,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",},{label: "Предмет договора",key: "Subject_Of_The_Contract",},{label: "Общая сумма договора",key: "Total_contract_amount",},{label: "Валюта платежа",key: "Payment_currency",},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",},{label: "Телефон исполнителя",key: "Contractors_phone_number",},{label: "Контакты контрагента",key: "Counterparty_contacts",},],},},
    {document_type_id: 27,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",},{label: "Предмет договора",key: "Subject_Of_The_Contract",},{label: "Общая сумма договора",key: "Total_contract_amount",},{label: "Валюта платежа",key: "Payment_currency",},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",},{label: "Телефон исполнителя",key: "Contractors_phone_number",},{label: "Контакты контрагента",key: "Counterparty_contacts",},],},},
    {document_type_id: 29,view: {elements_order: [{label: "Наименование ТРУ",key: "Name_of_Goods_Works_Services",},{label: "Примечание",key: "Note",},{label: "Основание",key: "Reason",},],},},
  ]

  const table = "document_type_views";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: arr.length,
    isAddCheck: true,
  });

  console.log("document_type_viewsSeed executed");
};
