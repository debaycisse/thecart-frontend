import React, { useContext, Component, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";

/* Component that handles the login's logic.
 * It uses a prop to know from which component, it is
 * called so that it can redirect user back to that component.
 */
const Login = ({ caller }) => {
  /* Context variables are updated here to share the logged
   * in user's information accross multiple components
   */
  const { updateAccessToken, updateCurrentUser, userHasLoggedOn } =
    useContext(CartContext);
  const [state, setState] = useState({ username_email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    {
      // redirects authenticated users to the products route.
      userHasLoggedOn() && navigate("/products");
    }
  }, []);

  const handleUserNameChange = (event) => {
    setState({ ...state, username_email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setState({ ...state, password: event.target.value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    // Calls the authentication API after user clicks log in
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        const data = await response.json();
        // on successful login, update the access toekn and user info. context
        updateAccessToken(data.access);
        updateCurrentUser(data);
        if (caller === "/login") {
          // redirects to the product route if an unprotected component calls the login route
          navigate("/products");
        } else {
          navigate(`${caller}`);
        }
      } else if (response.non_field_errors) {
        alert("Wrong username and/or Password");
        navigate.push("/login");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mx-4 lg:mx-60">
      <dir className="rounded-md mx-auto max-w-lg bg-slate-600 p-20">
        <form
          method="POST"
          onSubmit={handleFormSubmission}
          className="mx-auto p-20 bg-slate-500 rounded-lg drop-shadow-lg"
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 block mb-4"
            onChange={handleUserNameChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 block mb-6"
            onChange={handlePasswordChange}
          />

          <input
            className="rounded-md text-white my-4 py-2 px-3 hover:cursor-pointer bg-slate-900 drop-shadow-md hover:bg-slate-700"
            type="submit"
            value="Log in"
          />
        </form>
        <p className="mt-4 text-white text-center">
          A new user? <Link to={"/register"}>click here to register</Link>
        </p>
      </dir>
    </div>
  );
};

export default Login;
