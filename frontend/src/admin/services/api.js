import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const baseURL = rawBaseUrl ? `${rawBaseUrl.replace(/\/+$/, "")}/api` : "/api";

const adminApi = axios.create({
  baseURL,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
