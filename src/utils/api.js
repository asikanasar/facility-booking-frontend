// src/api.js

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

/**
 * Generic API caller
 * endpoint example: "/bookings", "/bookings/user/Asika"
 */
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      body: options.body || undefined,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`HTTP ${response.status}: ${message}`);
    }

    // ✅ Handle NO CONTENT responses (e.g. DELETE)
    if (response.status === 204) return null;

    // ✅ Handle JSON or plain-text responses safely
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text(); // e.g. "Booking deleted successfully"
    }
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_BASE_URL;
