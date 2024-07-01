import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import { CartContext } from "../contexts/CartContext";

function ProductItem({ product }) {
  const [productQty, setProductQty] = useState(0);
  const { addItem } = useContext(CartContext);

  const handleAddToCart = (product, quantity) => {
    addItem(product, quantity);
  };

  const handleDelete = (productId) => {
    // TODO: Delete the given product and return to product listing page
  };

  const handleModify = (productId) => {
    // TODO: Update product and return to prduct listing page
  };

  const handleProductQty = (event) => {
    const regex = /^[1-9]\d*$/; // Matches only positive digits
    const newValue = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    if (regex.test(newValue)) {
      setProductQty(newValue);
    } else {
      setProductQty(0);
    }
  };

  return (
    <div className="max-w-40">
      {/* product's summarized details */}
      <Link to={"/product-detail/" + product.id}>
        <img
          src={product.image}
          className="max-w-20 max-h-20 rounded-sm"
          alt={product.name}
        />
        <h3 className="text-base font-bold mt-4 mb-2">{product.name}</h3>
        <p className="text-sm">
          <b>Unit Price</b>: ${product.price}
        </p>
        <p className="text-sm">
          <b>Available Units</b>: {product.quantity}
        </p>
      </Link>
    </div>
  );
}

export default ProductItem;
