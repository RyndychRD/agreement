/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.positionSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("positions").del();
  await knex.raw("SELECT setval('positions_id_seq', 63, true);");
  await knex("positions").insert([
    {
      id: 2,
      name: "Заместитель генерального директора по экономике и финансам",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 3,
      name: "Заместитель генерального директора по производству",
      is_signer: 0,
      department_id: 3,
    },
    { id: 4, name: "И.о. главного инженера", is_signer: 0, department_id: 3 },
    {
      id: 5,
      name: "Директор Департамент материально-технического снабжения",
      is_signer: 1,
      department_id: 1,
    },
    { id: 6, name: "И.о. начальника ООПЗ", is_signer: 0, department_id: 7 },
    { id: 7, name: "Юрисконсульт", is_signer: 0, department_id: 13 },
    { id: 8, name: "Начальник ОИТИБ", is_signer: 1, department_id: 8 },
    { id: 9, name: "Агент по снабжению", is_signer: 0, department_id: 1 },
    { id: 10, name: "atest", is_signer: 0, department_id: 1 },
    {
      id: 11,
      name: "Директор технического  департамента",
      is_signer: 1,
      department_id: 6,
    },
    {
      id: 12,
      name: "Директор департамента продаж",
      is_signer: 1,
      department_id: 5,
    },
    {
      id: 13,
      name: "Заместитель генерального  директора по финансовым и коммерческим вопросам",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 14,
      name: "Директор департамента экономики и планирования",
      is_signer: 1,
      department_id: 2,
    },
    {
      id: 15,
      name: "Временно не использовать для обозначение брать и.о гендир - Генеральный директор",
      is_signer: 1,
      department_id: 3,
    },
    {
      id: 16,
      name: "Начальник ОРП-HR  эксперт",
      is_signer: 1,
      department_id: 10,
    },
    {
      id: 17,
      name: "Главный технический руководитель по ОТ и ТБ",
      is_signer: 1,
      department_id: 4,
    },
    { id: 18, name: "Специалист по СМК", is_signer: 0, department_id: 10 },
    {
      id: 19,
      name: "Инженер по защите информации",
      is_signer: 0,
      department_id: 8,
    },
    {
      id: 20,
      name: "Заместитель директора ДП по ГОЗ и спецпродукции",
      is_signer: 0,
      department_id: 5,
    },
    {
      id: 21,
      name: "Заместитель директора ДП по гражданской продукции",
      is_signer: 0,
      department_id: 5,
    },
    {
      id: 22,
      name: "Заместитель директора ДП (г.Нур-Султан)",
      is_signer: 0,
      department_id: 5,
    },
    { id: 23, name: "Менеджер по продажам", is_signer: 0, department_id: 5 },
    { id: 24, name: "Менеджер по ГОЗ", is_signer: 0, department_id: 5 },
    { id: 25, name: "Менеджер по логистике", is_signer: 0, department_id: 5 },
    {
      id: 26,
      name: "Менеджер по связям с общественностью (PR-менеджер)",
      is_signer: 0,
      department_id: 5,
    },
    { id: 27, name: "Делопроизводитель", is_signer: 0, department_id: 5 },
    { id: 28, name: "Интернет-маркетолог", is_signer: 0, department_id: 5 },
    {
      id: 29,
      name: "Специалист по учету готовой продукции и работе с клиентами",
      is_signer: 0,
      department_id: 5,
    },
    {
      id: 30,
      name: "Руководитель представительства",
      is_signer: 1,
      department_id: 12,
    },
    {
      id: 31,
      name: "Менеджер представительста",
      is_signer: 0,
      department_id: 12,
    },
    {
      id: 32,
      name: "Ведущий инженер-экономист",
      is_signer: 0,
      department_id: 2,
    },
    {
      id: 33,
      name: "Старший инженер-экономист (договора на закуп ТМЦ на изделия)",
      is_signer: 0,
      department_id: 2,
    },
    {
      id: 34,
      name: "И.о. начальника отдела по организации и проведения закупок",
      is_signer: 0,
      department_id: 7,
    },
    {
      id: 35,
      name: "Специалист по таможенному оформлению",
      is_signer: 0,
      department_id: 1,
    },
    {
      id: 36,
      name: "Ведущий специалист по снабжению",
      is_signer: 0,
      department_id: 1,
    },
    {
      id: 37,
      name: "Заместитель директора ДМТС",
      is_signer: 0,
      department_id: 5,
    },
    {
      id: 38,
      name: "Начальник производства - начальник ППО",
      is_signer: 1,
      department_id: 11,
    },
    { id: 39, name: "Начальник БКР", is_signer: 1, department_id: 9 },
    {
      id: 40,
      name: "Инженер по научно-технической информации",
      is_signer: 0,
      department_id: 9,
    },
    {
      id: 42,
      name: "Советник по безопасности",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 43,
      name: "Заместитель генерального директора по стратегическому развитию и новым проектам ",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 44,
      name: "Начальник отдела по организации и проведению закупок",
      is_signer: 1,
      department_id: 7,
    },
    {
      id: 45,
      name: "Ведущий инженер-программист",
      is_signer: 0,
      department_id: 8,
    },
    {
      id: 46,
      name: "Системный администратор",
      is_signer: 0,
      department_id: 8,
    },
    { id: 47, name: "Техник ВЦ", is_signer: 0, department_id: 8 },
    {
      id: 48,
      name: "Директор сервисного центра",
      is_signer: 1,
      department_id: 14,
    },
    {
      id: 49,
      name: "Начальник энергомеханической службы",
      is_signer: 1,
      department_id: 15,
    },
    {
      id: 50,
      name: "Начальник механического цеха №1",
      is_signer: 1,
      department_id: 16,
    },
    {
      id: 51,
      name: "Начальник сборочного цеха №2",
      is_signer: 1,
      department_id: 17,
    },
    {
      id: 52,
      name: "Ведущий специалист по закупкам",
      is_signer: 0,
      department_id: 7,
    },
    {
      id: 53,
      name: "Специалист по закупкам",
      is_signer: 0,
      department_id: 7,
    },
    {
      id: 54,
      name: "Заместитель директора технического департамента",
      is_signer: 0,
      department_id: 6,
    },
    { id: 55, name: "Начальник КБ1", is_signer: 1, department_id: 21 },
    { id: 56, name: "Начальник КБ2", is_signer: 1, department_id: 22 },
    {
      id: 57,
      name: "Начальник технического бюро",
      is_signer: 1,
      department_id: 18,
    },
    { id: 58, name: "Начальник БМИ", is_signer: 1, department_id: 20 },
    {
      id: 59,
      name: "Заместитель директора Департамента экономики и планирования",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 60,
      name: "И.о. генерального директора - Заместитель генерального директора по производству",
      is_signer: 0,
      department_id: 3,
    },
    {
      id: 61,
      name: "И.о. директора департамента продаж",
      is_signer: 0,
      department_id: 5,
    },
    { id: 63, name: "Экономист", is_signer: 0, department_id: 7 },
  ]);
  console.log("positionSeed executed");
};
