import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

function ProductListingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      const response = await fetch('http://127.0.0.1:8000/api/v1/products');
      const data = await response.json();
      if (data.results.length > 0) {
        setProducts(data.results);
      }
    };
    fetchProducts();
  }, []);

  return <ProductList products={products} />;
}

export default ProductListingPage;
