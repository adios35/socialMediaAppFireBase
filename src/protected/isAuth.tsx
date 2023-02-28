import React from "react";
import { useAuth } from "../context/registerContext";
import { Navigate } from "react-router-dom";

const IsAuth = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default IsAuth;
