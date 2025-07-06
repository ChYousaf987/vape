import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Slider = () => {
  const slides = [
    {
      title: "E-LIQUID VAPE",
      subtitle: "Best Deal Online on Vape",
      button: "Shop Now",
      image:
        "https://www.totallywicked-eliquid.co.uk/vaped/wp-content/uploads/2024/10/vape-kits-1.png",
    },
    {
      title: "E-LIQUID VAPEsss",
      subtitle: "Best Deal Online on Vape",
      button: "Shop Now",
      image:
        "https://www.blacknote.com/wp-content/uploads/2023/07/Smok-Vape-Pen-V2-Kit-60W-Lineup-1.webp",
    },
    {
      title: "E-LIQUID VAPE",
      subtitle: "Best Deal Online on Vape",
      button: "Shop Now",
      image:
        "https://files.myuwell.com/uwell/ow-content-text-picture/all%20vape%20pods-20240715113046194.webp",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("next");

  const handleSlideChange = (newIndex) => {
    setDirection(newIndex > current ? "next" : "prev");
    setCurrent(newIndex);
  };

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .animate-slide-in-right {
        animation: slideInRight 0.5s ease-out forwards;
      }
      .animate-slide-in-left {
        animation: slideInLeft 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);
  }, []);

  const animationClass =
    direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <div className="relative bg-[#1c2341] md:w-[90%] md:max-w-7xl mx-auto px-4 py-6 z-10 shadow-2xl md:rounded-xl">
      {/* Decorative Circles */}
      <div className="absolute -top-32 right-32 w-80 h-80 bg-gray-200/5 rounded-full"></div>
      <div className="absolute -top-40 right-24 w-96 h-96 rounded-full border-2 border-gray-200/5"></div>

      {/* Main Content */}
      <div className="relative z-10 rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <div
            key={current}
            className="flex-1 flex flex-col sm:flex-row md:px-10 justify-between items-center gap-4 sm:gap-8"
          >
            {/* Image comes first on small screens */}
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className={`order-1 sm:order-2 h-40 sm:h-56 lg:h-72 object-contain ${animationClass}`}
            />

            {/* Text comes second on small screens */}
            <div
              className={`order-2 sm:order-1 text-white max-w-md text-center px-6 sm:text-left ${animationClass}`}
            >
              <p className="text-sm sm:text-lg">{slides[current].subtitle}</p>
              <h2 className="text-2xl sm:text-4xl font-bold py-1 sm:py-2">
                {slides[current].title}
              </h2>
              <button className="mt-2 sm:mt-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-blue-700 transition duration-300">
                {slides[current].button}
              </button>
            </div>
          </div>
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={() =>
            handleSlideChange(current === 0 ? slides.length - 1 : current - 1)
          }
          aria-label="Previous slide"
          className="absolute z-20 left-0 md:-left-12 top-1/2 transform -translate-y-1/2 bg-gray-200 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition duration-300"
        >
          <IoIosArrowBack className="text-blue-500 text-lg sm:text-xl lg:text-2xl" />
        </button>

        <button
          onClick={() =>
            handleSlideChange(current === slides.length - 1 ? 0 : current + 1)
          }
          aria-label="Next slide"
          className="absolute z-20 right-0 md:-right-12 top-1/2 transform -translate-y-1/2 bg-gray-200 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition duration-300"
        >
          <IoIosArrowForward className="text-blue-500 text-lg sm:text-xl lg:text-2xl" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 z-20 relative">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 w-2 sm:w-3 sm:h-2 rounded-full ${
              index === current ? "bg-blue-500 w-6 sm:w-6" : "bg-gray-400"
            } transition-all duration-300 cursor-pointer`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
