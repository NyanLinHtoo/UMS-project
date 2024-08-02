import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const authApiClient = axios.create({
  baseURL: "http://localhost:5000/auth",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
