import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../actions/navigationActions";
import { setLoggedIn, setToken } from "../auth/actions/authActions";
import './nav.css';

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  currentPage: state.nav.currentPage,
});
const mapDispatchToProps = {
  setLoggedIn,
  setToken,
};

const Navigation = () => {
  const dispatch = useDispatch();
  const [user] = useState(null);
  const currentPage = useSelector((state) => state.nav.currentPage);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const handleLogout = () => {
    // Clear the token
    localStorage.removeItem("token");
    // Update the loggedIn state
    dispatch(setLoggedIn(false));
    dispatch(setToken(null));
    // Redirect to inventory
    dispatch(setCurrentPage("login"));
  };
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800" style={{minHeight:'100%', marginTop:'15px'}}>
        <nav className="bg-gray-800">
          <ul className="space-y-5">
            {loggedIn && (
              <div>
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
                    New Orders
                  </Link>
                </li>
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => dispatch(setCurrentPage("completed_orders"))}
                    className={currentPage === "completed_orders" ? "active" : ""}
                  >
                    Completed Orders
                  </Link>
                </li>
               
                <li className="text-white">
                  <Link
                    to="#"
                    onClick={() => handleLogout()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
