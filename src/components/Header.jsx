import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Header() {
  return (
    <nav className="mx-4 lg:mx-60">
      <Link  to="/">E-Commerce</Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/about">About Us</Link>
      </div>
    </nav>
  );
}

export default Header;
