import axios from "axios";
import { useAuthStore } from "@/features/auth/hooks/useAuthStore";

const auth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

auth.interceptors.request.use((config) => {
  const token = useAuthStore.getState().users.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});
auth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearUsers();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default auth;
