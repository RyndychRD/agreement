import _ from "lodash";

export default function getUniqNotNullIds(array) {
  return _.uniq(_.reject(array, ["id", null])?.map((el) => el.id));
}
export function getUniqNotNullCustom(array, item) {
  return _.uniq(_.reject(array, [item, null])?.map((el) => el[item]));
}

/**
 * Очищает url от query параметров
 */
export function clearUrlQueryParams() {
  return window.history.replaceState(null, null, `?`);
}
/**
 * Добавляем в url id выбранного элемента, заменяя все предыдущее
 * @param {*} id
 */
export function replaceUrlQueryWithId(id) {
  return window.history.replaceState(null, null, `?id=${id}`);
}
