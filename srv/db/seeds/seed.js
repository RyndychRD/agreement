const { departmentsSeed } = require("./seeds/departments");
const { departmentRightsSeed } = require("./seeds/departments-rights");
const {
  documentSignatureTypesSeed,
} = require("./seeds/document_signature_types");
const { documentStatusesSeed } = require("./seeds/document_statuses");
const { documentTypesSeed } = require("./seeds/document_types");
const { positionSeed } = require("./seeds/positions");
const { positionRightsSeed } = require("./seeds/positions-rights");
const { rightsSeed } = require("./seeds/rights");
const { usersSeed } = require("./seeds/users");
const { userRightsSeed } = require("./seeds/users-rights");

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
};
