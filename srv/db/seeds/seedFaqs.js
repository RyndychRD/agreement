const { faqsSeed } = require("./seeds/faq");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await faqsSeed(knex);
};
