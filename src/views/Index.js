/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import bg_5 from "../assets/img/bg_5.jpg"
import SearchBar from "components/serchBar";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import image1 from '../assets/img/hotel-resto-7.jpg'
import image2 from '../assets/img/destination-6.jpg'
import { useGetHotelsWithPrice } from "./hooks/periodehotel";
import CardsHotel from "./Frontoffice/Acceuil/CardHotel";
import TypingEffect from "react-typing-effect";
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
  const [offsetY, setOffsetY] = useState(0);
  const { data: hotels, isLoading, error } = useGetHotelsWithPrice();
   const navigate=useNavigate()
  const handleScroll = () => {
    setOffsetY(window.scrollY * 0.5);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px "
        style={{
          backgroundImage: `url(${bg_5})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${offsetY}px`,
          transition: "background-position 0.1s ease-out",
        }}>
        <div className="container mx-auto items-center flex flex-wrap  " >



          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0" >
              <div class=" text-white">
                <span class="text-xl font-semibold text-primary">Bienvenue à Hub Travel</span>
                <h1 className="text-5xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  Découvrez{" "}
                  <TypingEffect
                    text={["votre endroit préféré avec nous"]}
                    speed={100}
                    eraseDelay={2000}
                    cursor={"|"}
                  />
                </h1>
                <p class="text-lg font-light leading-relaxed">
                  Voyagez dans n'importe quel coin du monde, sans tourner en rond.
                </p>
              </div>
              <div className="mt-12">

                <button className='group relative'>
                  <div
                    className='relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-full
                bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(76_100_255)] border-2 border-[#263381] 
                 bg-transparent px-6 font-medium dark:text-white text-black  transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3'
                 onClick={()=> navigate('/contact')}
                  >
                    Contact me
                  </div>
                  <div className='absolute inset-0 z-0 h-full w-full rounded-full transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3  group-hover:[box-shadow:5px_5px_#394481,10px_10px_#5766be,15px_15px_#8898f3]'></div>
                </button>
              </div>
            </div>
          </div>

        </div>

      </section>
     <div className="bg-gray-100">
      <SearchBar />
      </div>
      <CardsHotel />

      {/* Offres de voyage */}
      <div className="container mx-auto mt-10 bg-white">
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
    
      <div className="mt-10 pt-6">
      <Footer />
      </div>
    </>
  );
}
