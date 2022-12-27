/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentSignatureTypesSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("document_signature_types").del();
  await knex.raw("SELECT setval('document_signature_types_id_seq', 3, true);");
  await knex("document_signature_types").insert([
    { id: 1, name: "Согласовано" },
    { id: 2, name: "Не согласовано" },
    { id: 3, name: "Согласовано с замечаниями" },
  ]);
};
