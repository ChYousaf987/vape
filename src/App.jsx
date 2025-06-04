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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lognin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Edibles" element={<Edibles />} />
        <Route path="/vape" element={<Vape />} />
        <Route path="/eliquids" element={<E_Liquids />} />
        <Route path="/flower" element={<Pre_Rolls />} />
        <Route path="/snacks" element={<Exoticsnacks />} />
        <Route path="/delta" element={<Delta />} />
      </Routes>
    </Router>
  );
};

export default App;
