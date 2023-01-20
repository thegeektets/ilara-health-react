import React, { useState, useEffect } from "react";
import OrderForm from "./OrderForm";
import axios from "axios";
import OrderItem from "./OrderItem";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Orders : Ilara Pharmacy";
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("/order/orders/")
      .then((res) => {
        const items = res.data.filter((item) => {
          if (!item.status) {
            return new OrderItem(
              item.id,
              item.customer,
              item.status,
              item.price,
              item.order_items
            );
          } else if (item.status && item.status.id === 1) {
            return new OrderItem(
              item.id,
              item.customer,
              item.status,
              item.price,
              item.order_items
            );
          }
        });
        console.log("items", items);
        if (items.length > 0) {
          setOrders(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNewOrder = (orderItems) => {
    let item = new OrderItem(
      orderItems.id,
      orderItems.customer,
      orderItems.status,
      orderItems.price,
      orderItems.order_items
    );
    setOrders([...orders, item]);
    setShowForm(false);
  };
  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i]["price"];
    }
    return total;
  };
  const checkoutOrders = () => {
    const requestBody = {
      orders: orders,
      customer: orders[0]["customer"] ? orders[0]["customer"]["id"] : null,
      total_price: getTotal(),
    };

    // Send the request
    axios
      .post("/checkout/checkout/", requestBody)
      .then((response) => {
        console.log(response);
        // Handle the successful response here
        setOrders([]);
        setShowForm(false);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
  };

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
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "15px",
          float: "left",
          color: "rgb(59 130 246)",
        }}
      >
        New Orders
      </h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
        style={{ float: "right", marginBottom: "15px" }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add New"}
      </button>

      {showForm && (
        <div style={{ margin: "15px", float: "left", width: "80%" }}>
          <OrderForm handleNewOrder={handleNewOrder} />
        </div>
      )}

      <table
        className="table-auto"
        style={{ width: "100%", marginBottom: "20px" }}
      >
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
          {orders.length > 0 &&
            orders.map((item, index) => (
              <tr key={item.id} className="bg-white">
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">
                  {item.customer
                    ? `${item.customer.first_name} ${item.customer.last_name}`
                    : ""}
                </td>
                <td className="border px-4 py-2">{item.price}</td>
                <td className="border px-4 py-2">
                  {Array.isArray(item.order_items) ? (
                    <table style={{ width: "100%", marginBottom: "20px" }}>
                      <thead style={{ textAlign: "left", color:'rgb(59, 130, 246)' }}>
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
          marginTop: "15px",
        }}
      >
        Total : {getTotal()}
      </div>
      <button
        style={{ float: "right", marginRight: "50px", marginTop: "15px" }}
        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
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
