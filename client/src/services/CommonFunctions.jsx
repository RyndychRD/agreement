import _ from "lodash";
import { Alert, Col } from "antd";

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
export function replaceUrlQueryWithId(id, queryIdNameForOpen = "id") {
  if (id) {
    window.history.replaceState(null, null, `?${queryIdNameForOpen}=${id}`);
  }
}

export function userNameMask(user) {
  if (!user) return null;
  return `${user?.last_name} ${user?.first_name.slice(0, 1)}. ${
    user?.middle_name ? `${user?.middle_name.slice(0, 1)}.` : ""
  }`;
}

export function getUserNameAndPositionOptionsForSelect(
  usersTemp,
  isUserPositionRequired = false,
  isAddDefaultValue = true
) {
  const result =
    isUserPositionRequired || !isAddDefaultValue
      ? []
      : [{ id: -1, name: "По умолчанию" }];
  if (Object.keys(usersTemp).length === 0) return result;
  return result.concat(
    usersTemp?.map((user) => ({
      id: user.id,
      // prettier-ignore
      name: `${userNameMask(user)} ${isUserPositionRequired ? `, ${user?.position_name}` : ""}`,
    }))
  );
}

export function getApiUrlByEnv() {
  let API_URL_TEMP = "";
  switch (process.env.REACT_APP_NODE_ENV.trim().toLowerCase()) {
    case "production":
      API_URL_TEMP = process.env.REACT_APP_SERVER_API_URL_PROD;
      break;
    case "testing":
      API_URL_TEMP = process.env.REACT_APP_SERVER_API_URL_TEST;
      break;
    case "development":
    default:
      API_URL_TEMP = process.env.REACT_APP_SERVER_API_URL_DEV;
      break;
  }
  return API_URL_TEMP;
}

export function getHeaderAlertByEnv() {
  let text = "";
  switch (process.env.REACT_APP_NODE_ENV.trim().toLowerCase()) {
    case "production":
      break;
    case "testing":
      text = (
        <Col>
          <Alert type="warning" description="ЭТО ОКРУЖЕНИЕ ТЕСТА" />
        </Col>
      );
      break;
    case "development":
    default:
      text = (
        <Col>
          <Alert type="warning" description="ЭТО ОКРУЖЕНИЕ РАЗРАБОТКИ" />
        </Col>
      );
      break;
  }
  return text;
}
