/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import bg_5 from "../assets/img/bg_5.jpg"
import SearchBar from "components/serchBar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import image1 from '../assets/img/hotel-resto-7.jpg'
import image2 from '../assets/img/destination-6.jpg'
const offers = [
  { id: 1, image: image1, title: "Manila Hotel", location: "Manila, Philippines", price: "$200/person" },
  { id: 2, image: image2, title: "Bali Resort", location: "Bali, Indonesia", price: "$250/person" },
  { id: 3, image: "image3.jpg", title: "Paris Luxury Hotel", location: "Paris, France", price: "$300/person" },
];

const trendingDestinations = [
  { id: 1, image: "tunisia.jpg", name: "Tunis", flag: "tunisia-flag.png" },
  { id: 2, image: "morocco.jpg", name: "Marrakech", flag: "morocco-flag.png" },
  { id: 3, image: "egypt.jpg", name: "Le Caire", flag: "egypt-flag.png" },
];
export default function Index() {
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 2;
  
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = offers.slice(indexOfFirstOffer, indexOfLastOffer);
  
  const nextPage = () => {
    if (indexOfLastOffer < offers.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 
  
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px"
        style={{
          backgroundImage:
            `url(${bg_5})`
        }}>
        <div className="container mx-auto items-center flex flex-wrap" >
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0" >
              <div class="space-y-4 text-white">
                <span class="text-xl font-semibold text-primary">Bienvenue à Hub Travel</span>
                <h1 class="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  Découvrez votre endroit préféré avec nous
                </h1>
                <p class="text-lg font-light leading-relaxed">
                 Voyagez dans n'importe quel coin du monde, sans tourner en rond.
                </p>
              </div>
              <div className="mt-12">

                <a
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  target="_blank"
                >
                  Github Star
                </a>
              </div>
            </div>
          </div>
        </div>

      </section>

      <SearchBar />



      {/* Offres de voyage */}
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Offres de voyage</h2>
        <div className="grid grid-cols-2 gap-4">
          {currentOffers.map((offer) => (
            <div key={offer.id} className="bg-white shadow-lg rounded-lg p-4">
              <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-bold mt-2">{offer.title}</h3>
              <p>{offer.location}</p>
              <p className="text-orange-500 font-bold">{offer.price}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="mx-2 p-2 bg-gray-300 rounded">
            <FaArrowLeft />
          </button>
          <button onClick={nextPage} disabled={indexOfLastOffer >= offers.length} className="mx-2 p-2 bg-gray-300 rounded">
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Destinations en vogue */}
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Destinations en vogue</h2>
        <div className="grid grid-cols-3 gap-4">
          {trendingDestinations.map((destination) => (
            <div key={destination.id} className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img src={destination.image} alt={destination.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-bold mt-2">{destination.name}</h3>
              <img src={destination.flag} alt="Drapeau" className="w-10 h-10 mx-auto mt-2" />
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
