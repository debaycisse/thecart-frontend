import React, { useContext, useState } from "react";
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

  const handleFirstName = (event) => {
    updateOrderData({ ...orderData, first_name: event.target.value });
  };

  const handleLastName = (event) => {
    updateOrderData({ ...orderData, last_name: event.target.value });
  };

  const handleAddress = (event) => {
    updateOrderData({ ...orderData, address: event.target.value });
  };

  const handlePhone = (event) => {
    updateOrderData({ ...orderData, phone: event.target.value });
  };

  const handleNotes = (event) => {
    updateOrderData({ ...orderData, notes: event.target.value });
  };

  const handleOrderSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/ordering/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("We have received your order...");
        updatePostedOrder(data);
      }
      if (successMessage) {
        clearCart();
        clearOrderData();
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      }
    } catch (error) {
      console.error("Error occured while submitting order: ", error);
    }
  };

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
                <label>First Name</label>
                <input
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleFirstName}
                />

                <label>Last Name</label>
                <input
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleLastName}
                />

                <label>Address</label>
                <input
                  type="text"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleAddress}
                />

                <label>Phone Number</label>
                <input
                  type="tel"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handlePhone}
                />

                <label>Special Note (preffered delivery time)</label>
                <textarea
                  name=""
                  id=""
                  cols="23"
                  rows="5"
                  placeholder="Between what time will you like the delivery to take place?"
                  className="block border-2 border-slate-800 rounded-sm p-1 mb-4"
                  onChange={handleNotes}
                ></textarea>

                <button
                  type="submit"
                  className="bg-slate-900 text-slate-400 p-2 rounded-md hover:bg-slate-950 hover:text-slate-200 mt-4"
                >
                  Place Order
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
                  {cartItems.map((item) => (
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
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-14">
                <p className="font-bold">
                  Total Amount{" "}
                  <NumericFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    value={orderData.total}
                    allowNegative={false}
                    disabled={true}
                    className="inline bg-white"
                    prefix="$"
                  />
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Checkout;
