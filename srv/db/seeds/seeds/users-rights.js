const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.userRightsSeed = async function (knex) {
  const arr = [{ right_id: "1", user_id: "1" }];

  const table = "users-rights";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: arr.length,
    isAddCheck: true,
  });

  console.log("userRightsSeed executed");
};
