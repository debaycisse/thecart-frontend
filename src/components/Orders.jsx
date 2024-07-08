import { useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// order component lists out and display all posted orders
const Orders = ({ orderObject }) => {
  const { accessToken, userHasLoggedOn } = useContext(CartContext);
  const [allOrders, setAllOrders] = useState(null);
  const navigate = useNavigate();





  return (
    <div className="border-b-2 border-slate-500 p-3 flex flex-row gap-2 justify-between">
      {/* Left hand side of the order */}
      <div className="flex flex-col gap-6">
        <div>
          <p>
            <b>Order's Date: {orderObject.order_items[0].created_at} | </b> {orderObject.status}
          </p>
        </div>

        <div className="text-slate-500 order-attr">
          <p>
            <b>Total</b>: {orderObject.total_price}
          </p>
          {/* <p>
            <b>Order's Number</b>: orderObject.number
          </p> */}
          <p>
            <b>Payment Method</b>: Pay on Collection
          </p>
        </div>

        <div>
          <img src={orderObject.order_items[0].image} alt={`${orderObject.order_items[0].product.name}'s image`} />
        </div>
      </div>

      {/* Right handside of the order */}
      <div className="text-slate-500 order-attr">
        <p>
          <b>Delivery Address</b>:
        </p>
        <p>orderObject.address</p>
      </div>
    </div>
  );
};

export default Orders;
