//export const API_ENDPOINT = window && window.location && window.location.hostname + "/api";
//export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || "localhost:3000";
export const API_ENDPOINT =
  window &&
  window.location &&
  window.location.hostname +
    (window.location.port ? ":" + window.location.port : "") +
    "/api"; // set to current window url + port