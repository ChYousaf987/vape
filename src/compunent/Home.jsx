import React from "react";
import Navbar from "./Navbar";
import Slider from "./Slider";
import ProductDeals from "./ProductDeals";
import TopCategories from "./TopCategories";
import TopBrands from "./TopBrands";
import Essential from "./Essential";
import PromoBanner from "./PromoBanner";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      {/* Video Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/6894947/6894947-sd_640_360_30fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Optional overlay for contrast */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* App Content */}
      <div className="relative z-10">
        <Navbar />
        <Slider />
        <ProductDeals />
        <TopCategories />
        <TopBrands />
        <Essential />
        <PromoBanner />
        <Footer />
      </div>
    </>
  );
};

export default Home;
