import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList";
import SearchProducts from "../components/SearchProduct";

/**
 * Fetches all products and lists them out
 */
function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [searchString, setSearchString] = useState("");

  /**
   * Searches the list of product and obtains the
   * matched product based on a given search string.
   */
  const searchProducts = () => {
    const makeSearch = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/products/items/?q=${searchString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

  /**
   * Handles the searching by collecting
   * the returned list of matched product(s).
   */
  const handleSearch = (event) => {
    event.preventDefault();
    searchProducts();
    return <ProductList products={products} />;
  };

  /**
   * Collects and stores the search string, which is
   * later used for searching up a list of product.
   */
  const handleSearchInputValue = (event) => {
    setSearchString(event.target.value);
  };

  /**
   * Fetches all existing product, places them in a list and
   * returns the list, which is later stored in a state
   * variable, named products.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/products/items/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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

  /**
   * Ensures that product list is collected from the backend
   * if a user was redirected to this component, having
   * been logged out due to access token expiration.
   */
  if (products.length < 1) {
    searchProducts();
  }

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
