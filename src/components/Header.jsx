import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../contexts/CartContext";

function Header() {
  const { userHasLoggedOn, currentUser, updateCurrentUser } = useContext(CartContext);

  if (userHasLoggedOn()) {
    return (
      <div>
        <nav className="mx-4 lg:mx-60 flex flex-row justify-between pt-4 min-h-24 mb-5">
          <Link to="/">theCart-Logo</Link>
          <div className="flex flex-row gap-9">
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/"
            >
              Home
            </Link>
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/products"
            >
              Products
            </Link>
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/cart"
            >
              Cart
            </Link>
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/faq"
            >
              FAQ
            </Link>
            <Link
              className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
              to="/about"
            >
              About Us
            </Link>
          </div>
        </nav>
        <div className="mb-10 text-right mr-60">
          <p>
            Welcome, {currentUser.user.first_name} {currentUser.user.last_name}
          </p>
          <p>
            <Link onClick={() => updateCurrentUser(null)}>Logout</Link>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <nav className="mx-4 lg:mx-60 flex flex-row justify-between pt-4 min-h-24 mb-10">
        <Link to="/">theCart-Logo</Link>
        <div className="flex flex-row gap-9">
          <Link
            className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
            to="/"
          >
            Home
          </Link>

          <Link
            className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
            to="/faq"
          >
            FAQ
          </Link>
          <Link
            className="bg-slate-400 p-2 rounded-md hover:bg-slate-600 max-h-10"
            to="/about"
          >
            About Us
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
