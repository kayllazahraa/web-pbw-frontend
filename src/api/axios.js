// src/api/axios.js

import axios from "axios";

// Buat instance axios yang terpusat
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // URL API dari .env
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Interceptor: Menambahkan Authorization token dari localStorage sebelum request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
