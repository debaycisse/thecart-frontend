import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import HomePage from "../pages/HomePage";
import { useNavigate } from "react-router-dom";

/**
 * Handles user's profile information by collecting user
 * data from the context vaiable, named currentUser
 */
function UserProfile() {
  const { currentUser, userHasLoggedOn } = useContext(CartContext);
  const navigate = useNavigate();

  /**
   * This ensures that user is authenticated
   * before viewing this component's contents.
   */
  useEffect(() => {
    if (!userHasLoggedOn()) {
      return navigate("/login/profile");
    }
  }, [currentUser]);  // this useEffect runs when the value of currentUser changes

  /**
   * The content of this component is rendered conditionally
   * based on the value of the currentUser context's variable.
   */
  return (
    <>
      {currentUser ? (
        <>
          <div className="mx-4 lg:mx-60 mt-5 rounded-lg shadow-md bg-slate-400 p-4">
            <h2 className="font-bold text-base">User Profile</h2>
            <div className="max-w-lg mx-auto bg-slate-300 p-4 rounded-md shadow-md my-7">
              <img
                src="{currentUser.user.profile.picture}"
                alt="User's profile picture"
                className="w-40 max-h-40 mb-6"
              />

              <div className="py-4 user-info">
                <p>
                  <b>Full Name</b>: {currentUser.user.full_name}
                </p>
                <p>
                  <b>Emaill</b>: {currentUser.user.email}
                </p>
                <p>
                  <b>Mobile Phone</b>: {currentUser.user.phone}
                </p>
                <p>
                  <b>Username</b>: {currentUser.user.username}
                </p>
                <p>
                  <b>Role</b>: {currentUser.user.role}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
}

export default UserProfile;
