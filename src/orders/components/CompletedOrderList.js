import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

function CompletedOrderList() {
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
         if (item.status && item.status.id === 3) {
            return new OrderItem(
              item.id,
              item.customer,
              item.status,
              item.price,
              item.order_items
            );
          } 
        });
        if(items.length > 0) {
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
      customer: orders[0]['customer'] ? orders[0]['customer']['id']: null,
      total_price: getTotal(),
    };

    // Send the request
    axios
      .post("/checkout/checkout/", requestBody)
      .then((response) => {
        console.log(response);
        // Handle the successful response here
        setOrders([]);
        setShowForm(false)
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
      <h2>Orders</h2>
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Order Items</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((item, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CompletedOrderList;
