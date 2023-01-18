import getUniqNotNullIds, { getUniqNotNullCustom } from "./CommonFunctions";

export function getUserRights() {
  return localStorage.getItem("rights");
}
export function getUserRightIds() {
  return localStorage.getItem("rightIds");
}

// Админу везде и всегда все открыто
export function isAccessGranted(rightToCheck = "") {
  return (
    getUserRights()?.indexOf(rightToCheck) !== -1 ||
    getUserRights()?.indexOf("Admin") !== -1
  );
}

export function isAnyAccessGranted(rightsToCheck = []) {
  let result = getUserRights()?.indexOf("Admin") !== -1;
  rightsToCheck.forEach((right) => {
    result = result || getUserRights()?.indexOf(right) !== -1;
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
