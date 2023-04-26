const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentStatusesSeed = async function (knex) {
  const arr = [
    { id: 5, name: "В работе" },
    { id: 2, name: "Отклонен" },
    { id: 8, name: "На регистрации" },
    { id: 4, name: "Согласован" },
    { id: 9, name: "Документ в ООПЗ" },
    { id: 10, name: "Исполнен" },
    { id: 11, name: "Архивный" },
    { id: 12, name: "Действующий" },
  ];

  const table = "document_statuses";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: 11,
  });

  console.log("documentStatusesSeed executed");
};
