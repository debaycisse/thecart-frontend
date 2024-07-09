import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";

/**
 * checkout component is used to collect posted order,
 * pending to be checked out.
 */
function Checkout() {
  // list of context variables, used in this component
  const { orderData, clearCart, accessToken, userHasLoggedOn } =
    useContext(CartContext);

  // list of state variables to store local data for this component

  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(null);

  const [requestData, setRequestData] = useState(null);

  const [latestOrder, setLatestOrder] = useState(null);

  // list of event handlers, used in this component

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

        clearCart();
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      }
    } catch (error) {
      console.error("Error occured while submitting order: ", error);
    }
  };

  /**
   * useEffect is used to fetch a list of posted orders, but pending
   * to be checked out. The API returns a list of all orders, so the
   * list is filtered and collects only the last posted instance
   */
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

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error while obtaining Orders: ", errorData.error);
          return;
        }

        const responseData = await response.json();

        let latest;
        if (responseData.length > 0) {
          latest = responseData.filter((item) => {
            return item.id === orderData.order_id;
          });
          setLatestOrder(latest);
        } else {
          console.error("Error while obtaining Orders: No orders found");
        }
      } catch (error) {
        console.error("Network error while obtaining Orders: ", error);
      }
    };
    fetchOrders();
  }, [orderData, accessToken]);

  // To ensure that a user must be authenticated before presenting the below content
  if (!userHasLoggedOn()) {
    return navigate("/login/checkout");
  }

  // Presents the below content after user has authenticated
  return (
    <>
      {successMessage ? (
        <>
          <p className="font-bold text-xl text-green-700 text-center mb-10">
            {successMessage}
          </p>
          <p className="text-center">
            You will be redirected to Order's page...
          </p>
        </>
      ) : (
        <>
          {latestOrder ? (
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
                      className="block border-2 border-slate-800 rounded-sm p-1 mb-4 w-52"
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

                    <button
                      type="submit"
                      className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 mt-4"
                    >
                      Checkout
                    </button>
                  </form>
                </div>

                {/* Order Information is displayed so that user is able to review before checking out */}
                <div>
                  <h2 className="text-center font-bold text-xl mb-4">
                    Order summary
                  </h2>

                  <div className="flex flex-col">
                    {/* Header label for each items, contained in an order */}
                    <div className="flex flex-row justify-between">
                      <h2 className="font-bold text-xl w-2/4">Product Items</h2>
                      <h2 className="font-bold text-xl w-1/4">Unit</h2>
                      <h2 className="font-bold text-xl w-1/4 pr-11">Amount</h2>
                    </div>
                    {/* Content or body, which is an each item, contained in an order */}
                    <div className="flex flex-col gap-6 mt-6">
                      {latestOrder[0].order_items.map((item) => (
                        <div className="flex flex-row" key={item.product.id}>
                          <div className="w-2/4 flex flex-row gap-2">
                            <img
                              src={item.product.image}
                              alt={`${item.product.name}'s picture`}
                              className="w-2/12 flex-none"
                            />
                            <p className="w-2/4">{item.product.name}</p>
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
                    </div>
                  </div>

                  {/* Total Price of all the item, contained in a just posted, but no checked out order*/}
                  <div className="mt-14 flex flex-row justify-between">
                    <p className="font-bold">Total Amount </p>

                    <NumericFormat
                      thousandSeparator={true}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      value={latestOrder[0].value}
                      allowNegative={false}
                      disabled={true}
                      className="bg-white font-bold w-1/4"
                      prefix="$"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* If no new order, then informs the user */}
              <p>There is no pending order</p>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Checkout;
