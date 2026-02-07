// src/api.js

// Base URL from environment variable (CRA style)
// Make sure you have REACT_APP_API_URL in your .env file
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

/**
 * Common API helper
 * Usage:
 *   apiCall("/bookings")
 *   apiCall("/bookings/1/approve", { method: "PUT", headers: { Authorization: "Bearer <token>" } })
 */
export const apiCall = async (endpoint, options = {}) => {
  // Ensure endpoint starts with a slash
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    // Handle HTTP errors
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`HTTP ${response.status}: ${message}`);
    }

    // 204 No Content
    if (response.status === 204) return null;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("API call failed:", error);
    // Return safe defaults
    return endpoint.includes("/bookings") ? [] : null;
  }
};

export default API_BASE_URL;
