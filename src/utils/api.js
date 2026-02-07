// src/api.js

// Base URL (DO NOT include /api in Vercel env variable)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * Common API helper
 * Usage:
 *   apiCall("/bookings")
 *   apiCall("/bookings/1/approve", { method: "PUT", headers: { Authorization: "Bearer <token>" } })
 */
export const apiCall = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`; // Always append /api here
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    // Handle unauthorized or other errors
    if (!response.ok) {
      const message = await response.text();
      // Throw descriptive error
      throw new Error(`HTTP ${response.status}: ${message || response.statusText}`);
    }

    // 204 No Content
    if (response.status === 204) return null;

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      // Always return array for endpoints that might be empty
      if (Array.isArray(data)) return data;
      return data;
    }

    return null;
  } catch (error) {
    console.error("API call failed:", error);
    // Return safe defaults to prevent frontend crash
    return endpoint.includes("/bookings") ? [] : null;
  }
};

export default API_BASE_URL;
