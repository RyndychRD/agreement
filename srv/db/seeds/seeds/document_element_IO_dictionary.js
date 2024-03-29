const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentElementIODictionarySeed = async function (knex) {
  // prettier-ignore
  const arr = [
    { id: 1, key: "From_whom", name: "От кого:", data_type: "table", select_value: { table: "users" }},
    { id: 2, key: "Job_title", name: "Должность:", data_type: "table", select_value: { table: "position" }},
    { id: 3, key: "Position_type", name: "Тип должности:", data_type: "table", select_value: { table: "position" }},
    { id: 4, key: "Name_of_Goods_Works_Services", name: "Наименование Товаров Работ Услуг:", data_type: "text", select_value: null},
    { id: 5, key: "Suppliers_of_Goods_Works_Services", name: "Поставщики Товаров Работ Услуг:", data_type: "text", select_value: null},
    { id: 6, key: "Reason", name: "Основание:", data_type: "text", select_value: null},
    { id: 7, key: "Total_contract_amount", name: "Общая сумма договора:", data_type: "number", select_value: null},
    { id: 8, key: "Payment_currency", name: "Валюта платежа:", data_type: "select_id", select_value: {select_id: [{ value: "Казахстанский тенге", label: "Казахстанский тенге" },  { value: "Доллар США", label: "Доллар США" }, { value: "Фунт стерлингов", label: "Фунт стерлингов" }, { value: "Евро", label: "Евро" }, { value: "Китайский юань", label: "Китайский юань" }, { value: "Белорусский рубль", label: "Белорусский рубль" }, { value: "Российский рубль", label: "Российский рубль" }], }},
    { id: 9, key: "Data_Document", name: "Дата:", data_type: "datePicker", select_value: null},
    { id: 10, key: "Subdivision_name", name: "Наименование подразделения:", data_type: "table", select_value: { table: "departments" }},
    { id: 11, key: "Surname_of_the_responsible_person", name: "ФИО пользователя:", data_type: "table", select_value: { table: "users" }},
    { id: 12, key: "Contractors_phone_number", name: "Телефон исполнителя:", data_type: "phone", select_value: null},
    { id: 13, key: "Counterparty_contacts", name: "Контакты контрагента:", data_type: "phone", select_value: null},
    { id: 14, key: "Email_contacts", name: "Электронная почта:", data_type: "email", select_value: null},
    { id: 15, key: "Subject_Of_The_Contract", name: "Предмет договора:", data_type: "select_id", select_value: {select_id: [{value: "Закупки товаров, работ и услуг",label: "Закупки товаров, работ и услуг"  }, {value:"Поставка продукции (выполнение работ, оказание услуг) заказчикам",label:"Поставка продукции (выполнение работ, оказание услуг) заказчикам"  }, {value: "Передача имущества в аренду (бесплатное пользование)",label: "Передача имущества в аренду (бесплатное пользование)"  }, {value: "Совместная деятельность",label: "Совместная деятельность"  }, {value:"Финансирование (кредитование, обеспечение исполнения обязательств)",label:"Финансирование (кредитование, обеспечение исполнения обязательств)"  }, { value: "Прочие обязательства", label: "Прочие обязательства" }], }},
    { id: 16, key: "Date_And_Method_Of_Receipt_From_The_Counterparty", name: "Дата и способ получения от контрагента:", data_type: "text", select_value: null},
    { id: 17, key: "Note", name: "Примечание:", data_type: "text", select_value: null},
    { id: 18, key: "contractSumNoNDS", name: "Сумма по договору, тыс. тенге (Без НДС):", data_type: "number", select_value: null},
    { id: 19, key: "contractSumWithNDS", name: "Сумма по договору, тыс. тенге (C НДС):", data_type: "number", select_value: null},
    { id: 20, key: "currentNDS", name: "Текущий НДС:", data_type: "number", select_value: {"isPercentage":true,"defaultValue":12}},
    { id: 21, key: "fullNameOfTheItemInBudget", name: "Полное наименование статьи в бюджете:", data_type: "text", select_value: null},
];

  const table = "document_element_IO_dictionary";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });

  console.log("documentElementIODictionarySeed executed");
};
