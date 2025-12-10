import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = (children) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate state={location.pathname} to={`/account/login`}> </Navigate>;
  }
  return children;
};

export default PrivateRoute;
