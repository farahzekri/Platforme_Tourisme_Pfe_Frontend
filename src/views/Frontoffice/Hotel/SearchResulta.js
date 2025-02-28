import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import IndexNavbar from "components/Navbars/IndexNavbar"
import image1 from "../../../assets/img/bg_5.jpg"
import SearchBar from 'components/serchBar';
import { FaStar } from "react-icons/fa";
const SearchResults = () => {
    const location = useLocation();

    console.log("📦 Données reçues :", location.state); // Vérifie si les hôtels sont bien reçus
    const hotels = location.state?.hotels || []
    return (
        <>
            <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100">
                {/* Section avec l'image de fond */}
                <div className="relative w-full h-96">
                    {/* Swiper avec autoplay, mais seulement une image */}
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full"
                    >
                        {/* Ici, on n'affiche qu'une seule image */}
                        <SwiperSlide>
                            <img
                                src={image1}
                                alt="Hotel"
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>

                    {/* Texte par-dessus l'image avec superposition sombre */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">
                        Resulta De Recherche
                    </div>
                </div>
                <SearchBar />
                <div className="flex mt-12">
                    {/* Section Filtrage vertical */}
                    <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg mr-6">
                        <h3 className="text-xl font-semibold mb-4">Filtres</h3>
                        {/* Ajoute tes filtres ici */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Pays</label>
                            <select className="w-full p-2 mt-1 border border-gray-300 rounded-md">
                                <option value="tunisia">Tunisie</option>
                                <option value="france">France</option>
                                <option value="spain">Espagne</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Prix</label>
                            <input type="range" min="0" max="1000" step="10" className="w-full" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Arrangement</label>
                            <select className="w-full p-2 mt-1 border border-gray-300 rounded-md">
                                <option value="petit déjeuner">Petit déjeuner</option>
                                <option value="demi pension">Demi pension</option>
                                <option value="pension complète">Pension complète</option>
                            </select>
                        </div>
                    </div>

                    {/* Section Résultats de la recherche */}
                    <div className="w-3/4">
                        <h2 className="text-2xl font-semibold mb-6">Résultats de recherche</h2>

                        {hotels.length === 0 ? (
                            <p>Aucun hôtel trouvé.</p>
                        ) : (
                            <div className="space-y-6">
                                {hotels.map((hotel, index) => (
                                    <div key={index} className="flex items-center p-4 bg-white shadow-lg rounded-lg">
                                        {/* Image de l'hôtel */}
                                        <img
                                            src={hotel.image}
                                            alt={hotel.hotel}
                                            className="w-32 h-32 object-cover rounded-lg mr-6"
                                        />
                                        {/* Informations sur l'hôtel */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800">{hotel.hotel}</h3>
                                            <p className="text-sm text-gray-800">{hotel?.city}, {hotel?.country}</p>

                                            {/* Affichage des étoiles */}
                                            <div className="flex items-center mt-2">
                                                {Array.from({ length: hotel.stars }, (_, i) => (
                                                    <FaStar key={i} className="text-gray-600" />
                                                ))}
                                               
                                            </div>

                                            <p className="mt-2 text-lg font-semibold text-gray-800">Prix Total: {hotel.prixTotal}TND</p>
                                            <p className="text-sm text-gray-600">Arrangement: {hotel.arrangement}</p>
                                        </div>

                                        {/* Bouton pour plus de détails */}
                                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors mt-4">
                                            Voir plus
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchResults;