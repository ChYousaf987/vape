import React from "react";
import ViewList from "./ViewList";
import Navbar from "./Navbar";
import Carts from "./Carts";
import ViewAll from "./ViewAll";

const Cart = () => {
  return (
    <div className="relative min-h-screen ">
      {/* Background Video */}
      

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <div className="pt-6 px-4 sm:px-6  w-[96%] mx-auto min-h-[88vh] flex flex-col">
          <div className="flex flex-col md:flex-row flex-1 gap-8">
            <div className="flex-1 md:w-[70%] overflow-y-auto p-4 sm:p-8">
              <ViewAll />
            </div>
            <div className=" p-1 md:w-[30%] sm:p-8 backdrop-blur-md rounded-2xl shadow-xl bg-gray-100">
              <Carts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
