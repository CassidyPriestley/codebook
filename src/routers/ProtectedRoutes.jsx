import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // If we have token navigate to CartPage
  // If we do NOT have token navigate to login page
  return token ? children : <Navigate to="/login" />;
};
