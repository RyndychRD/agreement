/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.rightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rights").del();
  await knex.raw("SELECT setval('rights_id_seq', 4, true);");
  await knex("rights").insert([
    { id: "1", name: "Администратор" },
    { id: "2", name: "Просмотр согласования договоров" },
    { id: "3", name: "Доступ к удалению" },
    { id: "4", name: "Доступ к созданию" },
  ]);
};
