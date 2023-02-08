/* cSpell:disable */

async function seedDocTasks(knex) {
  await knex("document_tasks").del();
  await knex.raw("SELECT setval('document_tasks_id_seq', 1, true);");
  await knex("document_tasks").insert([
    {
      creator_id: "1",
      executor_id: "3",
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
    {
      creator_id: "3",
      executor_id: "1",
      document_id: "2",
      step_num: "2",
      due_at: "2023-03-05",
      problem: "Выполненное поручение",
      result:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sunt voluptas. Odit quas exercitationem eaque explicabo modi maiores expedita veniam, neque repudiandae ex? Id suscipit repudiandae rem omnis magnam corrupti?",
      finished_at: "now",
      document_task_status_id: "2",
    },
  ]);
}
async function seedDocTaskValues(knex) {
  await knex("document_tasks-document_values").del();
  await knex.raw(
    "SELECT setval('document_tasks-document_values_id_seq', 1, true);"
  );
  await knex("document_tasks-document_values").insert([
    {
      document_task_id: "3",
      document_value_id: "2",
    },
    {
      document_task_id: "3",
      document_value_id: "3",
    },
    {
      document_task_id: "3",
      document_value_id: "4",
    },
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await seedDocTasks(knex);
  await seedDocTaskValues(knex);
};
