import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const {
    orderData,
    cartItems,
    clearCart,
    updateOrderData,
    clearOrderData,
    accessToken,
    updatePostedOrder,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(null);

  const [requestData, setRequestData] = useState(null);

  const [latestOrder, setLatestOrder] = useState(null);

  const handleState = (event) => {
    setRequestData({ ...requestData, state: event.target.value });
  };

  const handleCity = (event) => {
    setRequestData({ ...requestData, city: event.target.value });
  };

  const handleAddress = (event) => {
    setRequestData({ ...requestData, address: event.target.value });
  };

  const handlePhone = (event) => {
    setRequestData({ ...requestData, contact_phone: event.target.value });
  };

  const handleZipCode = (event) => {
    setRequestData({ ...requestData, zip_code: event.target.value });
  };

  const handlePaymentMethod = (event) => {
    setRequestData({ ...requestData, payment_method: event.target.value });
  };

  const handleEmail = (event) => {
    setRequestData({ ...requestData, contact_email: event.target.value });
  };

  const handleOrderSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/ordering/orders/checkout/${orderData.order_id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage(responseData.message);
      }
      if (successMessage) {
        clearCart();
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      }
    } catch (error) {
      console.error("Error occured while submitting order: ", error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/ordering/orders/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          const latest = responseData.filter((item) => {
            item.id === orderData.order_id;
          });
          setLatestOrder(latest);
        } else {
          console.error("Error while obtaining Orders: ", responseData.error);
        }
      } catch (error) {
        console.error("Network error while obtaining Orders: ", error);
      }
    };
    fetchOrders();
  }, [orderData.order_id]);

  return (
    <>
      {successMessage ? (
        <>
          <p className="font-bold text-xl text-green-700 text-center">
            {successMessage}
          </p>
        </>
      ) : (
        <>
          <div className="mx-80 flex flex-row gap-12">
            {/* Recipient or Order Receiver Information  */}
            <div>
              <form onSubmit={handleOrderSubmission}>
                <label>Address</label>
                <input
                  required
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleAddress}
                />

                <label>City</label>
                <input
                  required
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleCity}
                />

                <label>State</label>
                <input
                  required
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleState}
                />

                <label>Zip Code</label>
                <input
                  required
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleZipCode}
                />

                <label>Payment Method</label>
                <select
                  name="payment_method"
                  id="payment_method"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handlePaymentMethod}
                >
                  <option name="payment_on_delivery">
                    Payment on Delivery
                  </option>
                  <option name="credit_card">Credit Card</option>
                </select>

                <label>Email Address</label>
                <input
                  required
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleEmail}
                />

                <label>Phone Number</label>
                <input
                  required
                  type="tel"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handlePhone}
                />

                {/* <label>Special Note (preffered delivery time)</label>
                <textarea
                  name=""
                  id=""
                  cols="23"
                  rows="5"
                  placeholder="Between what time will you like the delivery to take place?"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleNotes}
                ></textarea> */}

                <button
                  type="submit"
                  className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 mt-4"
                >
                  Checkout
                </button>
              </form>
            </div>

            {/* Order Information */}
            <div>
              <h2 className="text-center font-bold text-xl mb-4">
                Order summary
              </h2>

              <div className="flex flex-col">
                {/* Header */}
                <div className="flex flex-row gap-28">
                  <h2 className="font-bold text-xl w-2/4">Product Items</h2>
                  <h2 className="font-bold text-xl w-1/4">Unit</h2>
                  <h2 className="font-bold text-xl w-1/4 pr-11">Amount</h2>
                </div>
                {/* Content or body */}
                <div className="flex flex-col gap-6 mt-6">
                  {latestOrder.order_items.map((item) => (
                    <div className="flex flex-row" key={item.product.id}>
                      <div className="w-2/4 flex flex-row gap-2">
                        <img
                          src={item.product.image}
                          alt={`${item.product.name}'s picture`}
                          className="w-1/12 flex-none"
                        />
                        <p className="w-2/4">{item.name}</p>
                      </div>
                      <p className="w-1/4">{item.quantity}</p>
                      <p className="w-1/4">
                        <NumericFormat
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={item.value}
                          allowNegative={false}
                          disabled={true}
                          prefix="$"
                          className="inline bg-inherit"
                        />
                      </p>
                    </div>
                  ))}
                  {/* {latestOrder.map((item) => (
                    <div className="flex flex-row" key={item.productItem.id}>
                      <div className="w-2/4 flex flex-row gap-2">
                        <img
                          src={item.productItem.image}
                          alt={`${item.productItem.name}'s picture`}
                          className="w-1/12 flex-none"
                        />
                        <p className="w-2/4">{item.productItem.name}</p>
                      </div>
                      <p className="w-1/4">{item.quantity}</p>
                      <p className="w-1/4">
                        <NumericFormat
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          value={item.productItem.price * item.quantity}
                          allowNegative={false}
                          disabled={true}
                          prefix="$"
                          className="inline bg-inherit"
                        />
                      </p>
                    </div>
                  ))} */}
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-14 flex justify-around">
                <p className="font-bold">
                  Total Amount{" "}
                  <NumericFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={orderData.value}
                    allowNegative={false}
                    disabled={true}
                    className="inline bg-white"
                    prefix="$"
                  />
                </p>

                <button
                  type="submit"
                  className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 mt-4"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Checkout;
