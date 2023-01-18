import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [loggedIn, setLoggedIn, setCurrentPage, currentPage] = useState(false);

  useEffect(() => {
    const isLoggedIn = () => {
      // check if user is logged in
      // return true or false
      return loggedIn;
    };
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto">
        <ul className="flex items-center justify-between p-4">
          <li className="text-white">
            <Link to="/">Home</Link>
          </li>
          {loggedIn && (
            <div>
            <li>
              <Link to="#" onClick={() => setCurrentPage("inventory")} className={currentPage === "inventory" ? "active" : ""}>
              Inventory
          </Link>
          </li>
              <li className="text-white">
              <Link to="#" onClick={() => setCurrentPage("orders")} className={currentPage === "orders" ? "active" : ""}>
                    Orders</Link>
              </li>
              <li className="text-white">
                <Link to="#" onClick={() => setCurrentPage("customers")} className={currentPage === "customers" ? "active" : ""}>

                    Customers</Link>
              </li>
              <li className="text-white">
              <Link to="#" onClick={() => setCurrentPage("checkout")} className={currentPage === "checkout" ? "active" : ""}>
                    Checkout</Link>
              </li>
              <li className="text-white">
              <Link to="#" onClick={() => setCurrentPage("logout")} className={currentPage === "logout" ? "active" : ""}>
                    Logout</Link>
              </li>
              </div>
          )}
          {!loggedIn && (
            <li className="text-white">
              <Link to="#" onClick={() => setCurrentPage("login")} className={currentPage === "login" ? "active" : ""}>
                Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
