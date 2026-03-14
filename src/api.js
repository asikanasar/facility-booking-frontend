import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://facility-booking-backend-b4fweaehged4fxda.southeastasia-01.azurewebsites.net";

const baseURL = `${API_BASE_URL.replace(/\/$/, "")}/api`;

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
export { API_BASE_URL };
