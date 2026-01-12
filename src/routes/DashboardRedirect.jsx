import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const DashboardRedirect = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (role === "admin") {
    return <Navigate to="/dashboard/statistics" replace />;
  }

  if (role === "moderator") {
    return <Navigate to="/dashboard/manage-applications" replace />;
  }

  // default → student
  return <Navigate to="/dashboard/my-applications" replace />;
};

export default DashboardRedirect;
