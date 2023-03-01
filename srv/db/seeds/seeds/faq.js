const { seedTable } = require("../../seedHelper/seedHelper");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.faqsSeed = async function (knex) {
  // prettier-ignore
  const arr=[
    {name: "Как создать документ", url: "/FAQ/Creation.pdf" },
    {name: "Как подписать документ", url: "/FAQ/Signing.pdf" },
    {name: "Как выполнить поручение", url: "/FAQ/TaskComplete.pdf" },
    {name: "У меня не работает Предпросмотр файлов, что делать?", url: "/FAQ/FilePreview.pdf"},
  ]

  const table = "FAQs";

  await seedTable(knex, {
    table: table,
    arr: arr,
    index: arr.length,
    isIgnoreConflict: true,
  });

  console.log("faqsSeed executed");
};
