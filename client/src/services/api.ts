import axios from "axios";

const normalizeApiBaseUrl = (value: string): string => {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/api")) {
    return trimmed;
  }

  if (/^(https?:)?\/\//i.test(trimmed) || trimmed.startsWith("/")) {
    return `${trimmed}/api`;
  }

  return "/api";
};

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL
    ? normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL)
    : undefined) ||
  (import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "/api");

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

export default API;
