/* cSpell:disable */

async function seedDocs(knex) {
  await knex("documents").del();
  await knex.raw("SELECT setval('documents_id_seq', 3, true);");
  await knex("documents").insert([
    {
      id: 1,
      name: "Я Закуп ТРУ с 2 подписантами в маршруте из 3 шагов",
      document_status_id: "5",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      id: 2,
      name: "Я Закуп ТРУ с 1 подписантом в маршруте из 3 шагов",
      document_status_id: "5",
      document_type_id: "10",
      creator_id: "1",
    },
    {
      id: 3,
      name: "Я Закуп ТРУ согласованный",
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
}

async function seedDocRoute(knex) {
  await knex("documents-signers_route").del();
  await knex.raw("SELECT setval('documents-signers_route_id_seq', 1, true);");
  await knex("documents-signers_route").insert([
    {
      document_id: 1,
      signer_id: 1,
      step: 1,
    },
    {
      document_id: 1,
      signer_id: 3,
      step: 2,
    },
    {
      document_id: 1,
      signer_id: 3,
      deputy_signer_id: 1,
      step: 3,
    },
    {
      document_id: 2,
      signer_id: 1,
      step: 1,
    },
    {
      document_id: 2,
      signer_id: 1,
      step: 2,
    },
    {
      document_id: 2,
      signer_id: 3,
      deputy_signer_id: 1,
      step: 3,
    },
    {
      document_id: 3,
      signer_id: 1,
      actual_signer_id: 1,
      document_signature_type_id: 1,
      step: 1,
    },
    {
      document_id: 3,
      signer_id: 3,
      actual_signer_id: 3,
      document_signature_type_id: 1,
      step: 2,
    },
    {
      document_id: 3,
      signer_id: 3,
      actual_signer_id: 3,
      document_signature_type_id: 1,
      deputy_signer_id: 1,
      step: 3,
    },
  ]);
}
async function seedDocValues(knex) {
  await knex("document_values").del();
  await knex.raw("SELECT setval('document_values_id_seq', 1, true);");
  await knex("document_values").insert([
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Payment_currency",
      value: "Казахстанский тенге",
      label: "Валюта",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Data_Document",
      value: "2023-02-02",
      label: "Дата",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Counterparty_contacts",
      value: "320",
      label: "Контакты",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Subdivision_name",
      value: "1",
      label: "Подразделение",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Contractors_phone_number",
      value: "20",
      label: "Телефон",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Email_contacts",
      value: "r.roman1234@yandex.ru",
      label: "Мыло",
    },
    {
      document_id: 2,
      document_element_IO_dictionary_key: "Name_of_Goods_Works_Services",
      value: "ewq",
      label: "Поле ввода",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Payment_currency",
      value: "Казахстанский тенге",
      label: "Валюта",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Data_Document",
      value: "2023-02-02",
      label: "Дата",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Counterparty_contacts",
      value: "320",
      label: "Контакты",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Subdivision_name",
      value: "1",
      label: "Подразделение",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Contractors_phone_number",
      value: "20",
      label: "Телефон",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Email_contacts",
      value: "r.roman1234@yandex.ru",
      label: "Мыло",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Name_of_Goods_Works_Services",
      value: "ewq",
      label: "Поле ввода",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Contractors_phone_number",
      value: "20",
      label: "Телефон",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Email_contacts",
      value: "r.roman1234@yandex.ru",
      label: "Мыло",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Name_of_Goods_Works_Services",
      value: "ewq",
      label: "Поле ввода",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Email_contacts",
      value: "r.roman1234@yandex.ru",
      label: "Мыло",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Name_of_Goods_Works_Services",
      value: "ewq",
      label: "Поле ввода",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Email_contacts",
      value: "r.roman1234@yandex.ru",
      label: "Мыло",
    },
    {
      document_id: 3,
      document_element_IO_dictionary_key: "Name_of_Goods_Works_Services",
      value: "ewq",
      label: "Поле ввода",
    },
  ]);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await seedDocs(knex);
  await seedDocRoute(knex);
  await seedDocValues(knex);
};
