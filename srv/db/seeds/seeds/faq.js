/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.faqsSeed = async function (knex) {
  // Deletes ALL existing entries
  await knex("FAQs").del();
  await knex("FAQs").insert([
    { id: "1", name: "Как создать документ", url: "/FAQ/Creation.pdf" },
    { id: "2", name: "Как подписать документ", url: "/FAQ/Signing.pdf" },
    { id: "3", name: "Как выполнить поручение", url: "/FAQ/TaskComplete.pdf" },
    {
      id: "4",
      name: "У меня не работает Предпросмотр файлов, что делать?",
      url: "/FAQ/FilePreview.pdf",
    },
  ]);
  console.log("faqsSeed executed");
};
