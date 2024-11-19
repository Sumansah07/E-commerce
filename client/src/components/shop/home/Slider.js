import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);

    const interval = setInterval(() => {
      setSlide((prevSlide) => (prevSlide + 1) % data.sliderImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [dispatch, data.sliderImages.length]);

  const handlePrev = () => {
    setSlide((prevSlide) =>
      prevSlide === 0 ? data.sliderImages.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setSlide((prevSlide) => (prevSlide + 1) % data.sliderImages.length);
  };

  return (
    <Fragment>
      <div className="relative mt-16 bg-gray-100 border-2 h-64 overflow-hidden"> {/* Adjust height */}
        {data.sliderImages.length > 0 ? (
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${slide * 100}%)` }} // Slide effect
          >
            {data.sliderImages.map((image, index) => (
              <img
                key={index}
                className="w-full h-full object-cover" // Ensure the image covers the height
                src={`${apiURL}/uploads/customize/${image.slideImage}`}
                alt={`sliderImage ${index}`}
              />
            ))}
          </div>
        ) : null}

        {data?.sliderImages?.length > 0 ? (
          <>
            <svg
              onClick={handlePrev}
              className={`z-10 absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-end items-center box-border flex justify-center w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              onClick={handleNext}
              className={`z-10 absolute top-1/2 right-0 transform -translate-y-1/2 flex justify-start items-center box-border flex justify-center w-12 h-12 text-gray-700 cursor-pointer hover:text-yellow-700`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {/* <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="#shop"
                style={{ background: "#303031" }}
                className="cursor-pointer box-border text-2xl text-white px-2 py-2 rounded"
              >
                Shop Now
              </a>
            </div> */}
          </>
        ) : null}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
