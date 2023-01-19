import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import axios from "axios";
import OrderItem from "./OrderItem";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Orders : Ilara Pharmacy";
    axios
      .get("/order/orders/")
      .then((res) => {
        const items = res.data.map(
          (item) =>
            new OrderItem(
              item.id,
              item.customer,
              item.status,
              item.price,
              item.order_items
            )
        );
        setOrders(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNewOrder = (orderItems) => {
    let item = new OrderItem(orderItems.id,orderItems.customer, orderItems.status, orderItems.price,orderItems.order_items );
    setOrders([...orders,  item ]);
  };
  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i]["price"];
    }
    return total;
  };
  const checkoutOrders = () => {};

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];

    let orderId = updatedOrders[index]["id"];

    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    try {
      const response = axios.delete(`/order/orders/${orderId}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add New"}
      </button>
      {showForm && <OrderForm handleNewOrder={handleNewOrder} />}

      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Order Items</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                {item.customer
                  ? `${item.customer.first_name} ${item.customer.last_name}`
                  : ""}
              </td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">
                {Array.isArray(item.order_items) ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.order_items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.product.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Order items not available</div>
                )}
              </td>
              <td className="border px-4 py-2">
                {item.status ? item.status.name : "New"}
              </td>
              <td>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  onClick={(event) => {
                    event.preventDefault();
                    handleRemoveOrder(index);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "inline-block",
          fontWeight: "bold",
          fontSize: "21px",
        }}
      >
        Total : {getTotal()}
      </div>
      <button
        style={{ float: "right", marginRight: "50px" }}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        onClick={(event) => {
          event.preventDefault();
          checkoutOrders();
        }}
      >
        Checkout Orders
      </button>
    </div>
  );
}
export default OrderList;
