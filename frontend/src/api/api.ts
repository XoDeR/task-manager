import useAuthStore from "@/stores/authStore";
import axios from "axios";

const api = axios.create({
  // Currently uses URL of local Laravel API
  baseURL: "http://localhost:8000/api/v1",
});

// Authorization header with saved sanctum token (if present)
// should be included to be able to access protected routes
// like routes for tasks CRUD
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tasks-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If we get a response "Not Authorized" (401)
// from the API server -- clear the saved token and redirect
// to /login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;