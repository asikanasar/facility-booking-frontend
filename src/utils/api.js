// API Configuration
const API_BASE_URL = "https://facility-booking-backend.onrender.com/api";

// Add your API key here if needed
const API_KEY = process.env.REACT_APP_API_KEY || "";

// Helper function to make API calls with proper headers
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...options.headers
  };

  // Add API key if available
  if (API_KEY) {
    headers["Authorization"] = `Bearer ${API_KEY}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default API_BASE_URL;
