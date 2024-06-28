import React, { useState } from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';


const handleDelete = (event) => {

}

function ProductList({products}) {
  return (
    <div className="mx-4 lg:mx-60 mb-4 rounded-lg bg-slate-400">
      <div className='flex flex-row justify-between' id="product-heading">
        <div className="font-bold text-lg p-4">Products</div>
        <div className='p-4' id='controls'>
          <Link className='p-2 min-h-2 hover:bg-slate-600' to='/add-new-product'>New Product +</Link>
        </div>
      </div>
      <div className="row mt-4">
        {/* {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))} */}
        {/* Below are just a place-holder */}
        <ProductItem product={{product: "product"}} />
        <ProductItem product={{product: "product"}} />
        <ProductItem product={{product: "product"}} />
      </div>
    </div>
  );
}

export default ProductList;
