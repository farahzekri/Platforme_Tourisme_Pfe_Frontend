import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import image1 from "../../../assets/img/bg_5.jpg"
import CardRecherche from "../composant/cardRecherche";
import GoogleMapCard from "../composant/cardmaps";
import { useAddReview } from "views/hooks/Reveiw";
import { useState } from "react";
import { useGetHotelsbyidWithPrice } from "views/hooks/periodehotel";
import NavTabs from "../composant/Navtable";
import { FaAngry, FaComments, FaFrown, FaGrinStars, FaMeh, FaRegStar, FaSmile, FaStar, FaStarHalfAlt, FaTripadvisor } from "react-icons/fa";
import Alert from "../composant/Alert";
const Review = () => {
    const { id } = useParams();
    const { data: hotelDetails, isLoading, error } = useGetHotelsbyidWithPrice(id);
    const { data: hotel, isLoadinghotel, errorl } = useGethotelbyidhotel(id);
    const [rating, setRating] = useState(null);
    const [alert, setAlert] = useState(null);
    const [formData, setFormData] = useState({
        cleanlinessArrival: "",
        regularCleaning: "",
        staffProfessionalism: "",
        requestHandling: "",
        roomService: "",
        restaurantCleanliness: "",
        priceQuality: "",
        comment: "",
    });

    const addReview = useAddReview(); // Hook pour envoyer les données

    if (isLoadinghotel) return <p>Chargement...</p>;
    if (errorl) return <p>Erreur</p>;

    const handleRatingChange = (question, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [question]: value, // Dynamically update the correct field in formData
        }));
    };
    const handleCommentChange = (e) => {
        setFormData({
            ...formData,
            comment: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Données envoyées:', { hotelId: id, ...formData }); // Vérifiez ce qui est envoyé
        try {
            await addReview.mutateAsync({ hotelId: id, reviewData: formData });
            setAlert({ type: "success", message: "Votre avis a été soumis avec succès!" });
            setFormData({
                cleanlinessArrival: "",
                regularCleaning: "",
                staffProfessionalism: "",
                requestHandling: "",
                roomService: "",
                restaurantCleanliness: "",
                priceQuality: "",
                comment: "",
            });
        } catch (error) {
            setAlert({ type: "error", message: "Un problème est survenu lors de l'envoi de votre avis. Veuillez réessayer." });
            console.error('Erreur lors de l\'envoi:', error);
        }
    };
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-palette-jaun text-xl" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-palette-jaun text-xl" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-palette-jaun text-xl" />);
            }
        }
        return stars;
    };
    const ratings = [
        { value: 1, label: "Mauvais", icon: <FaAngry className="text-[#D32F2F] text-3xl" /> },
        { value: 2, label: "Passable", icon: <FaFrown className="text-[#FF6D00] text-3xl" /> },
        { value: 3, label: "Moyen", icon: <FaMeh className="text-[#FFD600] text-3xl" /> },
        { value: 4, label: "Bien", icon: <FaSmile className="text-[#4CAF50] text-3xl" /> },
        { value: 5, label: "Très bien", icon: <FaGrinStars className="text-[#8E24AA] text-3xl" /> },
    ];
    return (
        <>
            <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100  pt-16">
            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
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
                        Avis Client
                    </div>
                </div>
                <div className="grid md:grid-cols-5 gap-2 mt-2">
                    <div className="md:col-span-1 flex flex-col gap-5">
                        {/* Carte de recherche */}
                        <CardRecherche hotel={hotelDetails} />

                        {/* Carte Google Map */}
                        <GoogleMapCard hotel={hotelDetails} />
                    </div>
                    <div className="md:col-span-3 bg-white p-5 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
                            <FaComments className="text-blue-600" />
                            Avis des visiteurs
                        </h2>
                        <div className="flex flex-wrap justify-between gap-6">
                            {/* Carte Expérience globale */}
                            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-[#eaebb1] to-palette-jaunClair text-gray-900 rounded-lg shadow-lg w-full md:w-[48%] transition-transform transform hover:scale-105">
                                <div>
                                    <p className="text-xl font-semibold flex items-center gap-2">
                                        <FaStar className="text-yellow-500" />
                                        Expérience globale
                                    </p>
                                    <p className="text-sm text-gray-700">Ce que pensent les visiteurs de cet hôtel</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-4xl font-bold text-blue-700">{hotel?.averageRating || "No Note"}/10</p>
                                    <div className="flex justify-center mt-2">{renderStars(hotel?.averageRating / 2)}</div>
                                </div>
                            </div>

                            {/* Section TripAdvisor */}
                            <div className="p-6 bg-gradient-to-r from-palette-jaunClair to-[#eaebb1] text-gray-900 rounded-lg shadow-lg text-center w-full md:w-[48%] transition-transform transform hover:scale-105">
                                <p className="text-xl font-semibold text-blue-700 flex items-center justify-center gap-2">
                                    <FaTripadvisor className="text-green-600" />
                                    Consultez plus d'avis sur TripAdvisor !
                                </p>
                                {hotel?.tripAdvisorLink && (
                                    <a
                                        href={hotel.tripAdvisorLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 px-5 py-3 bg-palette-jaunFonce text-white font-semibold rounded-lg shadow-md hover:bg-palette-jaun transition"
                                    >
                                        Voir sur TripAdvisor
                                    </a>
                                )}
                            </div>
                        </div>




                        {/* Formulaire d'ajout d'avis */}
                        <div className="mt-6 p-5 bg-gray-100 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 text-center flex items-center justify-center gap-2 mb-4">
                                Donne ton avis !
                            </h2>
                            <p className="text-gray-600 text-center mb-4">
                                Réponds à ce formulaire pour donner ton avis sur l'hôtel. Choisis une note de <strong>1 à 5</strong> :
                                <br /> <span className="text-red-500 font-semibold">1 = Mauvais</span>, <span className="text-green-500 font-semibold">5 = Très bien</span>.
                            </p>

                            {/* Formulaire */}
                            <form className="space-y-4 pt-6">
                                {/* Sélecteur de Note */}
                                <p className="text-center text-xl  "> La chambre était-elle propre à votre arrivée ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="cleanlinessArrival"
                                                value={item.value}
                                                checked={formData.cleanlinessArrival === item.value}
                                                onChange={() => handleRatingChange("cleanlinessArrival", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.cleanlinessArrival === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-center text-xl  ">Le ménage est-il fait régulièrement et correctement ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="regularCleaning"
                                                value={item.value}
                                                checked={formData.regularCleaning === item.value}
                                                onChange={() => handleRatingChange("regularCleaning", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.regularCleaning === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                              
                                <p className="text-center text-xl  ">Le personnel était-il accueillant et professionnel ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="staffProfessionalism"
                                                value={item.value}
                                                checked={formData.staffProfessionalism === item.value}
                                                onChange={() => handleRatingChange("staffProfessionalism", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.staffProfessionalism  === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-center text-xl  ">Les demandes ont-elles été prises en compte rapidement ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="requestHandling"
                                                value={item.value}
                                                checked={formData.requestHandling === item.value}
                                                onChange={() => handleRatingChange("requestHandling", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.requestHandling === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-center text-xl  ">Le service en chambre était-il efficace ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="roomService"
                                                value={item.value}
                                                checked={formData.roomService === item.value}
                                                onChange={() => handleRatingChange("roomService", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.roomService === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-center text-xl  ">La propreté du restaurant et des couverts était-elle satisfaisante ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="restaurantCleanliness"
                                                value={item.value}
                                                checked={formData.restaurantCleanliness === item.value}
                                                onChange={() => handleRatingChange("restaurantCleanliness", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.restaurantCleanliness === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-center text-xl  "> Le prix payé est-il justifié par la qualité du service et des prestations ?</p>
                                <div className="flex justify-center gap-4">
                                    
                                    {ratings.map((item) => (
                                        <label key={item.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="priceQuality"
                                                value={item.value}
                                                checked={formData.priceQuality === item.value}
                                                onChange={() => handleRatingChange("priceQuality", item.value)}
                                                className="hidden"
                                            />
                                            <div
                                                className={`p-3 rounded-full transition ${formData.priceQuality === item.value ? "bg-palette-jaunClair scale-110 shadow-lg" : "bg-gray-200 hover:bg-palette-jaunClair"
                                                    }`}
                                            >
                                                {item.icon}
                                            </div>
                                            <span className="mt-1 text-sm font-semibold">{item.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {/* Champ de Commentaire */}
                                <div>
                                    <label className="block text-gray-700 font-semibold">Si vous avez autre chose à ajouter, écrivez-le ici</label>
                                    <textarea 
                                    className="w-full p-2 border rounded-lg shadow-sm" 
                                    rows="4" 
                                    placeholder="Écris ton avis ici..."
                                    name="comment"
                                    value={formData.comment}
                                    onChange={(e) => handleCommentChange(e)}
                                    ></textarea>
                                </div>

                                {/* Bouton Soumettre */}
                                <div className="text-center">
                                    <button type="submit" onClick={handleSubmit} className="px-6 py-3  text-white font-semibold rounded-lg shadow-md transition-colors text-[#7C2D12] hover:text-[#FDBA74] bg-[#FDBA74] hover:bg-[#7C2D12]">
                                        Envoyer mon avis
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className="md:col-span-1">
                        <div className="mt-5">
                            <NavTabs hotel={hotelDetails} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Review;