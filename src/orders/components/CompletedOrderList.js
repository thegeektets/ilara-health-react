import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

function CompletedOrderList() {
  const [orders, setOrders] = useState([]);

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
        console.log("items", items);
        if (items.length > 0) {
          setOrders(items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        Completed Orders
      </h1>
     
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
                      <thead
                        style={{
                          textAlign: "left",
                          color: "rgb(59, 130, 246)",
                        }}
                      >
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
