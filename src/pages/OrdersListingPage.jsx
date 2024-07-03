import Orders from "../components/Orders";

const OrdersListingPage = () => {
  // Request to the API to fetch Orders
  // Use map method of list to render each order, associated  with a logged in user

  return (
    <div className="mx-60">
        <div className="p-3 bg-slate-300 text-slate-800 border-b-2 border-slate-500 font-bold rounded-sm mb-2">
            <p>My Orders</p>
        </div>

        <Orders />
    </div>
);
};

export default OrdersListingPage;
