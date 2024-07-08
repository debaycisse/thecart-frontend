import React from "react";
import Login from "../components/Login";
import { useLocation } from "react-router-dom";

// Handles the login page and returns login component's content
function LoginPage() {
  /**
   * location hook to fetch from which component the
   * route to this component is called.
   */
  const location = useLocation();

  // this fetches a complete route's path
  const fullPath = location.pathname;

  // the path is processed and extracted
  const fullPathList = fullPath.split("/");
  let caller;

  if (fullPathList.length > 3) {
    caller = `/${fullPathList[2]}/${fullPathList[3]}`;
  } else {
    caller = `/${fullPathList[2]}`;
  }

  return <Login caller={caller} />;
}

export default LoginPage;
