import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

const IndexRedirect = () => {
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default IndexRedirect;
