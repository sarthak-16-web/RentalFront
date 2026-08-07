import axios from "axios";

// Reads from .env — VITE_API_URL=http://localhost:5000
console.log(import.meta.env.VITE_API_BASE_URL);
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  

  withCredentials: true, // keep true globally — harmless for public routes, needed for admin cookies later
});

export default apiClient;