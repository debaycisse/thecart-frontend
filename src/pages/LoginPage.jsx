import React from "react";
import Login from "../components/Login";
import { useLocation } from "react-router-dom";

/**
 * Handles the login page and returns login component's content.
 *
 * It is location aware in the sense that it knows from which
 * component it is called and returns to that component after
 * a user has successfully logged on.
 */
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

  if (fullPath.includes("product-detail")) {
    const productDetailRouteElements = fullPathList[2].split(".");
    caller = `/${productDetailRouteElements[0]}/${productDetailRouteElements[1]}`;
  } else {
    if (fullPathList.length > 3) {
      caller = `/${fullPathList[2]}/${fullPathList[3]}`;
    } else {
      caller = `/${fullPathList[2]}`;
    }
  }

  return <Login caller={caller} />;
}

export default LoginPage;
