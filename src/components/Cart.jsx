import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeItem, clearCart, updateOrderData, currentUser } =
    useContext(CartContext);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    if (Object.keys(cartItems).length < 1) {
      alert("Your Cart is empty. Add item(s) to your Cart firstly.");
      return null;
    } else {
      const orderData = {
        // notes: "Please deliver between 9 AM and 5 PM.",
        user: `${currentUser.user.id}`,
        status: "Pending",
        order_status: "not_confirmed",
        total: `${cartItems.reduce(
          (sum, item) => item.quantity * item.productItem.price + sum,
          0
        )}`,
        discount: 0.0,
        total_after_discount: `${cartItems.reduce(
          (sum, item) => item.quantity * item.productItem.price + sum,
          0
        )}`,
        items: `${cartItems.map((data) => ({
          product_id: data.productItem.id,
          quantity: data.quantity,
        }))}`,
        first_name: `${currentUser.user.first_name}`,
        last_name: `${currentUser.user.last_name}`,
        email: `${currentUser.user.email}`,
        phone: `${currentUser.user.phone}`,
        // address: "123 Main St, Anytown, USA",
        delivered_by: "",
        shipping: "",
      };
      updateOrderData(orderData);
      // Call the api to place order --- right on the checkout page
      // clear the cart -> clearCart()  ---  DONE
      clearCart();
      navigate("/checkout");
    }
  };

  return (
    <div className="mx-4 lg:mx-60 mb-4 mt-5">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <div className="flex flex-row flex-wrap gap-1 py-2 pl-2 rounded-sm bg-slate-400 mb-2">
            <h2 className="flex-1 font-bold text-slate-800">Items Details</h2>
            <h2 className="flex-none w-28 font-bold text-slate-800">
              Quantity
            </h2>
            <h2 className="flex-none w-40 font-bold text-slate-800">
              Item Price
            </h2>
            <h2 className="flex-none w-16 font-bold text-slate-800">Action</h2>
          </div>

          <div className="py-2 pl-2">
            {cartItems.map((item) => (
              <div
                className="flex flex-row flex-wrap gap-1 mb-8"
                key={item.productItem.id}
              >
                <div className="flex-1 flex flex-row">
                  <img
                    src={item.productItem.image}
                    alt={`${item.productItem.name}'s image`}
                    className="flex-none w-20 inline-block align-middle"
                  />

                  <div className="flex-1 inline-block align-middle py-4 ml-2">
                    <h2 className="font-bold text-xl">
                      {item.productItem.name}
                    </h2>
                    <p className="cart-product-attr">
                      Brand name - {item.productItem.brand}
                    </p>
                  </div>
                </div>

                <p className="flex-none w-28 py-4">{item.quantity}</p>

                <div className="flex-none w-40 py-4">
                  <p>
                    $
                    <NumericFormat
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={item.productItem.price * item.quantity}
                      allowNegative={false}
                      disabled={true}
                      className="max-w-32 inline"
                    />
                  </p>
                  <p className="cart-price-breakdown">
                    {item.quantity} x{" "}
                    <NumericFormat
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={item.productItem.price}
                      disabled={true}
                      className="inline max-w-16"
                    />
                  </p>
                </div>

                <div className="flex-none w-16 py-4 text-red-700 mr-2 font-bold">
                  <button onClick={() => removeItem(item.productItem.id)}>
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total of all the items' prices */}

          <div className="mb-6 ml-96 flex flex-row">
            <p className="font-bold text-lg mr-20">Total</p>
            {/* <p className="font-bold text-lg ml-48">
              {cartItems.reduce((sum, item) => item.quantity * item.productItem.price + sum, 0)}
            </p> */}
            <NumericFormat
              thousandSeparator={true}
              decimalScale={2}
              disabled={true}
              fixedDecimalScale={true}
              value={cartItems.reduce(
                (sum, item) => item.quantity * item.productItem.price + sum,
                0
              )}
              className="inline font-bold text-lg ml-48"
            />
          </div>

          {/* Clear Cart and Place Order buttons */}
          <div className="flex flex-row justify-between">
            <button
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <button
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200"
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
