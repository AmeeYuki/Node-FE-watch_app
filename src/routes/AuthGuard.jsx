import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectAuth, selectToken } from "../slices/auth.slice";

const AuthGuard = ({ allowedRoles }) => {
  const token = useSelector(selectToken);
  const auth = useSelector(selectAuth);
  const location = useLocation();

  if (allowedRoles && !allowedRoles.some((role) => auth.roles.includes(role))) {
    return <Navigate to="/unauthorised" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
