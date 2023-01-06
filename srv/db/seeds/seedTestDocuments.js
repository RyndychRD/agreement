/* cSpell:disable */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("documents").del();
  await knex.raw("SELECT setval('documents_id_seq', 1, true);");
  await knex("documents").insert([
    {
      name: "Я Закуп ТРУ, который должен отображаться в Созданные мною и Все документы",
      document_status_id: "5",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      name: "Я Согласование на продажу готовой продукции, который должен отображаться в Созданные мною и в На доработку  и Все документы",
      document_status_id: "7",
      document_type_id: "26",
      creator_id: "1",
    },
    {
      name: "Я Закуп ТРУ, который должен отображаться в Созданные мною и в Согласованные  и Все документы",
      document_status_id: "4",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      name: "Я Закуп ТРУ, который должен отображаться в Созданные мною и в Исполненные  и Все документы",
      document_status_id: "10",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      name: "Я Закуп ТРУ, который должен отображаться в Созданные мною и в Отклоненные  и Все документы",
      document_status_id: "2",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      name: "Я Закуп ТРУ, который должен отображаться в Созданные мною и в Регистрация документов  и Все документы",
      document_status_id: "8",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      name: "Я Закуп ТРУ от Небогина, который должен отображаться в Созданные мною и в Регистрация документов  и Все документы",
      document_status_id: "8",
      document_type_id: "10",
      creator_id: "3",
    },
  ]);
};
