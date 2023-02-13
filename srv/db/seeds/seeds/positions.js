/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.positionSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("positions").del();
  await knex.raw("SELECT setval('positions_id_seq', 64, true);");
  await knex("positions").insert([
    {
      id: 2,
      name: "Заместитель генерального директора по экономике и финансам",

      department_id: 3,
    },
    {
      id: 3,
      name: "Заместитель генерального директора по производству",

      department_id: 3,
    },
    { id: 4, name: "И.о. главного инженера", department_id: 3 },
    {
      id: 5,
      name: "Директор Департамент материально-технического снабжения",

      department_id: 1,
    },
    { id: 6, name: "И.о. начальника ООПЗ", department_id: 7 },
    { id: 7, name: "Юрисконсульт", department_id: 13 },
    { id: 8, name: "Начальник ОИТИБ", department_id: 8 },
    { id: 9, name: "Агент по снабжению", department_id: 1 },
    { id: 10, name: "atest", department_id: 1 },
    {
      id: 11,
      name: "Директор технического  департамента",

      department_id: 6,
    },
    {
      id: 12,
      name: "Директор департамента продаж",

      department_id: 5,
    },
    {
      id: 13,
      name: "Заместитель генерального  директора по финансовым и коммерческим вопросам",

      department_id: 3,
    },
    {
      id: 14,
      name: "Директор департамента экономики и планирования",

      department_id: 2,
    },
    {
      id: 15,
      name: "Временно не использовать для обозначение брать и.о гендир - Генеральный директор",

      department_id: 3,
    },
    {
      id: 16,
      name: "Начальник ОРП-HR  эксперт",

      department_id: 10,
    },
    {
      id: 17,
      name: "Главный технический руководитель по ОТ и ТБ",

      department_id: 4,
    },
    { id: 18, name: "Специалист по СМК", department_id: 10 },
    {
      id: 19,
      name: "Инженер по защите информации",

      department_id: 8,
    },
    {
      id: 20,
      name: "Заместитель директора ДП по ГОЗ и спецпродукции",

      department_id: 5,
    },
    {
      id: 21,
      name: "Заместитель директора ДП по гражданской продукции",

      department_id: 5,
    },
    {
      id: 22,
      name: "Заместитель директора ДП (г.Нур-Султан)",

      department_id: 5,
    },
    { id: 23, name: "Менеджер по продажам", department_id: 5 },
    { id: 24, name: "Менеджер по ГОЗ", department_id: 5 },
    { id: 25, name: "Менеджер по логистике", department_id: 5 },
    {
      id: 26,
      name: "Менеджер по связям с общественностью (PR-менеджер)",

      department_id: 5,
    },
    { id: 27, name: "Делопроизводитель", department_id: 5 },
    { id: 28, name: "Интернет-маркетолог", department_id: 5 },
    {
      id: 29,
      name: "Специалист по учету готовой продукции и работе с клиентами",

      department_id: 5,
    },
    {
      id: 30,
      name: "Руководитель представительства",

      department_id: 12,
    },
    {
      id: 31,
      name: "Менеджер представительста",

      department_id: 12,
    },
    {
      id: 32,
      name: "Ведущий инженер-экономист",

      department_id: 2,
    },
    {
      id: 33,
      name: "Старший инженер-экономист (договора на закуп ТМЦ на изделия)",

      department_id: 2,
    },
    {
      id: 34,
      name: "И.о. начальника отдела по организации и проведения закупок",

      department_id: 7,
    },
    {
      id: 35,
      name: "Специалист по таможенному оформлению",

      department_id: 1,
    },
    {
      id: 36,
      name: "Ведущий специалист по снабжению",

      department_id: 1,
    },
    {
      id: 37,
      name: "Заместитель директора ДМТС",

      department_id: 5,
    },
    {
      id: 38,
      name: "Начальник производства - начальник ППО",

      department_id: 11,
    },
    { id: 39, name: "Начальник БКР", department_id: 9 },
    {
      id: 40,
      name: "Инженер по научно-технической информации",

      department_id: 9,
    },
    {
      id: 42,
      name: "Советник по безопасности",

      department_id: 3,
    },
    {
      id: 43,
      name: "Заместитель генерального директора по стратегическому развитию и новым проектам ",

      department_id: 3,
    },
    {
      id: 44,
      name: "Начальник отдела по организации и проведению закупок",

      department_id: 7,
    },
    {
      id: 45,
      name: "Ведущий инженер-программист",

      department_id: 8,
    },
    {
      id: 46,
      name: "Системный администратор",

      department_id: 8,
    },
    { id: 47, name: "Техник ВЦ", department_id: 8 },
    {
      id: 48,
      name: "Директор сервисного центра",

      department_id: 14,
    },
    {
      id: 49,
      name: "Начальник энергомеханической службы",

      department_id: 15,
    },
    {
      id: 50,
      name: "Начальник механического цеха №1",

      department_id: 16,
    },
    {
      id: 51,
      name: "Начальник сборочного цеха №2",

      department_id: 17,
    },
    {
      id: 52,
      name: "Ведущий специалист по закупкам",

      department_id: 7,
    },
    {
      id: 53,
      name: "Специалист по закупкам",

      department_id: 7,
    },
    {
      id: 54,
      name: "Заместитель директора технического департамента",

      department_id: 6,
    },
    { id: 55, name: "Начальник КБ1", department_id: 21 },
    { id: 56, name: "Начальник КБ2", department_id: 22 },
    {
      id: 57,
      name: "Начальник технического бюро",

      department_id: 18,
    },
    { id: 58, name: "Начальник БМИ", department_id: 20 },
    {
      id: 59,
      name: "Заместитель директора Департамента экономики и планирования",

      department_id: 3,
    },
    {
      id: 60,
      name: "И.о. генерального директора - Заместитель генерального директора по производству",

      department_id: 3,
    },
    {
      id: 61,
      name: "И.о. директора департамента продаж",

      department_id: 5,
    },
    { id: 63, name: "Экономист", department_id: 7 },
    { id: 64, name: "Руководитель ГДО", department_id: 23 },
  ]);
  console.log("positionSeed executed");
};
