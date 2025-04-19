import { getToken } from "../utils/token";
export const isAuthenticated = () => {
  return getToken() !== null; // Check if token exists
};
