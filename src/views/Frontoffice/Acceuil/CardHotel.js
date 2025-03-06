import { FaMoneyBill, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const { useGetHotelsWithPrice } = require("views/hooks/periodehotel");
const CardsHotel = () => {
    const { data: hotels, isLoading, error } = useGetHotelsWithPrice();
    const navigate=useNavigate();
    if (isLoading) return <p className="text-center text-lg font-semibold">Chargement des hôtels...</p>;
    if (error) return <p className="text-center text-red-500">Erreur lors de la récupération des hôtels</p>;
    return (
        <>
            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-4xl font-bold text-center text-purple-700 mb-4">Les hôtels disponibles</h2>
                <p className="text-center text-gray-600 mb-8">Réservez maintenant votre hôtel en temps réel</p>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-x-12">
                    {hotels.map((hotel) => (
                        <div key={hotel._id} className="relative overflow-hidden rounded-xl shadow-xl bg-white w-full md:w-96 transform transition duration-300 hover:scale-105">
                            {/* Image de l'hôtel */}
                            {hotel.image && hotel.image.length > 0 ? (
                                <img src={hotel.image[0]} alt={hotel.name} className="w-full h-64 object-cover rounded-t-xl" />
                            ) : (
                                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded-t-xl">
                                    <span className="text-gray-500">Aucune image disponible</span>
                                </div>
                            )}

                            {/* Infos de l'hôtel */}
                            <div className="p-3">
                                <h3 className="text-2xl font-semibold text-purple-600">{hotel.name}</h3>

                                {/* Affichage des étoiles */}
                                <div className="flex items-center text-palette-jaun">
                                    {Array.from({ length: hotel.stars }).map((_, index) => (
                                        <FaStar key={index} />
                                    ))}
                                </div>

                                {/* Ville & Pays */}
                                <p className="text-gray-600 mt-2">{hotel.city}, {hotel.country}</p>

                              
                            </div>

                            {/* Section Prix */}
                            <div className="text-center mt-8 pb-8">
                                <p className="text-xl font-semibold text-gray-800 mb-6">
                                <span className="block text-sm text-gray-600 mb-2">par personne</span>
                                    <span className="text-green-600 mb-2 flex items-center justify-center">
                                        <FaMoneyBill className="mr-2" />
                                        <span>Dans le weekend à partir de {hotel.prixMinWeekend} TND</span>
                                    </span>
                                    

                                    <span className="text-blue-600 mb-2 flex items-center justify-center">
                                        <FaMoneyBill className="mr-2" />
                                        <span>Dans la semaine à partir de {hotel.prixMinWeekday} TND</span>
                                    </span>
                                   
                                </p>

                                <button className="mt-6 px-8 py-3 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition duration-300 ease-in-out"
                                      onClick={() => navigate(`/DetailHotel/${hotel.id}`)}
                                >
                                    Voir l'offre
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}
export default CardsHotel;