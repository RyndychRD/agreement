/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .renameTable("document_mitvorg", "document_registration")
    .then(function () {
      return knex.schema.table("document_registration", function (table) {
        table.renameColumn("number", "registration_number");
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .renameTable("document_registration", "document_mitvorg")
    .then(function () {
      return knex.schema.table("document_mitvorg", function (table) {
        table.renameColumn("registration_number", "number");
      });
    });
};
