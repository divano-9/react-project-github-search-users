import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  // if user is false, redirect to login page
  if (!isUser) {
    return <Navigate to="/login" />;
  }
  // if user is true, render children of PrivateRoute (in this case <Dashboard /> page)
  return children;
};
export default PrivateRoute;
