/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.departmentsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("departments").del();
  await knex.raw("SELECT setval('departments_id_seq', 22, true);");
  await knex("departments").insert([
    { id: "1", name: "Департамент материально-технического снабжения" },
    { id: "2", name: "Департамент экономики и планирования" },
    { id: "3", name: "Администрация" },
    { id: "4", name: "Служба безопасности охраны труда и экологии" },
    { id: "5", name: "Департамент продаж" },
    { id: "6", name: "Технический департамент" },
    { id: "7", name: "Отдел по организации и проведению закупок" },
    {
      id: "8",
      name: "Отдел информационных технологий и информационной безопасности",
    },
    { id: "9", name: "Бюро комплексных работ" },
    { id: "10", name: "Отдел по работе с персоналом" },
    { id: "11", name: "Планово-производственный отдел" },
    { id: "12", name: "Представительство АО г. Астана" },
    {
      id: "13",
      name: "Департамент правового, документационного обеспечения и охраны труда",
    },
    { id: "14", name: "Сервисный центр" },
    { id: "15", name: "Энергомеханическая служба" },
    { id: "16", name: "Механический цех №1" },
    { id: "17", name: "Сборочный цех №2" },
    { id: "18", name: "Техническое бюро" },
    { id: "20", name: "Бюро метрологии и испытаний" },
    { id: "21", name: "Конструкторское бюро №1" },
    { id: "22", name: "Конструкторское бюро №2" },
  ]);
  console.log("departmentsSeed executed");
};