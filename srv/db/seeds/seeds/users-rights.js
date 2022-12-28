/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.userRightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users-rights").del();
  await knex.raw("SELECT setval('users-rights_id_seq', 1, true);");
  await knex("users-rights").insert([
    { right_id: "1", user_id: "1" },
    { right_id: "2", user_id: "8" },
    { right_id: "3", user_id: "8" },
  ]);
  console.log("userRightsSeed executed");
};
