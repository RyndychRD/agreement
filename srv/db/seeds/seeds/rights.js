/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.rightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rights").del();
  await knex.raw("SELECT setval('rights_id_seq', 4, true);");
  await knex("rights").insert([
    { id: "1", name: "Администратор", code_name: "Admin" },
    {
      id: "2",
      name: "Просмотр согласования договоров",
      code_name: "ContractAgreement",
    },
    {
      id: "3",
      name: "Просмотр Мои документы->Созданных мною",
      code_name: "CreatedDocuments",
    },
    {
      id: "4",
      name: "Просмотр Мои документы->На доработку",
      code_name: "ReworkDocuments",
    },
    {
      id: "5",
      name: "Просмотр Мои документы->Согласованные",
      code_name: "ApprovedDocuments",
    },
    {
      id: "6",
      name: "Просмотр Мои документы->Исполненные",
      code_name: "CompletedDocuments",
    },
    {
      id: "7",
      name: "Просмотр Мои документы->Отклоненные",
      code_name: "RejectedDocuments",
    },
    {
      id: "8",
      name: "Просмотр Мои документы->Регистрация документов",
      code_name: "OnRegistrationDocuments",
    },
    {
      id: "9",
      name: "Просмотр Подписание->Входящие",
      code_name: "ForApprovalDocuments",
    },
    {
      id: "10",
      name: "Просмотр Подписание->Подписанные мною",
      code_name: "MySignedForApprovalDocuments",
    },
    {
      id: "11",
      name: "Просмотр Подписание->Документы, подписанные в ООПЗ",
      code_name: "SignedInOOPZDocuments",
    },
    { id: "12", name: "Просмотр Задачи->Входящие", code_name: "IncomeTasks" },
  ]);
  console.log("rightsSeed executed");
};
