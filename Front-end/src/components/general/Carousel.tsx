import React, { useState } from "react";

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative carousel w-full h-full lg:h-5/6">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            index === currentSlide ? "block" : "hidden"
          }`}
        >
          <img
            src={image}
            className="md:object-contain object-cover w-full h-full "
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={handlePrev} className="btn btn-circle">
              ❮
            </button>
            <button onClick={handleNext} className="btn btn-circle">
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
