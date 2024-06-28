import React from 'react';
import { Link } from 'react-router-dom';

const handleAddToCart = (productId) => {
  // TODO: Add product to cart
}

const handleDelete = (productId) => {
  // TODO: Delete the given product and return to product listing page
}

const handleModify = (productId) => {
  // TODO: Update product and return to prduct listing page
}

function ProductItem({ product }) {
  return (
    <div className="mb-4 p-4 border-t-2">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="flex flex-row justify-around">
        <h3 className="text-base font-bold mb-4">product.name</h3>
        <p>$product.price</p>
        <p>product.quantity</p>
        <Link 
        className='bg-slate-500 p-2 rounded-sm  text-sm hover:bg-slate-600 hover:text-white'
        onClick={() => handleAddToCart(product.id)}>
          Add to cart
        </Link>
        <Link
        className='bg-slate-500 p-2 rounded-sm  text-sm hover:bg-slate-600 hover:text-white'
        onClick={() => handleDelete(product.id)}>
          Delete
        </Link>
        <Link 
        className='bg-slate-500 p-2 rounded-sm  text-sm hover:bg-slate-600 hover:text-white'
        onClick={() => handleModify(product.id)}>
          Modify
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
