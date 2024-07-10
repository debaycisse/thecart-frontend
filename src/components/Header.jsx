import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import { CartContext } from "../contexts/CartContext";

/**
 * Handles the main menu and all contained menu buttons
 */
function Header() {
  const { userHasLoggedOn, currentUser, updateCurrentUser } =
    useContext(CartContext);

  const handleLogOut = () => {
    updateCurrentUser(null);
  };

  /**
   * Handles contional rendering of contents, based on whether a user has logged in.
   * orderData ensures that a user logins to see some of the menu buttons
   */
  if (userHasLoggedOn()) {
    return (
      <div>
        <nav className="mx-4 lg:mx-10 flex flex-row justify-between pt-4 min-h-24 mb-5">
          <Link to="/">
            <img
              src="/images/thecart_home_page_icon.jpeg"
              alt="home page icon"
              className="w-1/6 rounded-lg"
            />
          </Link>

          <div className="flex flex-row gap-9">
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/"
            >
              Home
            </Link>
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/products"
            >
              Products
            </Link>
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/cart"
            >
              Cart
            </Link>
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/orders"
            >
              Orders
            </Link>
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/profile"
            >
              Profile
            </Link>
            <Link
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
              to="/about"
            >
              About
            </Link>
          </div>
        </nav>
        <div className="mb-10 text-right mr-60">
          <p>
            Welcome,{" "}
            <b>
              {currentUser.user.first_name} {currentUser.user.last_name}
            </b>
          </p>
          <p>
            <Link onClick={() => handleLogOut()}>Logout</Link>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <nav className="mx-4 lg:mx-10 flex flex-row justify-between pt-4 min-h-24 mb-10">
        <Link to="/">
          <img
            src="/images/thecart_home_page_icon.jpeg"
            alt="home page icon"
            className="w-1/6 rounded-lg"
          />
        </Link>
        <div className="flex flex-row gap-9 w-1/3">
          <Link
            className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
            to="/"
          >
            Home
          </Link>

          <Link
            className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
            to="/products"
          >
            Products
          </Link>

          <Link
            className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
            to="/login/login"
          >
            Login
          </Link>
          <Link
            className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 max-h-10"
            to="/about"
          >
            About
          </Link>
        </div>
      </nav>
    );
  }
}

export default Header;
