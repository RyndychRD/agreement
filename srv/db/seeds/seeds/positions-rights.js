const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.positionRightsSeed = async function (knex) {
  const arr = [];

  const table = "positions-rights";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: arr.length,
    isAddCheck: true,
  });

  console.log("positionRightsSeed executed");
};
