/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.positionRightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("positions-rights").del();
  await knex.raw("SELECT setval('positions-rights_id_seq', 1, true);");
  await knex("positions-rights").insert([
    { right_id: "1", position_id: "2" },
    { right_id: "2", position_id: "2" },
    { right_id: "3", position_id: "2" },
    { right_id: "2", position_id: "3" },
  ]);
  console.log("positionRightsSeed executed");
};
