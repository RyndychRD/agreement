const { archiveLogEventTypesSeed } = require("./seeds/archive_log_event_types");
const { archiveTypesSeed } = require("./seeds/archive_types");
const { departmentRightsSeed } = require("./seeds/departments-rights");
const { positionSeed } = require("./seeds/positions");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await archiveLogEventTypesSeed(knex);
  await archiveTypesSeed(knex);
  return;
};
