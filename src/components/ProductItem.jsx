import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="mb-4 p-4 border-t-2">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="flex flex-row justify-around">
        <input type="radio" name="product.name" id="product.id" />
        <h3 className="text-base font-bold mb-4">product.name</h3>
        <p>$product.price</p>
        <p>product.quantity</p>
      </div>
    </div>
  );
}

export default ProductItem;
