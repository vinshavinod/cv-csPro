import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token"); // <- use the correct key
  return token ? children : <Navigate to="/hrlogin" replace />;
};

export default ProtectedRoute;
