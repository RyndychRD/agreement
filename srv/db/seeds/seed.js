const { departmentsSeed } = require("./seeds/departments");
const { departmentRightsSeed } = require("./seeds/departments-rights");
const {
  documentElementIODictionarySeed,
} = require("./seeds/document_element_IO_dictionary");
const {
  documentSignatureTypesSeed,
} = require("./seeds/document_signature_types");
const { documentStatusesSeed } = require("./seeds/document_statuses");
const { documentTypesSeed } = require("./seeds/document_types");
const {
  documentTypeDefaultRoutesSeed,
} = require("./seeds/document_type_default_routes");
const { positionSeed } = require("./seeds/positions");
const { positionRightsSeed } = require("./seeds/positions-rights");
const { rightsSeed } = require("./seeds/rights");
const { usersSeed } = require("./seeds/users");
const { userRightsSeed } = require("./seeds/users-rights");
const { documentTypeViewsSeed } = require("./seeds/document_type_views");
const { documentTaskStatusesSeed } = require("./seeds/document_task_statuses");
const { archiveLogEventTypesSeed } = require("./seeds/archive_log_event_types");
const { archiveTypesSeed } = require("./seeds/archive_types");
const { documentTaskTypesSeed } = require("./seeds/document_task_types");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await departmentsSeed(knex);
  await positionSeed(knex);
  await usersSeed(knex);
  await rightsSeed(knex);
  await departmentRightsSeed(knex);
  await documentSignatureTypesSeed(knex);
  await documentStatusesSeed(knex);
  await documentTypesSeed(knex);
  await positionRightsSeed(knex);
  await userRightsSeed(knex);
  await documentTypeDefaultRoutesSeed(knex);
  await documentElementIODictionarySeed(knex);
  await documentTypeViewsSeed(knex);
  await documentTaskStatusesSeed(knex);
  await archiveLogEventTypesSeed(knex);
  await archiveTypesSeed(knex);
  await documentTaskTypesSeed(knex);
};
