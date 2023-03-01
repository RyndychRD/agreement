/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.archiveTypesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Военный" },
    { id: 2, name: "Гражданский" },
    { id: 3, name: "Внутризаводской" },
  ];
  // Deletes ALL existing entries
  await knex("archive_types").del();
  await knex.raw(`SELECT setval('archive_types_id_seq', ${arr.length}, true);`);
  await knex("archive_types").insert(arr);
  console.log("archiveTypesSeed executed");
};
