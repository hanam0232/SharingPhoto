import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const checkTokenExpiration = (tokenString) => {
    try {
      const decoded = jwtDecode(tokenString);
      const nowInSeconds = Math.floor(new Date().getTime() / 1000);
      return decoded.exp > nowInSeconds;
    } catch {
      return false;
    }
  };

  // thực hiện kiểm tra
  const isValid = checkTokenExpiration(token);
  if (!isValid) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
