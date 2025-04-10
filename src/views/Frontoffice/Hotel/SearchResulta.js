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
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
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
        setBudget(range);
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
            (selectedArrangements.length === 0 ||
                (Array.isArray(hotel.arrangement) && selectedArrangements.some((arr) => hotel.arrangement.includes(arr)))) &&
            (!selectedContract || hotel.Typecontract === selectedContract) &&
            hotel.prixTotal >= budget[0] && hotel.prixTotal <= budget[1]
        );
    });
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 4; // Nombre d'hôtels affichés par page

    // Calcul des indices des hôtels à afficher
    const indexOfLastHotel = currentPage * hotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
    const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel);

    // Nombre total de pages
    const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedStars(null);
        setSelectedArrangements([]);
        setSelectedContract(null);
        setBudget([0, 105000]);
        setUsePredefinedRanges(false);
        setSelectedRange(null);
    };
    const handleRedirectToTarif = (hotelId) => {
        navigate(`/TarifDisponiblite/${hotelId}`, {
            state: {
                dateDebut: searchParams.dateDebut,
                dateFin: searchParams.dateFin,
                country: searchParams.country,
                city: searchParams.city,
                adulte: searchParams.adultes,
                enfant: searchParams.enfants,
                agesEnfant: searchParams.agesEnfants,
            },
        });
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
                                {['petit déjeuner', 'demi-pension', 'pension complète', 'all inclusive'].map((arr) => (
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
                                {['Réduction par age d\'enfant', 'Non réduction par âge d\'enfant'].map((contract) => (
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
                                                value={JSON.stringify(range.value)}  // Convertir en chaîne pour éviter le problème de référence
                                                checked={JSON.stringify(selectedRange) === JSON.stringify(range.value)}
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
                            <p className="text-center text-gray-600 text-lg">Aucun hôtel trouvé.</p>
                        ) : (
                            <div className="space-y-6">
                                {currentHotels.map((hotel, index) => {
                                    let label, labelStyle;

                                    if (hotel.averageRating === 0) {
                                        label = "Pas encore noté";
                                        labelStyle = "bg-[#fb923c] text-white animate-pulse ";
                                    } else if (hotel.averageRating >= 3 && hotel.averageRating < 4) {
                                        label = "Pas mal";
                                        labelStyle = "bg-[#3b82f6] text-white";
                                    } else if (hotel.averageRating >= 4) {
                                        label = "🔥 Top choix";
                                        labelStyle = "bg-[#22c55e] text-white font-bold";
                                    }
                                    const optionsList = (hotel.options && hotel.options.length > 0)
                                        ? hotel.options.split(",").map(option => option.trim())
                                        : [];
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative"
                                        >
                                            {/* Image à gauche avec Label stylisé */}
                                            <div className="relative">
                                                <img
                                                    src={hotel.image}
                                                    alt={hotel.hotel}
                                                    className="w-[250px] h-[250px] object-cover rounded-l-xl"
                                                />
                                                <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm ${labelStyle}`}>
                                                    {label}
                                                </span>
                                            </div>

                                            {/* Contenu à droite */}
                                            <div className="p-4 flex-1">
                                                {/* Nom et étoiles */}
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-gray-900">{hotel.hotel}</h3>
                                                    <div className="flex">
                                                        {Array.from({ length: hotel.stars }, (_, i) => (
                                                            <FaStar key={i} className="text-palette-jaunFonce text-lg" />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Localisation */}
                                                <p className="text-sm text-gray-500">
                                                    {hotel.city}, {hotel.country}
                                                </p>

                                                {/* Prix et Arrangement */}

                                                {optionsList.length > 0 && (
                                                    <div className="mt-2 space-x-2">
                                                        <p className="text-sm mb-4 font-semibold text-gray-600">Services supplémentaires:</p>
                                                        {optionsList.map((option, i) => (
                                                            <span
                                                                key={i}
                                                                className="px-3  py-1 text-sm font-semibold text-gray-900 rounded-full bg-palette-jaunClair cursor-pointer hover:bg-palette-jaunFonce hover:text-lg transition"
                                                                onClick={() => navigate(`/DetailHotel/${hotel.id}`)}
                                                            >
                                                                {option}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-lg font-semibold text-gray-900 text-right mb-2">
                                                    Prix Total: <span className="text-orange-500 text-2xl font-bold">{hotel.prixTotal} TND</span>
                                                </p>
                                                {/* Bouton */}

                                                <div className="mt-3 flex justify-between">
                                                    <button
                                                        onClick={() => navigate(`/DetailHotel/${hotel.id}`)}
                                                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm font-medium shadow-md"
                                                    >
                                                        Voir Détails
                                                    </button>

                                                    <button
                                                        onClick={() => handleRedirectToTarif(hotel.id)}
                                                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 text-sm font-medium shadow-md"
                                                    >
                                                        Chambre & Tarifs
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        <div className="flex justify-center mt-8 space-x-2">
                            {/* Bouton Précédent */}
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-2 rounded-full border bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
                            >
                                <FaChevronLeft />
                            </button>

                            {/* Numéros de pages */}
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 rounded-full border ${currentPage === index + 1 ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-gray-300"} transition`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            {/* Bouton Suivant */}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 rounded-full border bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
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