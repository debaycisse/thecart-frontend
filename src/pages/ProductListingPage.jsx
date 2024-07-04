import React, { useState, useEffect, useContext } from "react";
import ProductList from "../components/ProductList";
import { CartContext } from "../contexts/CartContext";
import LoginPage from "./LoginPage";
import SearchProducts from "../components/SearchProduct";

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const { accessToken, userHasLoggedOn } = useContext(CartContext);
  const [searchString, setSearchString] = useState("");

  if (!userHasLoggedOn()) {
    return <LoginPage />;
  }

  const searchProducts = () => {
    const makeSearch = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/products/items/?q=${searchString}`,
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
        if (data && data.results) {
          setProducts(data.results);
        }
      } catch (error) {
        console.error("Encountered error while searching products' list");
      }
    };
    makeSearch();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    searchProducts();
    return <ProductList products={products} />;
  };

  const handleSearchInputValue = (event) => {
    setSearchString(event.target.value);
  };

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
  }, []);

  return (
    <>
      <SearchProducts
        handleSearch={handleSearch}
        onSearchStringChange={handleSearchInputValue}
      />
      <ProductList products={products} />
    </>
  );
}

export default ProductListingPage;
