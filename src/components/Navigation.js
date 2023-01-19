import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../actions/navigationActions";

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  currentPage: state.nav.currentPage,
});

const Navigation = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const currentPage = useSelector((state) => state.nav.currentPage);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
        <nav className="bg-gray-800">
          <ul className="space-y-4">
            <li className="text-white">
              <Link to="/">Home</Link>
            </li>
            {loggedIn && (
              <div>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("inventory"))}
                    className={currentPage === "inventory" ? "active" : ""}
                  >
                    Inventory
                  </Link>
                </li>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("orders"))}
                    className={currentPage === "orders" ? "active" : ""}
                  >
                    Orders
                  </Link>
                </li>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("customers"))}
                    className={currentPage === "customers" ? "active" : ""}
                  >
                    Customers
                  </Link>
                </li>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("checkout"))}
                    className={currentPage === "checkout" ? "active" : ""}
                  >
                    Checkout
                  </Link>
                </li>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("logout"))}
                    className={currentPage === "logout" ? "active" : ""}
                  >
                    Logout
                  </Link>
                </li>
              </div>
            )}
            {!loggedIn && (
              <li className="text-white">
                <Link
                  to="#"
                  onClick={() => dispatch(setCurrentPage("login"))}
                  className={currentPage === "login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default connect(mapStateToProps)(Navigation);
