import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuth) return <Navigate to="/login" replace />;

  return children ?? <Outlet />;
};

export default Protected;