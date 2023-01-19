import React, {  } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ComponentView from "./components/ComponentView";
import { connect, useSelector } from "react-redux";

function App() {
  const currentPage = useSelector((state) => state.nav.currentPage);

  return (
    <Router>
      <div className="bg-gray-200 min-h-screen flex">
        <Navigation currentPage={currentPage}/>
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

const mapStateToProps = state => ({
  currentPage: state.nav.currentPage,
});


export default connect(mapStateToProps)(App);

