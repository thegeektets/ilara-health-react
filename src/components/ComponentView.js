import React from "react";
import Customers from "../customers/components/CustomerList";
import Orders from "../orders/components/OrderList";
import Inventory from "../inventory/components/InventoryList";
import Login from "../auth/components/Login";
import { connect, useSelector } from "react-redux";
import CompletedOrderList from "../orders/components/CompletedOrderList";

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  currentPage: state.nav.currentPage,
});

const ComponentView = () => {
  const currentPage = useSelector((state) => state.nav.currentPage);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div
      className="container mx-auto"
      style={{ float: "right", padding: "15px" }}
    >
      {currentPage === "" && !loggedIn ? <Login /> : ""}
      {currentPage === "" && loggedIn ? <Inventory /> : ""}
      {currentPage === "login" && <Login />}
      {currentPage === "customers" && <Customers />}
      {currentPage === "orders" && <Orders />}
      {currentPage === "completed_orders" && <CompletedOrderList/>}

      {currentPage === "inventory" && <Inventory />}
    </div>
  );
};

export default connect(mapStateToProps)(ComponentView);
