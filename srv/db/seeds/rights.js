/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("rights").del();
  await knex.raw("SELECT setval('rights_id_seq', 3, true);");
  await knex("rights").insert([
    { id: "1", name: "Администратор" },
    { id: "2", name: "Просмотр согласования договоров" },
    { id: "3", name: "Просмотр раздела Созданные мной документы" },
  ]);
};
