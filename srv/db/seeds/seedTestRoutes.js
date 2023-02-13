const {
  documentTypeDefaultRoutesSeed,
} = require("./seeds/document_type_default_routes");

exports.seed = async function (knex) {
  console.log("!Маршруты не обновлены!");
  return;
  await documentTypeDefaultRoutesSeed(knex);
};
