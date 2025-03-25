import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import IndexNavbar from "components/Navbars/IndexNavbar"
import image1 from "../../../assets/img/bg_5.jpg"
import SearchBar from 'components/serchBar';
import { FaStar } from "react-icons/fa";
import PriceRangeSlider from "../composant/inputRecherche/ranger";
import Footer from "components/Footers/Footer";
const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("📦 Données reçues :", location.state); // Vérifie si les hôtels sont bien reçus
    const { hotels, searchParams } = location.state || {};

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStars, setSelectedStars] = useState(null);
    const [selectedArrangements, setSelectedArrangements] = useState([]);
    const [selectedContract, setSelectedContract] = useState(null);
    const [budget, setBudget] = useState([0, 1500]);
    const [usePredefinedRanges, setUsePredefinedRanges] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const handleStarsChange = (e) => {
        setSelectedStars(parseInt(e.target.value));
    };

    // Gérer la sélection des types d'arrangement (checkboxes)
    const handleArrangementChange = (e) => {
        const { value, checked } = e.target;
        setSelectedArrangements((prev) =>
            checked ? [...prev, value] : prev.filter((arr) => arr !== value)
        );
    };
    const handleToggle = () => {
        setUsePredefinedRanges(!usePredefinedRanges);
        setSelectedRange(null); // Réinitialiser les checkboxes quand on bascule
    };

    // Gestion du choix de la plage
    const handleRangeChange = (range) => {
        setSelectedRange(range);
    };
    // Gérer la sélection du type de contrat (radio)
    const handleContractChange = (e) => {
        setSelectedContract(e.target.value);
    };

    // Filtrer les hôtels
    const filteredHotels = hotels.filter((hotel) => {
        return (
            (!searchTerm || hotel.hotel.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!selectedStars || hotel.stars === selectedStars) &&
            (selectedArrangements.length === 0 || selectedArrangements.some((arr) => hotel.arrangement.includes(arr))) &&
            (!selectedContract || hotel.Typecontract === selectedContract) &&
            hotel.prixTotal >= budget[0] &&
            hotel.prixTotal <= budget[1]
        );
    });
    const resetFilters = () => {
        setSearchTerm(""); 
        setSelectedStars(null); 
        setSelectedArrangements([]); 
        setSelectedContract(null); 
        setBudget([0, 105000]); 
        setUsePredefinedRanges(false); 
        setSelectedRange(null); 
    };
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
                <SearchBar initialData={searchParams} />
                <div className="flex mt-12">
                    {/* Section Filtrage vertical */}
                    <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg mr-6">


                        {/* Nom d'hôtel */}
                        <div className="mb-4">
                            <label className="block text-xl  font-medium text-gray-700 font-bold">Filtres par Nom d'hôtel</label>
                            <input
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                placeholder="Rechercher un hôtel..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <hr className="my-6 border-blueGray-300" />
                        {/* Étoiles */}
                        <div className="mb-4">
                            <label className="block text-xl  font-medium text-gray-700 font-bold">Filtres Par Nombre D'Étoiles</label>
                            <div className="flex flex-col space-y-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <label key={star} className="relative flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="sr-only peer"
                                            name="stars"
                                            value={star}
                                            checked={selectedStars === star}
                                            onChange={handleStarsChange}
                                        />
                                        <div
                                            className="w-6 h-6 bg-transparent border-2 border-palette-bleuclere rounded-full peer-checked:bg-palette-bleuclere peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"
                                        ></div>
                                        <span className="ml-2 text-gray-700">{star} étoiles</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="my-6 border-blueGray-300" />
                        {/* Type d'Arrangement */}
                        <div className="mb-4">
                            <label className="block text-xl  font-medium text-gray-700 font-bold">Filtres Par Type d'Arrangement</label>
                            <div className="mt-2">
                                {['Petit déjeuner', 'Demi-pension', 'Pension complète', 'All inclusive'].map((arr) => (
                                    <label
                                        key={arr}
                                        className="flex items-center px-3 py-2 gap-3 rounded-lg cursor-pointer hover:bg-gray-100 has-[:checked]:text-palette-bleuclere has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-300 has-[:checked]:ring-1"
                                    >
                                        <input
                                            type="checkbox"
                                            className="hidden peer"
                                            value={arr}
                                            checked={selectedArrangements.includes(arr)}
                                            onChange={handleArrangementChange}
                                        />
                                        <div className="w-5 h-5 border-2 border-palette-bleuclere rounded-md flex items-center justify-center peer-checked:bg-palette-bleuclere">
                                            {selectedArrangements.includes(arr) && (
                                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M9 17L4 12l1.5-1.5L9 14l9-9L19.5 6z"></path>
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-gray-700">{arr}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="my-6 border-blueGray-300" />
                        {/* Type de Contrat */}
                        <div className="mb-4">
                            <label className="block text-xl  font-medium text-gray-700 font-bold">Filtres Par Type de Contrat</label>
                            <div className="flex flex-col space-y-2 mt-2">
                                {['Réduction par âge d\'enfant', 'Non réduction par âge d\'enfant'].map((contract) => (
                                    <label key={contract} className="relative flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            className="sr-only peer"
                                            name="contract"
                                            value={contract}
                                            checked={selectedContract === contract}
                                            onChange={handleContractChange}
                                        />
                                        <div
                                            className="w-6 h-6 bg-transparent border-2 border-palette-bleuclere rounded-full peer-checked:bg-palette-bleuclere peer-checked:border-palette-bleuclere peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out"
                                        ></div>
                                        <span className="ml-2 text-gray-700">{contract}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <hr className="my-6 border-blueGray-300" />
                        {/* Budget */}
                        <div className="mb-4">
                            <label className="block text-xl  font-medium text-gray-700 font-bold">Filtres Par Budget</label>
                            <div className="relative flex items-center mb-2 space-x-2">
                                <label className="relative inline-block h-7 w-[48px] cursor-pointer rounded-full bg-palette-bleuclere transition has-[:checked]:bg-palette-bleuclere">
                                    <input type="checkbox" className="peer sr-only" onChange={handleToggle} />
                                    <span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full bg-gray-300 ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 peer-checked:bg-white peer-checked:ring-transparent"></span>
                                </label>
                                <span>Indiquer un budget personnalisé</span>
                            </div>
                            {/* Affichage en fonction du switch */}
                            {!usePredefinedRanges ? (
                                // PriceRangeSlider quand le switch est désactivé
                                <div>
                                    <PriceRangeSlider
                                        value={budget}
                                        onChange={(values) => setBudget(values)}
                                        min={0}
                                        max={105000}
                                    />
                                    <div className="flex justify-between text-sm text-gray-700 mt-2">
                                        <span>{budget[0]} TND</span>
                                        <span>{budget[1]} TND</span>
                                    </div>
                                </div>
                            ) : (
                                // Checkboxes quand le switch est activé
                                <div className="flex flex-col space-y-2 mt-2">
                                    {[
                                        { label: "400 - 1000 TND", value: [400, 1000] },
                                        { label: "1001 - 2000 TND", value: [1001, 2000] },
                                        { label: "2000 TND et plus", value: [2000, 105000] }
                                    ].map((range, index) => (
                                        <label key={index} className="relative flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                className="sr-only peer"
                                                name="budget-range"
                                                value={range.value}
                                                checked={selectedRange === range.value}
                                                onChange={() => handleRangeChange(range.value)}
                                            />
                                            <div className="w-6 h-6 bg-transparent border-2 border-palette-bleuclere rounded-full peer-checked:bg-palette-bleuclere peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"></div>
                                            <span className="ml-2 text-gray-700">{range.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                        <hr className="my-6 border-blueGray-300" />
                        <button
                            className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-200 transition"
                            onClick={resetFilters}
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>

                    {/* Section Résultats de la recherche */}
                    <div className="w-3/4">
                        <h2 className="text-2xl font-semibold mb-6">Résultats de recherche</h2>

                        {filteredHotels.length === 0 ? (
                            <p>Aucun hôtel trouvé.</p>
                        ) : (
                            <div className="space-y-6">
                                {filteredHotels.map((hotel, index) => (
                                    <div key={index} className="flex items-center p-6 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300">
                                        {/* Image de l'hôtel */}
                                        <img
                                            src={hotel.image}
                                            alt={hotel.hotel}
                                            className="w-40 h-40 object-cover rounded-xl mr-6"
                                        />

                                        {/* Informations sur l'hôtel */}
                                        <div className="flex-1">
                                            {/* Nom de l'hôtel et étoiles */}
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-2xl font-semibold text-gray-900">{hotel.hotel}</h3>
                                                <div className="flex">
                                                    {Array.from({ length: hotel.stars }, (_, i) => (
                                                        <FaStar key={i} className="text-palette-jaunFonce text-lg" />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-600">{hotel?.city}, {hotel?.country}</p>

                                            {/* Prix et Arrangement */}
                                            <p className="mt-3 text-lg font-semibold text-gray-900">Prix Total: <span className="text-orange-500">{hotel.prixTotal} TND</span></p>
                                            <p className="text-sm text-gray-600">Arrangement: {hotel.arrangement}</p>
                                        </div>

                                        <div className="flex justify-end mt-20">
                                            <button
                                                onClick={() => navigate(`/DetailHotel/${hotel.id}`)}
                                                className="bg-green-700 text-white px-5 py-3 rounded-lg hover:bg-green-300 transition duration-300 text-sm font-medium shadow-md">
                                                Detail & Tarif
                                            </button>
                                        </div>

                                    </div>

                                ))}

                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-10 pt-6">
                  <Footer />
                  </div>
        </>
    );
};

export default SearchResults;