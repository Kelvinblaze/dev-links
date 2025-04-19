import axios from "axios";
import { getToken, removeToken } from "../utils/token";
import { persistor } from "../store";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get token from localStorage
    if (token) {
      // Decode the token to check expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired
        removeToken();
        persistor.purge();
        throw new Error("Token has expired. Please log in again.");
      }

      // Add token to headers if valid
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
