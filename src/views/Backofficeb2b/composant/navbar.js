import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import image1 from "../../../assets/img/hotel-resto-1.jpg"; // Update the path for your images
import image2 from "../../../assets/img/hotel-resto-2.jpg";
import image3 from "../../../assets/img/hotel-resto-5.jpg";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbarb2b() {
  return (
    <>
      <div className="relative w-full h-96">
        {/* Swiper with autoplay */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-full"
        >
          <SwiperSlide>
            <img
              src={image1}
              alt="Hotel 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={image2}
              alt="Hotel 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={image3}
              alt="Hotel 3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>

        {/* Text over the carousel */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">

        </div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded-xl text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
