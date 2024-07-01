import React, { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import { CartContext } from "../contexts/CartContext";

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const { accessToken } = useContext(CartContext);

  useEffect(() => {
    // Fetch products from API
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
