export function getWebSocketUrlByEnv() {
  let API_URL_TEMP = "";
  switch (process.env.REACT_APP_NODE_ENV.trim().toLowerCase()) {
    case "production":
      API_URL_TEMP = process.env.REACT_APP_WEBSOCKET_API_URL_PROD;
      break;
    case "testing":
      API_URL_TEMP = process.env.REACT_APP_WEBSOCKET_API_URL_TEST;
      break;
    case "development":
    default:
      API_URL_TEMP = process.env.REACT_APP_WEBSOCKET_API_URL_DEV;
      break;
  }
  return API_URL_TEMP;
}

export const WsUrl = getWebSocketUrlByEnv();

export const WsUrlAuthed = (url, queryParams = null) =>
  `${WsUrl}/${url}?accessToken=${localStorage.getItem("token")}${
    queryParams ? `&${queryParams}` : ""
  }`;
