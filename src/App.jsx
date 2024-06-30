import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import UserProfilePage from './pages/UserProfilePage';
import FAQPage from './pages/FAQPage';
import AboutUsPage from './pages/AboutUsPage';
import AddNewProductPage from './pages/AddNewProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import './styles/App.css';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes path="/">
          <Route path="/" exact element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<UserRegistrationPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/add-new-product" element={<AddNewProductPage />} />
          <Route path="/product-detail/:productId"  element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
