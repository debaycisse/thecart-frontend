import React, { useContext, Component, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { updateAccessToken, updateCurrentUser } = useContext(CartContext);
  const [state, setState] = useState({ username_email: "", password: "" });
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setState({ ...state, username_email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setState({ ...state, password: event.target.value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const data = await response.json();

      if (response.ok) {
        updateAccessToken(data.access);
        updateCurrentUser(data);
        navigate("/");
      } else if (response.non_field_errors) {
        alert("Wrong username or Password");
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
        <p className="mt-4 text-white text-center">A new user? <Link to={"/register"}>click here to register</Link></p>
      </dir>
    </div>
  );
};

export default Login;
