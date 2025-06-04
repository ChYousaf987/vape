
import React, { useState } from "react";
import Navbar from "./Navbar";
import ViewList from "./ViewList";

const Delta = () => {
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

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10 backdrop-blur-sm"></div>

      {/* Page Content */}
      <div className="relative z-20">
        <Navbar />

        <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-16 w-full max-w-8xl mx-auto">
          {/* Page Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-amber-400 drop-shadow-lg animate-fade-in-up">
              Explore Dalta
            </h1>
          </div>

          {/* Product List Container */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10">
            <ViewList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delta;
