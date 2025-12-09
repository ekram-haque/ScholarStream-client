import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = (children) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={`/account/login`}> </Navigate>;
  }
  return children;
};

export default PrivateRoute;
