const {
  documentTypeDefaultRoutesSeed,
} = require("./seeds/document_type_default_routes");

exports.seed = async function (knex) {
  await documentTypeDefaultRoutesSeed(knex);
};
