const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.documentTypesSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    { id: 10, name: "Закуп ТРУ" },
    { id: 26, name: "Согласование на продажу готовой продукции" },
    { id: 24, name: "Согласование на закуп ТРУ для производства продукции" },
    { id: 27, name: "Согласование на закуп ТРУ для внутризаводских нужд и капитальных затрат"},
    { id: 29, name: "Другой" },
  ]

  const table = "document_types";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: 29,
    isAddCheck: true,
  });

  console.log("documentTypesSeed executed");
};
