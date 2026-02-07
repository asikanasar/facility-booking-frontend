const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api${
    endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  }`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`HTTP ${response.status}: ${message}`);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export default API_BASE_URL;
