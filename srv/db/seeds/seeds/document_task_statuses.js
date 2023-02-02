/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTaskStatusesSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("document_task_statuses").del();
  await knex("document_task_statuses").insert([
    { name: "Поручено" },
    { name: "Выполнено" },
  ]);
  console.log("documentTaskStatusesSeed executed");
};
