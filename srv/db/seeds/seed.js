const { departmentsSeed } = require("./seeds/departments");
const { departmentRightsSeed } = require("./seeds/departments-rights");
const {
  documentSignatureTypesSeed,
} = require("./seeds/document_signature_types");
const { documentStatusesSeed } = require("./seeds/document_statuses");
const { documentTypesSeed } = require("./seeds/document_types");
const { positionSeed } = require("./seeds/positions");
const { rightsSeed } = require("./seeds/rights");
const { usersSeed } = require("./seeds/users");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await usersSeed(knex);
  await rightsSeed(knex);
  await departmentsSeed(knex);
  await positionSeed(knex);
  await departmentRightsSeed(knex);
  await documentSignatureTypesSeed(knex);
  await documentStatusesSeed(knex);
  await documentTypesSeed(knex);
};
