import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://facility-booking-backend-b4fweaehged4fxda.southeastasia-01.azurewebsites.net";

const normalizedBase = API_BASE_URL.replace(/\/$/, "");
const baseURL = normalizedBase.endsWith("/api")
  ? normalizedBase
  : `${normalizedBase}/api`;

const api = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function toStr(value) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function extractServerMessage(data) {
  if (data == null) return "";
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    return (
      data.message ||
      data.error ||
      data.title ||
      data.detail ||
      toStr(data)
    );
  }
  return String(data);
}

export function getApiErrorMessage(error) {
  const isAxios = !!error?.isAxiosError;
  const response = error?.response;
  const request = error?.request;

  if (response) {
    const status = response.status;
    const statusText = response.statusText || "";
    const serverMsg = extractServerMessage(response.data);
    const prefix = `API ${status}${statusText ? ` ${statusText}` : ""}`;
    return serverMsg ? `${prefix}: ${serverMsg}` : prefix;
  }

  // Request was made but no response (CORS, DNS, offline, TLS, etc.)
  if (isAxios && request) {
    return "Network error: could not reach the API (possible CORS or server down).";
  }

  return error?.message || "Unknown error";
}

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Preserve original error but make message meaningful for UI.
    error.message = getApiErrorMessage(error);
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL, baseURL };
