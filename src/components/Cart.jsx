import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cartItems, removeItem, clearCart } = useContext(CartContext);

  return (
    <div className="mx-4 lg:mx-60 mb-4 mt-5">
      <h2 className="text-lg font-bold text-center">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.name} - ${item.price}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
