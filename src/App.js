import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Header from './components/Header';
import ComponentView from './components/ComponentView';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  //how to create react app.js with navigation ?
  
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Header/>
      <Router>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="w-full flex-1 p-4">
        <ComponentView currentPage={currentPage} />
      </div>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
