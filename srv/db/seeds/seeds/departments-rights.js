/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.departmentRightsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("departments-rights").del();
  await knex.raw("SELECT setval('departments-rights_id_seq', 1, true);");
  await knex("departments-rights").insert([
    { right_id: "2", department_id: "1" },
    { right_id: "2", department_id: "2" },
    { right_id: "1", department_id: "3" },
    { right_id: "2", department_id: "3" },
    { right_id: "3", department_id: "3" },
    { right_id: "4", department_id: "3" },
    { right_id: "2", department_id: "4" },
    { right_id: "2", department_id: "5" },
    { right_id: "2", department_id: "6" },
    { right_id: "2", department_id: "7" },
    { right_id: "2", department_id: "8" },
    { right_id: "2", department_id: "9" },
    { right_id: "2", department_id: "10" },
    { right_id: "2", department_id: "11" },
    { right_id: "2", department_id: "12" },
    { right_id: "2", department_id: "13" },
    { right_id: "2", department_id: "14" },
    { right_id: "2", department_id: "15" },
    { right_id: "2", department_id: "16" },
    { right_id: "2", department_id: "17" },
    { right_id: "2", department_id: "18" },
    { right_id: "2", department_id: "20" },
    { right_id: "2", department_id: "21" },
    { right_id: "2", department_id: "22" },
  ]);
};
