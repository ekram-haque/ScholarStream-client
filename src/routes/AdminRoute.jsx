
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";


const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Checking role...</p>;

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
