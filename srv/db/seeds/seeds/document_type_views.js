const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex isFieldRequired:true} knex
 * @returns { Promise<void> isFieldRequired:true}
 */
exports.documentTypeViewsSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    {document_type_id: 10,view: {elements_order: [{label: "Наименование ТРУ",key: "Name_of_Goods_Works_Services",isFieldRequired:true},{label: "Поставщик ТРУ",key: "Suppliers_of_Goods_Works_Services",isFieldRequired:true},{label: "Основание",key: "Reason",isFieldRequired:true},{label: "Общая сумма договора",key: "Total_contract_amount",isFieldRequired:true},{label: "Валюта платежа",key: "Payment_currency",isFieldRequired:true},],isFieldRequired:true}},
    {document_type_id: 24,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",isFieldRequired:true},{label: "Предмет договора",key: "Subject_Of_The_Contract",isFieldRequired:true},{label: "Общая сумма договора в валюте цены договора",key: "Total_contract_amount",isFieldRequired:true},{label: "Общая сумма договора в тенге, по курсу НБ РК",key: "Total_contract_amount",isFieldRequired:true},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",isFieldRequired:true},{label:"Подписанный сторонами оригинал договора получен, дата, способ получения от контрагента",key: "Date_And_Method_Of_Receipt_From_The_Counterparty",isFieldRequired:true},{label:"Дата получение проекта договора, способ получения от контрагента",key: "Date_And_Method_Of_Receipt_From_The_Counterparty",isFieldRequired:true},],isFieldRequired:true}},
    {document_type_id: 26,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",isFieldRequired:true},{label: "Предмет договора",key: "Subject_Of_The_Contract",isFieldRequired:true},{label: "Общая сумма договора",key: "Total_contract_amount",isFieldRequired:true},{label: "Валюта платежа",key: "Payment_currency",isFieldRequired:true},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",isFieldRequired:true},{label: "Телефон исполнителя",key: "Contractors_phone_number",isFieldRequired:true},{label: "Контакты контрагента",key: "Counterparty_contacts",isFieldRequired:true},],isFieldRequired:true}},
    {document_type_id: 27,view: {elements_order: [{label: "Наименование контрагента",key: "Suppliers_of_Goods_Works_Services",isFieldRequired:true},{label: "Предмет договора",key: "Subject_Of_The_Contract",isFieldRequired:true},{label: "Общая сумма договора",key: "Total_contract_amount",isFieldRequired:true},{label: "Валюта платежа",key: "Payment_currency",isFieldRequired:true},{label:"Наименование подразделения, фамилия ответственного исполнителя",key: "Surname_of_the_responsible_person",isFieldRequired:true},{label: "Телефон исполнителя",key: "Contractors_phone_number",isFieldRequired:true},{label: "Контакты контрагента",key: "Counterparty_contacts",isFieldRequired:true},],isFieldRequired:true}},
    {document_type_id: 29,view: {elements_order: [{label: "Наименование ТРУ",key: "Name_of_Goods_Works_Services",isFieldRequired:true},{label: "Примечание",key: "Note",isFieldRequired:true},{label: "Основание",key: "Reason",isFieldRequired:true},],isFieldRequired:true}},
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
