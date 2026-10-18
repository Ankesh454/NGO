import axios from "axios";

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/+$/, "");
const baseURL = rawBaseUrl
  ? rawBaseUrl.endsWith("/api")
    ? rawBaseUrl
    : `${rawBaseUrl}/api`
  : "/api";

const API = axios.create({
  baseURL,
});

export default API;
