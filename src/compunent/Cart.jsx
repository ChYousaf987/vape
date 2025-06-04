import React from "react";
import ViewList from "./ViewList";
import Navbar from "./Navbar";
import Carts from "./Carts";
import ViewAll from "./ViewAll";

const Cart = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source
          src="https://videos.pexels.com/video-files/7122120/7122120-sd_640_360_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        <Navbar />
        <div className="pt-6 px-4 sm:px-6  w-[96%] mx-auto min-h-[88vh] flex flex-col">
          <div className="flex flex-col md:flex-row flex-1 gap-8">
            <div className="flex-1 md:w-[70%] overflow-y-auto bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 shadow-xl">
              <ViewAll />
            </div>
            <div className=" p-1 md:w-[30%] sm:p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl">
              <Carts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
