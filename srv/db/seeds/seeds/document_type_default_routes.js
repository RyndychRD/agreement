/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const { seedTable } = require("../../seedHelper/seedHelper");

const getItem = (position_id, user_id = -1) => {
  return { position_id: position_id, specified_signer_id: user_id };
};

exports.documentTypeDefaultRoutesSeed = async function (knex) {
  const arr = [
    {
      document_type_id: 10,
      route: {
        //Юрисконсульт
        //Директор технического  департамента
        //Начальник отдела по организации и проведению закупок
        //Директор департамента экономики и планирования
        //Директор ДМТС
        //Заместитель генерального  директора по финансовым и коммерческим вопросам
        //И.о. генерального директора  Заместитель генерального директора по производству
        routeSteps: [
          getItem(7),
          getItem(11),
          getItem(44),
          getItem(14),
          getItem(5),
          getItem(13),
          getItem(60),
        ],
      },
    },
    {
      document_type_id: 26,
      route: {
        //Юрисконсульт
        //Директор технического  департамента
        //Директор ДМТС
        //Начальник отдела по организации и проведению закупок
        //Директор департамента экономики и планирования
        //Заместитель генерального  директора по финансовым и коммерческим вопросам
        //И.о. генерального директора  Заместитель генерального директора по производству
        routeSteps: [
          getItem(7),
          getItem(11),
          getItem(5),
          getItem(44),
          getItem(14),
          getItem(13),
          getItem(60),
        ],
      },
    },
    {
      document_type_id: 24,
      route: {
        //Юрисконсульт
        //Директор технического  департамента
        //И.о. генерального директора  Заместитель генерального директора по производству
        routeSteps: [getItem(7), getItem(11), getItem(60)],
      },
    },
    {
      document_type_id: 27,
      route: {
        //Юрисконсульт
        //Директор ДМТС
        //Начальник отдела по организации и проведению закупок
        //Директор департамента экономики и планирования
        //Заместитель генерального  директора по финансовым и коммерческим вопросам
        //И.о. генерального директора  Заместитель генерального директора по производству
        routeSteps: [
          getItem(7),
          getItem(5),
          getItem(44),
          getItem(14),
          getItem(13),
          getItem(60),
        ],
      },
    },
    { document_type_id: 29, route: { routeSteps: [] } },
  ];

  const table = "departments-rights";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: 1,
    isAddCheck: true,
  });

  console.log("documentTypeDefaultRoutesSeed executed");
};
