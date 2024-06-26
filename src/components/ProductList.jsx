import React from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div className="mx-4 lg:mx-60 mb-4 rounded-lg bg-slate-400">
      <div className='flex flex-row justify-between' id="product-heading">
      <div className="font-bold text-lg p-4">Products</div>
      <div id='controls'>
        <Link className='py-4 pr-4 min-h-2'>Create</Link>
        <button className='py-4 pr-4'>Delete</button>
        <button className='py-4 pr-4'>Update</button>
      </div>
      </div>
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
