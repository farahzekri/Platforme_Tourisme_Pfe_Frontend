import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import image1 from "../../../assets/img/bg_5.jpg"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetHotelsbyidWithPrice } from "views/hooks/periodehotel";
import CardRecherche from "../composant/cardRecherche";
import GoogleMapCard from "../composant/cardmaps";
import NavTabs from "../composant/Navtable";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { FaCalendarAlt, FaInfoCircle, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { arrangementOptions, supplementsOptions } from "./fichierdonne";

const DetailHotel = () => {
    const { id } = useParams();
    console.log("Hotel ID récupéré:", id);
    const { data: hotelDetails, isLoading, error } = useGetHotelsbyidWithPrice(id);
    const [isWeekend, setIsWeekend] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = hotelDetails?.images || [];

    useEffect(() => {
        // Vérifier si c'est le week-end
        const today = new Date();
        const day = today.getDay();
        // Si c'est samedi (6) ou dimanche (0), c'est le week-end
        setIsWeekend(day === 0 || day === 6);
    }, []);

    const handleNext = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    if (isLoading) return <p className="text-center text-gray-500">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">Erreur: {error.message}</p>;
    if (!hotelDetails) return <p className="text-center text-gray-500">Aucun détail disponible.</p>;
    return (
        <>
            <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100">
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
                        Detail de l'hotel
                    </div>
                </div>

                <div className="grid md:grid-cols-5 gap-2 mt-2">
                    {/* Colonne de gauche (Carte de recherche et Google Maps) */}
                    <div className="md:col-span-1 flex flex-col gap-5">
                        {/* Carte de recherche */}
                        <CardRecherche hotel={hotelDetails} />

                        {/* Carte Google Map */}
                        <GoogleMapCard hotel={hotelDetails} />
                    </div>

                    {/* Colonne du milieu (Détails de l'hôtel - plus grande) */}
                    <div className="md:col-span-3 bg-white p-5 rounded-lg shadow-lg">
                        {/* Détails de l'hôtel */}
                        <div className="flex justify-between items-center">
                            {/* Nom de l'hôtel agrandi */}
                            <h2 className="text-3xl font-bold">{hotelDetails?.name}</h2>

                            {/* Étoiles alignées à côté du nom */}
                            <div className="flex items-center text-2xl text-palette-jaun mr-86">  {/* Espacement ajouté entre le nom et les étoiles */}
                                {Array.from({ length: hotelDetails?.stars }).map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                            </div>
                        </div>

                        {/* City and Country */}
                        <p className="text-gray-700 mt-2">📍 {hotelDetails?.city}, {hotelDetails?.country}</p>

                        {/* Prix Min Weekend */}

                        {/* Détails de l'hôtel */}
                        <div className="flex justify-end text-2xl items-center mt-2">
                            <p className="text-green-600 font-bold">
                                {isWeekend ? `${hotelDetails?.prixMinWeekend}` : `${hotelDetails?.prixMinWeekday}`} TND
                            </p>
                        </div>


                        {/* Image avec boutons de navigation */}
                        <div className="relative mt-3">
                            {/* Image */}
                            <img
                                src={images[currentImageIndex]}
                                alt={hotelDetails?.name}
                                className="w-full h-80 object-cover rounded-lg"
                            />
                            {/* Previous Button */}
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3">
                                <button
                                    onClick={handlePrev}
                                    className={`text-white bg-black rounded-full p-2 ${currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentImageIndex === 0}
                                >
                                    {"<"}
                                </button>
                            </div>
                            {/* Next Button */}
                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3">
                                <button
                                    onClick={handleNext}
                                    className={`text-white bg-black rounded-full p-2 ${currentImageIndex === images.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                                    disabled={currentImageIndex === images.length - 1}
                                >
                                    {">"}
                                </button>
                            </div>
                        </div>
                        <div className="mt-5 p-5 bg-white rounded-lg shadow-md">
                            {/* Arrangements */}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold">Arrangements</h3>
                                <ul className="grid grid-cols-2 gap-4">
                                    {hotelDetails?.arrangement?.map((arrangement, index) => {
                                        // Chercher l'option correspondant à l'arrangement
                                        const arrangementOption = arrangementOptions.find(option => option.value === arrangement);
                                        return (
                                            arrangementOption && (
                                                <li key={index} className="flex items-center text-gray-700">
                                                    <span className="mr-2">{arrangementOption.icon}</span>
                                                    <span>{arrangementOption.label}</span>
                                                </li>
                                            )
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Suppléments */}
                            <div>
                                <h3 className="text-xl font-semibold mb-3">Suppléments</h3>
                                <ul className="grid grid-cols-2 gap-4">
                                    {hotelDetails?.supplements?.map((supplement, index) => {
                                        // Chercher l'option correspondant au supplément
                                        const supplementOption = supplementsOptions.find(option => option.value === supplement);
                                        return (
                                            supplementOption && (
                                                <li key={index} className="flex items-center text-gray-700">
                                                    <span className="mr-2">{supplementOption.icon}</span>
                                                    <span>{supplementOption.label}</span>
                                                </li>
                                            )
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-5 p-4 bg-palette-bleuClair border-l-4 border-blue-500 text-gray-800 rounded-md">
                            <div className="flex items-center">
                                <FaInfoCircle className="text-blue-500 mr-2" />
                                <h4 className="font-semibold text-blue-500 text-lg">Pourquoi choisir {hotelDetails?.name} ?</h4>
                            </div>
                            <p className="text-md mt-2">Profitez d'une expérience inoubliable dans un hôtel {hotelDetails?.stars} étoiles en {hotelDetails?.country}. Offrant une vue imprenable et des équipements de luxe, {hotelDetails?.name} est l'endroit parfait pour vos vacances. Réservez maintenant pour garantir votre séjour dans un cadre paradisiaque !</p>
                        </div>

                        {/* Politique d'annulation gratuite */}
                        <div className="mt-5 p-4 bg-palette-jaunClair border-l-4 border-palette-jaun text-gray-800 rounded-md">
                            <div className="flex items-center">
                                {/* Icône jaune à gauche */}
                                <span className="mr-2 text-palette-jaunFonce">
                                    <FaCalendarAlt />
                                </span>
                                <h4 className="font-semibold text-lg text-palette-jaunFonce">Annulation Gratuite</h4>
                            </div>
                            <p className="text-md mt-2">
                                Vous avez réservé ? Pas de soucis ! Si vous changez d'avis, vous pouvez annuler votre réservation gratuitement jusqu'à <strong>{hotelDetails?.delai_annulation} jours</strong> avant la date d'arrivée. Ne laissez rien au hasard, réservez en toute tranquillité.
                            </p>
                        </div>
                    </div>


                    {/* Colonne de droite (Navigation des onglets - petite) */}
                    <div className="md:col-span-1">
                        <div className="mt-5">
                            <NavTabs hotel={hotelDetails} />
                        </div>
                    </div>
                </div>

            </div>

        </>)
}
export default DetailHotel;