import React from "react";
import { Link } from "react-router-dom";

/**
 * Renders the content for the homepage component
 */
function Home() {
  return (
    <div className="mx-4 lg:mx-60 mb-4 min-h-40 ">
      <div className="flex flex-row">
        <div id="text" className="w-full py-4">
          <h1 className="text-3xl pb-8">
            Welcome to theCart Order Management System
          </h1>
          <p className="rounded-lg min-h-8 p-4 bg-slate-600 mr-28 text-white">
            We extend your services to the reach of all your cutomers
            irrespective of their locations.
          </p>
          <p className="my-4">Streamline your shopping experience with us!</p>
          <div className="my-8 ">
            <p className="font-bold">Would you like to try this product?</p>
            <Link to="/login/login">Click Here to register, then login...</Link>
          </div>
        </div>
        <div id="image" className="w-full">
          <img
            className="rounded-lg"
            src="/images/home_page_content.jpg"
            alt="stack of shopping carts"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
