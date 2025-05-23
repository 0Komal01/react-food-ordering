import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import MyOrders from './MyOrders';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Required for styling the toasts

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
           <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      
      {/* 🔔 Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={1500} hideProgressBar />
    </Router>
  );
}

export default App;
