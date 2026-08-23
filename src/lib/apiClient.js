import axios from "axios";

// Reads from .env — VITE_API_BASE_URL=http://localhost:5001
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
  withCredentials: true, // keep true globally — harmless for public routes, needed for admin cookies later
});

export default apiClient;