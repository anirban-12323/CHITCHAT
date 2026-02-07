import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, screenLoading } = useSelector((state) => {
    return state.userReducer;
  });
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(isAuthenticated, screenLoading);
    // if (!isAuthenticated) {
    //   navigate("/login");
    // }
    if (!isAuthenticated && !screenLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, screenLoading]);

  return children;
}

export default ProtectedRoute;
