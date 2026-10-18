import axios from "axios";

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? "https://ngo-backend-com5.onrender.com" : "");
const baseURL = rawBaseUrl ? `${rawBaseUrl.replace(/\/+$/, "")}/api` : "/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
