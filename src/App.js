import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ComponentView from "./components/ComponentView";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen flex">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Routes>
          <Route
            path="/"
            element={<ComponentView currentPage={currentPage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
