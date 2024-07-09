import { useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

/**
 * Order component displays any given posted order, which it
 * receives from the OrderListingPage component.
 */
const Orders = ({ orderObject }) => {
  const { accessToken, userHasLoggedOn } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderAddress, setOrderAddress] = useState({});

  /**
   * Takes and converts a given ISO String date's value into a more
   * user-friendly format, which is DAY/MONTH/YEAR
   */
  const formattedDate = (dateISOStringValue) => {
    const date = new Date(dateISOStringValue);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  /**
   * Fetches the address, associated with the given order through the
   * shipping id, which is received from a given orderObject,
   * passed by the OrderListingPage component
   */
  useEffect(() => {
    if (!userHasLoggedOn()) {
      navigate("login/orders");
    }

    const fetchShippingInfo = async () => {
      try {
        const shippingInfo = await fetch(
          `http://localhost:8000/api/v1/ordering/shippings/${orderObject.shipping_address}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!shippingInfo.ok) {
          setOrderAddress({});
          const errorData = await shippingInfo.json();
          console.error(
            "Erro while obtaining shipping info : ",
            errorData.error
          );
        } else {
          const shippingData = await shippingInfo.json();
          setOrderAddress({
            address: shippingData.address,
            city: shippingData.city,
            state: shippingData.state,
          });
        }
      } catch (error) {
        console.error("Network error while obtaining shipping info : ", error);
      }
    };
    fetchShippingInfo();
  }, [orderObject]);

  /**
   * Returns both the data from orderObject, passed by the
   * OrderListingPage component and the one it fetches
   * from the shipping information endpoint.
   */
  return (
    <div className="border-b-2 border-slate-500 p-3 flex flex-row gap-2 justify-between">
      {/* Information, rendered at the left hand side of each order record, which are the
      order's date, total value of an order, and payment method */}
      <div className="flex flex-col gap-6">
        <div>
          <p>
            <b>
              Order's Date:{" "}
              {formattedDate(orderObject.order_items[0].created_at)} |{" "}
            </b>{" "}
            {orderObject.status}
          </p>
        </div>

        <div className="text-slate-500 order-attr">
          <p>
            <b>Total</b>:
            <NumericFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              value={orderObject.total_price}
              allowNegative={false}
              disabled={true}
              className="inline bg-inherit w-16"
            />
          </p>
          <p>
            <b>Payment Method</b>: Pay on Collection
          </p>
        </div>

        <div>
          <img
            src={orderObject.order_items[0].product.image}
            alt={`${orderObject.order_items[0].product.name}'s image`}
            className="w-1/6"
          />
        </div>
      </div>

      {/* Information, rendered at the right hand side of each order record,
      which is the delivery address information */}
      <div className="text-slate-500 order-attr flex-none w-1/6">
        <p>
          <b>Delivery Address</b>:
        </p>
        <p>{`${orderAddress.address},`}</p>
        <p>{`${orderAddress.city}, ${orderAddress.state}.`}</p>
      </div>
    </div>
  );
};

export default Orders;
