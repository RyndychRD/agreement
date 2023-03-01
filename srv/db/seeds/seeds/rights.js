const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.rightsSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    { id: 1, name: "Администратор",  code_name: "Admin" },
    { id: 2, name: "Просмотр согласования договоров", code_name: "ContractAgreement",},
    { id: 3, name: "Просмотр Мои документы->Созданных мною", code_name: "CreatedDocuments",},
    { id: 4, name: "Просмотр Мои документы->На доработку", code_name: "ReworkDocuments",},
    { id: 5, name: "Просмотр Мои документы->Согласованные", code_name: "ApprovedDocuments",},
    { id: 6, name: "Просмотр Мои документы->Исполненные", code_name: "CompletedDocuments",},
    { id: 7, name: "Просмотр Мои документы->Отклоненные", code_name: "RejectedDocuments",},
    { id: 8, name: "Просмотр Мои документы->Регистрация документов", code_name: "OnRegistrationDocuments",},
    { id: 9, name: "Просмотр Подписание->Входящие", code_name: "ForSigningDocuments",},
    { id: 10, name: "Просмотр Подписание->Подписанные мною", code_name: "MySignedDocuments",},
    { id: 11, name: "Просмотр Подписание->Документы, подписанные в ООПЗ", code_name: "SignedInOOPZDocuments",},
    { id: 12, name: "Просмотр Задачи->Входящие",  code_name: "IncomeTasks" },
    { id: 13, name: "Может подписывать документы", code_name: "CanSignDocuments",}
  ]

  const table = "rights";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: arr.length,
    isIgnoreConflict: true,
  });

  console.log("rightsSeed executed");
};
