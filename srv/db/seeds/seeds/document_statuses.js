/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentStatusesSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("document_statuses").del();
  await knex.raw("SELECT setval('document_statuses_id_seq', 10, true);");
  await knex("document_statuses").insert([
    { id: 5, name: "В работе" },
    { id: 2, name: "Отклонен" },
    { id: 7, name: "На доработке" },
    { id: 8, name: "На регистрации" },
    { id: 4, name: "Согласован" },
    { id: 9, name: "Документ в ООПЗ" },
    { id: 10, name: "Исполнен" },
  ]);
};
