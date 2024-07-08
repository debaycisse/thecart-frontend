import React, { useContext, useState } from "react";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

/**
 * This components collects and lists out product items,
 * having received a list of product from the
 * ProductListingPage component
 */
function ProductList({ products }) {
  const { userHasLoggedOn } = useContext(CartContext);
  const navigate = useNavigate();

  // Ensures user logins to access the content of this component
  if (!userHasLoggedOn()) {
    return navigate("/login/products");
  }

  // If a user has logged, then display the below returned content
  return (
    <div className="mx-4 lg:mx-60 mb-4 rounded-lg bg-slate-400">
      <div className="mb-4 p-6">
        <div className="flex flex-row gap-10 flex-wrap">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
