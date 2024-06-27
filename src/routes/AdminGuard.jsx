import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../slices/auth.slice";

const AdminGuard = () => {
  const auth = useSelector(selectAuth);

  // Check if user is authenticated and is admin
  if (auth && auth.isAdmin) {
    return <Outlet />;
  }

  // If not admin, redirect to homepage or another appropriate page
  return <Navigate to="/" replace />;
};

export default AdminGuard;
