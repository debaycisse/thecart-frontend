import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ product }) {
  return (
    <div className="mb-4 p-4 border-t-2">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="flex flex-row justify-around">
        <h3 className="text-base font-bold mb-4">product.name</h3>
        <p>$product.price</p>
        <p>product.quantity</p>
        <Link>Delete</Link>
        <Link>Modify</Link>
      </div>
    </div>
  );
}

export default ProductItem;
