// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const PublicRoute = () => {
  if (
    isAuthenticated() &&
    location.pathname !== `/${location.pathname.split("/")[1]}`
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
export default PublicRoute;
