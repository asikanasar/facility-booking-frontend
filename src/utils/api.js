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
      // If you are still using credentials: "include" in your backend, 
      // add it back here. If not, leave it out.
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(options.headers || {}),
      },
      // FIX: Ensure body is stringified so the backend can read it
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`HTTP ${response.status}: ${message}`);
    }

    // Handle No Content (Delete/Update success)
    if (response.status === 204) return null;

    // FIX: Check if response is JSON or Text to avoid the "Unexpected token B" error
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // This catches "Booking deleted successfully" text
      return await response.text(); 
    }

  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_BASE_URL;
