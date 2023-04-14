const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTaskTypesSeed = async function (knex) {
  const arr = [
    {
      id: 2,
      name: "Поручение для 2 листа согласования Закупа ТРУ",
    },
    {
      id: 3,
      name: "Поручение для сбора данных на Регистрацию документов",
    },
  ];

  const table = "document_task_types";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });

  console.log("documentTaskTypesSeed executed");
};
