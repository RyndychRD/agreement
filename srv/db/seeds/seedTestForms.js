const { documentTypeViewsSeed } = require("./seeds/document_type_views");

exports.seed = async function (knex) {
  await documentTypeViewsSeed(knex);
};
