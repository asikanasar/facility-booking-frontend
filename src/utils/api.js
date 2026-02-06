// src/api.js

// Base URL (DO NOT add /api in Vercel env variable)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

/**
 * Common API helper
 * Usage:
 *   apiCall("/bookings")
 *   apiCall("/bookings/1/approve", { method: "PUT" })
 */
export const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`HTTP ${response.status}: ${message}`);
  }

  // Handle empty responses safely
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
};

export default API_BASE_URL;
