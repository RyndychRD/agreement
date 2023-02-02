/* cSpell:disable */

async function seedDocTasks(knex) {
  await knex("document_tasks").del();
  await knex.raw("SELECT setval('document_tasks_id_seq', 1, true);");
  await knex("document_tasks").insert([
    {
      creator_id: "1",
      executor_id: "1",
      document_id: "2",
      step_num: "1",
      due_at: "2023-02-05",
      problem: "Поручение номер 1",
      document_task_status_id: "1",
    },
    {
      creator_id: "3",
      executor_id: "1",
      document_id: "2",
      step_num: "2",
      due_at: "2023-03-05",
      problem: "Поручение номер 2",
      document_task_status_id: "1",
    },
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await seedDocTasks(knex);
};
