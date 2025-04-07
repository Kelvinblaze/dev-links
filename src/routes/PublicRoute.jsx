// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
