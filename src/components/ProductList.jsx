import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products }) {
  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
