import getUniqNotNullIds, { getUniqNotNullCustom } from "./CommonFunctions";

export function getUserRights() {
  return localStorage.getItem("rights");
}
export function getUserRightIds() {
  return localStorage.getItem("rightIds");
}

/**
 * Есть ли у пользователя право
 * @param {*} rightToCheck 
 * @returns 
 */
export function isAccessGranted(rightToCheck = "") {
  return (
    getUserRights()?.indexOf(rightToCheck) !== -1 ||
    getUserRights()?.indexOf("Admin") !== -1
  );
}

/**
 * Доступно ли пользователю хотя бы одно из прав
 * @param {*} rightsToCheck 
 * @returns 
 */
export function isAnyAccessGranted(rightsToCheck = []) {
  const userRights = getUserRights();
  let result = userRights?.indexOf("Admin") !== -1;
  rightsToCheck.forEach((right) => {
    result = result || userRights?.indexOf(right) !== -1;
  });
  return result;
}

// TODO: Возможно, имеет смысл переделать на JSON объект
export function saveUserRights({ user }) {
  localStorage.setItem(
    "rights",
    getUniqNotNullCustom(user.rights, "code_name")
  );
  localStorage.setItem("rightIds", getUniqNotNullIds(user.rights));
}
