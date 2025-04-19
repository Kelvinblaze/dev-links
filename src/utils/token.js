export const getToken = () => {
  return localStorage.getItem("dv-token"); // Retrieve token from localStorage
};

export const setToken = (token) => {
  localStorage.setItem("dv-token", token); // Save token to localStorage
};

export const removeToken = () => {
  localStorage.removeItem("dv-token"); // Remove token from localStorage
};
