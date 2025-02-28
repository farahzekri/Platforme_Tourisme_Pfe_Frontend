import "swiper/css";
import "swiper/css/autoplay";
import React, { Fragment, useState } from "react";
import { useDeleteHotel, useGetHotels } from "../../hooks/Hotel"; // Hook pour récupérer les hôtels
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import IndexNavbar from "components/Navbars/IndexNavbar"
import Loader from "views/Errorpages/loader";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import ConfirmationModal from "components/modal/confirmationModal";
const HotelList = () => {
    const { data: hotels, isLoading, error } = useGetHotels();
    const { mutate: deleteHotel } = useDeleteHotel();

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null); // État pour stocker l'hôtel à supprimer

    const handleDelete = (hotel) => {
        setSelectedHotel(hotel); // Stocke l'hôtel sélectionné
        setIsModalOpen(true); // Ouvre le modal
    };

    const confirmDelete = () => {
        if (selectedHotel) {
            deleteHotel(selectedHotel._id); // Supprime l'hôtel avec l'ID correct
            setIsModalOpen(false); // Ferme le modal après suppression
        }
    };

    if (isLoading) return <Loader />;
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
                                <p className={`font-semibold ${hotel.status === "active" ? "text-green-500" : "text-red-500"}`}>
                                    {hotel.status === "active" ? "✅ Active" : "❌ Inactive - Ajoutez une période"}
                                </p>
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
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Supprimer l'hôtel"
                    message={`Voulez-vous vraiment supprimer ${selectedHotel?.name} ?`}
                    confirmText="Oui, supprimer"
                    cancelText="Annuler"
                    animationDirection="fadeIn"
                />
            </div>
        </>
    );
};


export default HotelList;
