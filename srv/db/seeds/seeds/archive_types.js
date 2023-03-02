const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.archiveTypesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Военный" },
    { id: 2, name: "Гражданский" },
    { id: 3, name: "Внутризаводской" },
  ];
  const table = "archive_types";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });
  console.log("archiveTypesSeed executed");
};
