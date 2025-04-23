import axios from "axios";
import { getToken, removeToken } from "../utils/token";
import { persistor } from "../store";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

const Logout = () => {
  removeToken();
  persistor.purge();
  window.location.href = "/login"; // Redirect to login page
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get token from localStorage
    if (token) {
      // Decode the token to check expiration
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired
        Logout();
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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error responses
      switch (error.response.status) {
        case 401:
          // Unauthorized, handle token expiration or invalid token
          Logout();
          break;
        case 403:
          Logout();
          break;
        case 404:
          // Not Found, handle resource not found
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
