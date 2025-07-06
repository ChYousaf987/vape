import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./compunent/Home";
import Login from "./compunent/Login";
import Cart from "./compunent/Cart";
import Signup from "./compunent/Signup";
import Edibles from "./compunent/Edibles";
import Vape from "./compunent/Vape";
import E_Liquids from "./compunent/E_Liquids";
import Pre_Rolls from "./compunent/Pre_Rolls";
import Exoticsnacks from "./compunent/Exoticsnacks";
import Delta from "./compunent/Delta";
import Payment from "./compunent/Payment";
import ProtectedRoute from "./compunent/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Kratom"
          element={
            <ProtectedRoute>
              <Edibles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Disposables"
          element={
            <ProtectedRoute>
              <Vape />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eliquids"
          element={
            <ProtectedRoute>
              <E_Liquids />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Devices"
          element={
            <ProtectedRoute>
              <Pre_Rolls />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Whip-gas"
          element={
            <ProtectedRoute>
              <Exoticsnacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delta"
          element={
            <ProtectedRoute>
              <Delta />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <div>
                Payment Successful! <a href="/cart">Back to Cart</a>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <div>
                Payment Cancelled. <a href="/cart">Back to Cart</a>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
