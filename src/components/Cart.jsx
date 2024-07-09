import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

/**
 * Fetches and renderes the information, contained on the cart's web page
 */
function Cart() {
  const {
    accessToken,
    updateOrderData,
    userHasLoggedOn,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [cartObject, setCartObject] = useState([]);
  
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
  };

  const handleClearCart = async (event) => {
    event.preventDefault();

    // Clears the cart via the API and removes the local cached one as well
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/ordering/cart/remove/all/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error occured while removing a whole cart",
          errorData.error
        );
        return;
      }
      const resData = await response.json();

      if (resData[0].message.includes("success")) {
        setCartObject([]);
        return;
      }
    } catch (error) {
      console.error("Network error occured while clearing Cart", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    // Call remove single API to remove this very
    try {
      const removeAnItem = await fetch(
        `http://localhost:8000/api/v1/ordering/cart/remove/single/${productId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(null),
        }
      );

      if (!removeAnItem.ok) {
        const errorData = await removeAnItem.json();
        console.error(
          "Error while removing an item from a Cart:",
          errorData.error
        );
        return;
      }
      const filteredCartObject = cartObject.filter(
        (item) => item.product.id !== productId
      );
      setCartObject(filteredCartObject);
    } catch (error) {
      console.error("Network error while removing an item from a Cart:", error);
    }
  };

  const doesExist = (arrayOfObj, obj) => {
    return arrayOfObj.some(
      (item) => JSON.stringify(item) === JSON.stringify(obj)
    );
  };

  // Fetches the Cart items, using the API for cart
  useEffect(() => {
    // Protects the content by ensuring authentication
    if (!userHasLoggedOn()) {
      return navigate("/login/cart");
    }
    // Obtains the Cart's content
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

        let responseData;
        if (response.ok) {
          responseData = await response.json();
          setCartObject(responseData);
        } else {
          setCartObject([]);
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
  }, [accessToken]);

  return (
    <div className="mx-4 lg:mx-60 mb-4 mt-5">
      <h2 className="text-lg font-bold mb-2">Shopping Cart</h2>
      {cartObject.length === 0 ? (
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
            {cartObject.map((item) => (
              <div
                className="flex flex-row flex-wrap gap-1 mb-8"
                key={item.product.id}
              >
                <div className="flex-1 flex flex-row">
                  <img
                    src={`http://localhost:8000${item.product.image}`}
                    alt={`${item.product.name}'s image`}
                    className="flex-none w-20 inline-block align-middle"
                  />

                  <div className="flex-1 inline-block align-middle py-4 ml-2">
                    <h2 className="font-bold text-xl">{item.product.name}</h2>
                    <p className="cart-product-attr text-slate-600">
                      Brand name - <b>{item.product.brand}</b>
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
                      value={item.product.price * item.quantity}
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
                      value={item.product.price}
                      disabled={true}
                      className="inline max-w-16 bg-white"
                    />
                  </p>
                </div>

                <div className="flex-none w-16 py-4 text-red-700 mr-2 font-bold">
                  <button onClick={() => handleRemoveItem(item.product.id)}>
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total of all the items' prices */}

          <div className="mb-6 ml-96 flex flex-row">
            <p className="font-bold text-lg mr-20">Total</p>
            <NumericFormat
              thousandSeparator={true}
              decimalScale={2}
              disabled={true}
              fixedDecimalScale={true}
              value={cartObject.reduce(
                (sum, item) => item.quantity * item.product.price + sum,
                0
              )}
              prefix="$"
              className="inline font-bold text-lg ml-48 bg-white"
            />
          </div>

          {/* Clear Cart and Place Order buttons */}
          <div className="flex flex-row justify-between mt-10">
            <button
              className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>

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
