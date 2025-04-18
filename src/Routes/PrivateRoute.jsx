import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext/UserContext";

export const PrivateRoute = ({ children }) => {
  const { userAuth } = useContext(UserContext);
  const isAuth = userAuth?.token;
  const location = useLocation();
  const from = {
    pathname: location.pathname,
  };

  if (isAuth) return children;
  return <Navigate to={"/"} state={from} replace />;
};
