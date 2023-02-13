/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.positionRightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("positions-rights").del();
  await knex.raw("SELECT setval('positions-rights_id_seq', 1, true);");
  // await knex("positions-rights").insert([
  // ]);
  console.log("positionRightsSeed executed");
};
