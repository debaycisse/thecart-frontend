import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

function ProductListingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return <ProductList products={products} />;
}

export default ProductListingPage;
