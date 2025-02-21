import axios from "axios";
import { getToken } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8080", // Cambia por tu API REST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
