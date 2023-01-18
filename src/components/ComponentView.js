import React, { useState } from "react";
import Customers from "../customers/components/CustomerList";
import Orders from "../orders/components/OrderList";
import Checkout from "../checkout/components/Checkout";
import Inventory from "../inventory/components/InventoryList";
import Login from "../auth/components/Login";
import Logout from "../auth/components/Logout";

const ComponentView = () => {
  const [currentPage] = useState("login");
  return (
    <div className="container mx-auto">
      {currentPage === "login" && <Login />}
      {currentPage === "logout" && <Logout />}

      {currentPage === "customers" && <Customers />}
      {currentPage === "orders" && <Orders />}
      {currentPage === "inventory" && <Inventory />}
      {currentPage === "checkout" && <Checkout />}
    </div>
  );
};

export default ComponentView;
