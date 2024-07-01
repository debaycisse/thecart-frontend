import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div className="mx-4 lg:mx-60 mb-4 rounded-lg bg-slate-400 p-10">
      <div className="mb-4 p-4">
        <div className="flex flex-row gap-10">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
        {/* Below are just a place-holder to visualize how the items are placed and displayed */}
        {/* <ProductItem product={{ product: "product" }} />
        <ProductItem product={{ product: "product" }} />
        <ProductItem product={{ product: "product" }} /> */}
      </div>
    </div>
  );
}

export default ProductList;
