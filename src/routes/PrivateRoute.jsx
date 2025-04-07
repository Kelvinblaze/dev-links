// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
