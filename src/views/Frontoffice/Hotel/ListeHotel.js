import "swiper/css";
import "swiper/css/autoplay";
import React, { Fragment } from "react";
import { useGetHotels } from "../../hooks/Hotel"; // Hook pour récupérer les hôtels
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import IndexNavbar from "components/Navbars/IndexNavbar"
import Loader from "views/Errorpages/loader";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
const HotelList = () => {
    const { data: hotels, isLoading, error } = useGetHotels();
    const navigate = useNavigate();
    if (isLoading) return  <Loader />;
    if (error) return <p>Erreur: {error.message}</p>;
    if (!hotels || hotels.length === 0) {
        return <p className="text-center text-gray-600 mt-5">Aucun hôtel disponible.</p>;
    }
    return (
        <>
             <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100">
                {/* 🔹 Bannière : Slider avec toutes les images des hôtels */}
                <div className="relative w-full h-96">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full"
                    >
                        {hotels.flatMap(hotel => hotel.image || []).map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt="Hôtel" className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">
                        Liste des Hôtels
                    </div>
                </div>

                {/* 🔹 Liste des hôtels */}
                <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel) => (
                        <div key={hotel._id} className="relative overflow-hidden w-80 h-auto rounded-3xl shadow-lg cursor-pointer bg-white">
                            {/* Icone menu ... */}
                            <div className="absolute top-3 right-3">
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className="text-black hover:text-gray-800">
                                        <FaEllipsisV size={20} />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? "bg-gray-100" : ""
                                                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                                                    >
                                                        Voir les détails
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? "bg-gray-100" : ""
                                                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => navigate(`/edit-hotel/${hotel._id}`)}
                                                    >
                                                        Modifier
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? "bg-gray-100 text-red-600" : "text-red-600"
                                                        } w-full text-left px-4 py-2 text-sm`}
                                                        // onClick={() => handleDelete(hotel._id)}
                                                    >
                                                        Supprimer
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${
                                                            active ? "bg-gray-100" : ""
                                                        } w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => navigate(`/contrat/${hotel._id}`)}
                                                    >
                                                        Voir le contrat
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                            {/* Image unique */}
                            {hotel.image && hotel.image.length > 0 ? (
                                <img src={hotel.image[0]} alt={hotel.name} className="w-full h-48 object-cover rounded-t-3xl" />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-t-3xl">
                                    <span className="text-gray-500">Aucune image disponible</span>
                                </div>
                            )}

                            {/* Infos de l'hôtel */}
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-purple-500">{hotel.name}</h3>
                                <p className="text-gray-600">{hotel.city}, {hotel.country}</p>
                                <p className="text-yellow-500">⭐ {hotel.stars} étoiles</p>
                                <p className="text-gray-500">{hotel.address}</p>

                                {/* Afficher les options */}
                                {hotel.options && (
                                    <p className="mt-2 text-sm text-gray-700">
                                        <span className="font-bold">Options :</span> {hotel.options}
                                    </p>
                                )}

                                {/* TripAdvisor Link */}
                                {hotel.tripAdvisorLink && (
                                    <a href={hotel.tripAdvisorLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block">
                                        Voir sur TripAdvisor
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
</>
);
};


export default HotelList;
