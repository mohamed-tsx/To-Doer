import { useUser } from "@/Hooks/useUser";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ API base URL from env
  withCredentials: true, // ✅ Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Response Interceptor (Handles Errors & Auto Redirect for 401)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request. Redirecting to login...");
      const { logout } = useUser();
      logout(); // ✅ Clear user state and redirect
    }
    return Promise.reject(error);
  }
);

export default api;
