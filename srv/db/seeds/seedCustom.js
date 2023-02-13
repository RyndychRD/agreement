const { departmentRightsSeed } = require("./seeds/departments-rights");
const { positionSeed } = require("./seeds/positions");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return;
  await positionSeed(knex);
};
