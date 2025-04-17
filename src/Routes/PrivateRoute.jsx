import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = JSON.parse(localStorage.getItem("token"));
  const location = useLocation();
  const from = {
    pathname: location.pathname,
  };

  if (isAuth) return children;
  return <Navigate to={"/login"} state={from} replace />;
};
