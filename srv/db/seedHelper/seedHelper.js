/**
 * @typedef {Object} seedProps
 * @property {string} table - название таблицы
 * @property {Array} arr - данные для вставки
 * @property {number} [index=null] - на какую позицию передвинуть индекс
 * @property {boolean} [isIgnoreConflict=false] - игнорировать ли конфликты
 * @property {boolean} [isAddCheck=false] - Добавить ли проверку что таблица пуста? Если не пуста - не сидировать
 */

/**
 * Функция для сидирования данных
 * @param {*} knex - подключение
 * @param {seedProps} props - настройки
 */
async function seedTable(knex, props) {
  const {
    table,
    arr,
    index,
    isIgnoreConflict = false,
    isAddCheck = false,
  } = props;

  if (arr.length === 0) return;

  if (isAddCheck) {
    await knex(table)
      .select("id")
      .limit(1)
      .then(async (rows) => {
        if (rows.length > 0) {
          console.log(`Таблица ${table} не пустая, сидирование пропущено`);
          return;
        } else {
          await knex.raw(
            `ALTER SEQUENCE public."${table}_id_seq" START ${index};`
          );
          await knex(table).insert(arr);
        }
      });
  } else {
    await knex.raw(`ALTER SEQUENCE public."${table}_id_seq" START ${index};`);
    if (isIgnoreConflict) {
      await knex(table).insert(arr).onConflict("id").ignore();
    } else {
      await knex(table).insert(arr);
    }
  }
}

module.exports = { seedTable };
