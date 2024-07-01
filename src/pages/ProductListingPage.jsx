import React, { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import { CartContext } from "../contexts/CartContext";
import LoginPage from "./LoginPage";

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const { accessToken, userHasLoggedOn } = useContext(CartContext);

  if (!userHasLoggedOn()) {
    return <LoginPage />;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/products/items/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let data;
      if (response.ok) {
        data = await response.json();
      }
      if (data.results.length > 0) {
        setProducts(data.results);
      }
    };
    fetchProducts();
  }, [accessToken]);


  return <ProductList products={products} />;
}

export default ProductListingPage;
