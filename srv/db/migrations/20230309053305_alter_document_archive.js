exports.up = function (knex) {
  return knex.schema.table("document_archives", function (table) {
    table.unique("document_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("document_archives", function (table) {
    table.dropUnique("document_id");
  });
};
