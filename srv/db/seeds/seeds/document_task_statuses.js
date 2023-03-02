const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTaskStatusesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Поручено" },
    { id: 2, name: "Выполнено" },
  ];

  const table = "document_task_statuses";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });

  console.log("documentTaskStatusesSeed executed");
};
