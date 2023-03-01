const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentSignatureTypesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Согласовано" },
    { id: 2, name: "Не согласовано" },
    { id: 3, name: "Согласовано с замечаниями" },
  ];

  const table = "document_signature_types";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });

  console.log("documentSignatureTypesSeed executed");
};
