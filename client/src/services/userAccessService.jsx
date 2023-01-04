import getUniqNotNullIds, { getUniqNotNullCustom } from "./CommonFunctions";

export function getUserRights() {
  return localStorage.getItem("rights");
}
export function getUserRightIds() {
  return localStorage.getItem("rightIds");
}

export function isAccessGranted(rightToCheck) {
  return getUserRights().indexOf(rightToCheck) !== -1;
}

// TODO: Возможно, имеет смысл переделать на JSON объект
export function saveUserRights({ user }) {
  localStorage.setItem(
    "rights",
    getUniqNotNullCustom(user.rights, "code_name")
  );
  localStorage.setItem("rightIds", getUniqNotNullIds(user.rights));
}
