import { useEffect, useState } from "react";
import Orders from "../components/Orders";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const OrdersListingPage = () => {
  // Request to the API to fetch Orders
  // Use map method of list to render each order, associated  with a logged in user
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();
  const { accessToken, userHasLoggedOn } = useContext(CartContext);

  /**
   * useEffect collects a list of posted orders via the API,
   * passes them to allOrder state variable, and the data from
   * the allOders are extracted and displayed
   */
  useEffect(() => {
    if (!userHasLoggedOn()) {
      return navigate("/login/orders");
    }

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
          setAllOrders([]);
          return;
        }

        const responseData = await response.json();

        if (responseData.length > 0) {
          setAllOrders(responseData);
        } else {
          console.error("Error while obtaining Orders: No orders found");
        }
      } catch (error) {
        console.error("Network error while obtaining Orders: ", error);
      }
    };
    fetchOrders();
  }, [accessToken]);

  return (
    <div className="mx-60">
      <div className="p-3 bg-slate-300 text-slate-800 border-b-2 border-slate-500 font-bold rounded-sm mb-2">
        <p>My Orders</p>
      </div>
      {allOrders.map((item) => (
        <Orders orderObject={item} key={item.id} />
      ))}
    </div>
  );
};

export default OrdersListingPage;
