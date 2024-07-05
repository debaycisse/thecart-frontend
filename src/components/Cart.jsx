import React, { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    removeItem,
    clearCart,
    accessToken,
    updateOrderData,
    currentUser,
    addItem,
  } = useContext(CartContext);

  const navigate = useNavigate();

  let responseData;

  const handleCheckOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/ordering/orders/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(null),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        updateOrderData(responseData);
        navigate("/checkout");
      } else {
        console.error("Error while posting a Checkout: ", responseData.error);
      }
    } catch (error) {
      console.error("Network error while placing an Order: ", error);
    }

    // if (Object.keys(cartItems).length < 1) {
    //   alert("Your Cart is empty. Add item(s) to your Cart firstly.");
    //   return null;
    // } else {
    //   // const orderData = {
    //   //   // notes: "Please deliver between 9 AM and 5 PM.",
    //   //   user: `${currentUser.user.id}`,
    //   //   status: "Pending",
    //   //   order_status: "not_confirmed",
    //   //   total: `${cartItems.reduce(
    //   //     (sum, item) => item.quantity * item.productItem.price + sum,
    //   //     0
    //   //   )}`,
    //   //   discount: 0.0,
    //   //   total_after_discount: `${cartItems.reduce(
    //   //     (sum, item) => item.quantity * item.productItem.price + sum,
    //   //     0
    //   //   )}`,
    //   //   items: `${cartItems.map((data) => ({
    //   //     product_id: data.productItem.id,
    //   //     quantity: data.quantity,
    //   //   }))}`,
    //   //   // first_name: `${currentUser.user.first_name}`,
    //   //   // last_name: `${currentUser.user.last_name}`,
    //   //   email: `${currentUser.user.email}`,
    //   //   // phone: `${currentUser.user.phone}`,
    //   //   // address: "123 Main St, Anytown, USA",
    //   //   delivered_by: "",
    //   //   shipping: "",
    //   // };
    //   // updateOrderData(orderData);
    //   // navigate("/checkout");
    //   // -------------------------------------------------------
    //   let requestData = cartItems.map((item) => ({
    //     product_id: item.productItem.id,
    //     quantity: item.quantity,
    //   }));
    //   try {
    //     const response = await fetch(
    //       "http://localhost:8000/api/v1/ordering/orders/cart-item/",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //         body: JSON.stringify(requestData),
    //       }
    //     );
    //     const responseData = await response.json();

    //     if (response.ok) {
    //       navigate("/checkout");
    //     } else {
    //       console.error(
    //         "Error occured while posting the Cart: ",
    //         responseData.error
    //       );
    //     }
    //   } catch (error) {
    //     console.error("Network error while posting Cart: ", error);
    //   }
    // }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/ordering/orders/cart-item/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        responseData = await response.json();

        if (response.ok) {
            const fetchProduct = responseData.map(async (item) => {
              try {
                const res = await fetch(
                  `http://localhost:8000/api/v1/products/items/${item.product}/`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
                const resData = await res.json();
                if (res.ok) {
                  addItem(resData, item.quantity);
                } else {
                  console.error(
                    "Error while fetching a product instance: ",
                    resData.error
                  );
                }
              } catch (error) {
                console.error(
                  "Network error while fetching a product instance: ",
                  error
                );
              }

            });
            await Promise.all(fetchProduct);
          } else {
          console.error(
            "Error while fetching Cart items: ",
            responseData.error
          );
        }
      } catch (error) {
        console.error("Network error while fetching Carts: ", error);
      }
    };
    fetchCart();
  }, [responseData]);

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
                    <NumericFormat
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={item.productItem.price * item.quantity}
                      allowNegative={false}
                      disabled={true}
                      className="max-w-32 inline bg-white"
                      prefix="$"
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
                      className="inline max-w-16 bg-white"
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
              prefix="$"
              className="inline font-bold text-lg ml-48 bg-white"
            />
          </div>

          {/* Clear Cart and Place Order buttons */}
          <div className="flex flex-row">
            {/* <button
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200"
              onClick={clearCart}
            >
              Clear Cart
            </button> */}

            <button
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200"
              onClick={handleCheckOut}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
