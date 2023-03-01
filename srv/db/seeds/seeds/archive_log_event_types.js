/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.archiveLogEventTypesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Пользователь зашел" },
    { id: 2, name: "Документ открыт" },
    { id: 3, name: "Файл скачен/предпросмотрен" },
  ];
  // Deletes ALL existing entries
  await knex("archive_log_event_types").del();
  await knex.raw(
    `SELECT setval('archive_log_event_types_id_seq', ${arr.length}, true);`
  );
  await knex("archive_log_event_types").insert(arr);
  console.log("archiveLogEventTypesSeed executed");
};
