import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function Cart() {
  const { cartItems, removeItem, clearCart } = useContext(CartContext);
  console.log(cartItems);

  return (
    <div className="mx-4 lg:mx-60 mb-4 mt-5">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="flex flex-row flex-wrap gap-1 py-2 pl-2 rounded-sm bg-slate-400 mb-2">
            <h2 className="flex-1 font-bold text-slate-800">Items Details</h2>
            <h2 className="flex-none w-28 font-bold text-slate-800">Quantity</h2>
            <h2 className="flex-none w-40 font-bold text-slate-800">Item Price</h2>
            <h2 className="flex-none w-16 font-bold text-slate-800">Action</h2>
          </div>


          {/*<div>
            {cartItems.map((item) => {
              // <div className=""></div>     // Product's picture, brand's name and name to contained here
              // <p className=""></p>         // Just the quantity
              // <div className=""></div>     // price and its breakdown are contained here
              // <div className=""></div>     // Action, such as remove item is contained here
            })}
           </div> */}



          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.productItem.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.productItem.name} - ${item.productItem.price}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item.productItem.id)}
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
