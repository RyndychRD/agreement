/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("document_tasks", function (table) {
    table.increments("id");
    table
      .integer("creator_id")
      .comment("Ссылка на пользователя, создавшего задачу")
      .unsigned()
      .references("users.id")
      .onDelete("SET NULL");
    table
      .integer("executor_id")
      .comment("Ссылка на пользователя, получившего задачу")
      .unsigned()
      .references("users.id")
      .onDelete("SET NULL");
    table
      .integer("document_id")
      .comment("Ссылка на документ, к которой привязана эта задача")
      .unsigned()
      .references("documents.id")
      .onDelete("CASCADE");
    table
      .integer("step_num")
      .comment("На каком этапе подписания создали задачу")
      .unsigned();
    table.text("problem").comment("Текст поручения по задаче");
    table.text("result").comment("Текст отчета по задаче");
    table
      .timestamp("due_at")
      .comment("До какого времени надо сделать поручение");
    table.timestamp("finished_at").comment("Когда поручение выполнено");
    table.timestamps(true, true);
    table.comment("Таблица со списком задач по документам");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("document_tasks");
};
