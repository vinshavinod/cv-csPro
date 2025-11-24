import axios from "axios";

const API = axios.create({
  baseURL: "http://10.119.108.182:8000",
});

// Attach JWT token to requests EXCEPT login
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // Do NOT send Authorization header for login request
  if (token && config.url !== "/auth/login/") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
