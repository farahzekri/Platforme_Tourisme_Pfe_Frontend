import Card from "components/Cards/simplecard";
import { FaMapMarkerAlt, FaPhone, FaStar, FaLink, FaBuilding, FaConciergeBell } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button/button";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default function HotelDetails() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const { data: hotel, isLoading, error } = useGethotelbyidhotel(id);
    const navigate = useNavigate();
    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <div className="max-w-xxl  mx-auto p-6 mt-16 pt-12 bg-gray-50 rounded-lg shadow-md">
             <Button
                onClick={() => navigate("/Daschbordb2b/ListeHotel")}
                icon={faLeftLong}
                label="Retourn"
                bgColor="bg-palette-orange"
                hoverBgColor="hover:bg-palette-orangefonce"
                textColor="text-white"
            />
            <Card title={`Détails de l'hôtel: ${hotel?.name}`}>
           
                {/* Informations générales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoRow icon={<FaBuilding className="text-blue-500" />} label="Nom" value={hotel?.name} />
                    <InfoRow icon={<FaMapMarkerAlt className="text-red-500" />} label="Pays" value={hotel?.country} />
                    <InfoRow icon={<FaMapMarkerAlt className="text-red-500" />} label="Ville" value={hotel?.city} />
                    <InfoRow icon={<FaStar className="text-yellow-500" />} label="Étoiles" value={hotel?.stars} />
                    <InfoRow icon={<FaConciergeBell className="text-green-500" />} label="Type de contrat" value={hotel?.Typecontract} />
                    <InfoRow label="Âge min/max enfant" value={`${hotel?.minChildAge} - ${hotel?.maxChildAge} ans`} />
                    <InfoRow icon={<FaMapMarkerAlt className="text-purple-500" />} label="Adresse" value={hotel?.address} />
                    {hotel?.tripAdvisorLink && (
                        <InfoRow icon={<FaLink className="text-blue-500" />} label="TripAdvisor" value={
                            <a href={hotel.tripAdvisorLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Voir sur TripAdvisor</a>
                        } />
                    )}
                </div>

                {/* Options & Catégories enfants */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Options :</h3>
                    <p className="text-gray-600">{hotel?.options || "Aucune option disponible"}</p>

                    <h3 className="text-lg font-bold mt-2">Catégories enfants :</h3>
                    <p className="text-gray-600">{hotel?.childrenCategories || "Non spécifié"}</p>
                </div>

                {/* Disponibilité des chambres */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2">Disponibilité des chambres :</h3>
                    {hotel?.roomAvailability ? (
                        <ul className="list-disc list-inside space-y-1">
                            {Object.entries(hotel.roomAvailability).map(([roomType, availability], index) => (
                                <li key={index} className="text-gray-700">
                                    {roomType}: {availability} disponibles
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Aucune information sur la disponibilité des chambres.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
        {icon && <div className="mr-3 text-lg">{icon}</div>}
        <div>
            <span className="font-medium text-gray-700">{label} :</span>
            <p className="text-gray-600 ml-2">{value}</p>
        </div>
    </div>
);