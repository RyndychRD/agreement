const { documentTypeViewsSeed } = require("./seeds/document_type_views");

exports.seed = async function (knex) {
  console.log("!Тестовые формы не обновлены!");
  return;
  await documentTypeViewsSeed(knex);
};
