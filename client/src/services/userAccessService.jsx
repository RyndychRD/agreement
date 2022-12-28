import getUniqNotNullIds from "./CommonFunctions";

export function isAccessGranted(rightToCheck) {
  return true;
}
export function saveUserRights({ user }) {
  console.log(user.rights);
  localStorage.setItem("rights", getUniqNotNullIds(user.rights));
}

export function getUserRights() {
  console.log(localStorage.getItem("rights"));
}
