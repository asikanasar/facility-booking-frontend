// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

// Helper function
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...options.headers
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
  }

  if (response.headers.get("content-type")?.includes("application/json")) {
    return response.json();
  }

  return response;
};

export default API_BASE_URL;
