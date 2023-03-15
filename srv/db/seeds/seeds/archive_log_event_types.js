const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.archiveLogEventTypesSeed = async function (knex) {
  const arr = [
    { id: 1, name: "Пользователь зашел" },
    { id: 2, name: "Документ открыт" },
    { id: 3, name: "Файл скачен" },
    { id: 4, name: "Файл предпросмотрен" },
  ];
  const table = "archive_log_event_types";

  await seedTable(knex, {
    table: table,
    arr: arr,
    isIgnoreConflict: true,
    index: arr.length,
  });
  console.log("archiveLogEventTypesSeed executed");
};
