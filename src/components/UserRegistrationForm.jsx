import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Handles user registration input elements
 */
const UserRegistrationForm = () => {
  const navigate = useNavigate(); // navigation for page redirection purpose
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "regular",
    phone: "",
    password1: "",
    password2: "",
  });

  // List of event handlers to handle each input and other form controls
  const handleFirstNameChange = (event) => {
    setData({ ...data, first_name: event.target.value });
  };

  const handleLastNameChange = (event) => {
    setData({ ...data, last_name: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setData({ ...data, username: event.target.value });
  };

  const handleEmailChange = (event) => {
    setData({ ...data, email: event.target.value });
  };

  const handlePhoneChange = (event) => {
    setData({ ...data, phone: event.target.value });
  };

  const handleRoleChange = (event) => {
    setData({ ...data, role: "regular" });
  };

  const handlePassword1Change = (event) => {
    setData({ ...data, password1: event.target.value });
  };

  const handlePassword2Change = (event) => {
    setData({ ...data, password2: event.target.value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Handles submission of user registration form
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        alert("Please fill up all the fields correctly");
      }
    } catch {
      console.error("Error during registration");
      navigate("/register");
    }
  };

  return (
    <div className="mt-8 mx-60">
      <div className="p-20 register-container mx-auto bg-slate-600">
        <form
          method="POST"
          onSubmit={handleFormSubmission}
          className="bg-slate-500 rounded-lg drop-shadow-lg p-20"
        >
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            onChange={handleFirstNameChange}
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            onChange={handleLastNameChange}
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            onChange={handleUsernameChange}
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            name="email"
            id="email"
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            onChange={handleEmailChange}
          />

          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            onChange={handlePhoneChange}
          />

          <label htmlFor="role">Role</label>
          <select
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            name="role"
            id="role"
            disabled
            onChange={handleRoleChange}
          >
            <option value="--">---</option>
            <option defaultValue={"regular"} value="regular">
              Regular
            </option>
          </select>

          <label htmlFor="password">Paswword</label>
          <input
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            type="password"
            name="password"
            id="password"
            onChange={handlePassword1Change}
          />

          <label htmlFor="password2">Confirm Paswword</label>
          <input
            className="border-2 border-slate-400 block mb-4 p-2 rounded-sm input-width"
            type="password"
            name="password2"
            id="password2"
            onChange={handlePassword2Change}
          />

          <input
            className="input-width mt-4 text-white rounded-sm py-3 px-3 hover:cursor-pointer bg-slate-800 hover:bg-slate-100 hover:text-black"
            type="submit"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
