import { getToken } from "./auth";

const API_BASE_URL = "http://localhost:3000/api/";
export const apiRequest = async (endpoint, method = "GET", body = null) => {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        return { success: false, error: "Network Error" };
    }
};