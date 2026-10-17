import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
const baseURL = rawBaseUrl ? `${rawBaseUrl.replace(/\/+$/, "")}/api` : "/api";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

export default API;
