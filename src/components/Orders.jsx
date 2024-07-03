const Orders = () => {
  return (
    <div className="border-b-2 border-slate-500 p-3 flex flex-row gap-2 justify-between">
        {/* Left hand side of the order */}
      <div className="flex flex-col gap-6">
        <div>
            <p>
                <b>Order's Date: order.date | </b> order.status
            </p>
        </div>

        <div className="text-slate-500 order-attr">
            <p>
                <b>Total</b>: order.total_price
            </p>
            <p>
                <b>Order's Number</b>: order.number
            </p>
            <p>
                <b>Payment Method</b>: Pay on Collection
            </p>
        </div>
        
        <div>
            <img src="order[0].image" alt="order[0].name's image" />
        </div>
      </div>

      {/* Right handside of the order */}
      <div  className="text-slate-500 order-attr">
        <p>
            <b>Delivery Address</b>:
        </p>
        <p>order.address</p>
      </div>
    </div>
  );
};

export default Orders;
