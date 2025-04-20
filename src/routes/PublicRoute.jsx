// src/routes/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const PublicRoute = () => {
  if (
    isAuthenticated() &&
    location.pathname !== `/preview/${location.pathname.split("/")[2]}`
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
export default PublicRoute;
