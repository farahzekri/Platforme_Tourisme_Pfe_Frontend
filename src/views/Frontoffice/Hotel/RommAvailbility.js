import React, { useEffect, useState } from "react";
import { useGetHotelAvailability } from "../../hooks/periodehotel";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import { FaPerson } from "react-icons/fa6";
import { FaBed, FaCheckCircle, FaChild, FaMoneyBillWave, FaRegCalendarCheck, FaUser, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HotelAvailability = ({ id, dateArrivee, dateDepart, adultes, enfants ,agesEnfants}) => {
    const [arrangement, setArrangement] = useState('');
    const [suppléments, setSuppléments] = useState([]);
    const { data, isLoading, error } = useGetHotelAvailability(id, dateArrivee, dateDepart, adultes, enfants, arrangement, suppléments,agesEnfants);
    const { data: hotel, isLoadinghotel, errorl } = useGethotelbyidhotel(id);
    const navigate=useNavigate();
    console.log("Données reçues dans le composant :", data);

    const [prixTotal, setPrixTotal] = useState(null);
    useEffect(() => {
        if (hotel && hotel.arrangement && hotel.arrangement.length > 0) {
            const defaultArrangement = hotel.arrangement.includes("petit déjeuner")
                ? "petit déjeuner"
                : hotel.arrangement[0];
            setArrangement(defaultArrangement);
        }
    }, [hotel]);
    useEffect(() => {
        if (data && data.chambresDisponibles && data.chambresDisponibles.length > 0) {
            setPrixTotal(data.chambresDisponibles[0].prix); // Met à jour le prix total
        }
    }, [data]);
    // Gérer le changement de sélection d'arrangement
    const handleArrangementChange = (e) => {
        setArrangement(e.target.value);
    };

    // Gérer le changement des suppléments sélectionnés
    const handleSupplementChange = (e) => {
        const value = e.target.value;
        setSuppléments((prev) =>
            e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };
    const handleReserveClick = () => {
        const selectedRoom = data?.chambresDisponibles?.[0]; // ou autre logique pour choisir une chambre
        navigate(`/reservation/${id}`, {
          state: {
            hotelId: id,
            dateArrivee,
            dateDepart,
            arrangement,
            suppléments,
            adultes,
            enfants,
            agesEnfants,
            prixTotal: selectedRoom?.prix || 0,
            nbNuits:selectedRoom?.nbNuits,
            roomType: selectedRoom?.type || "",
            hotelName: hotel?.name || "",
            hotelImage: hotel?.image[0] || "",
            hotelCountry: hotel?.country || "",
            hotelCity: hotel?.city || "",
            hoteladdress: hotel?.address || "",
            hotelStarts: hotel?.stars || 0,
          }
        });
      };
    if (isLoading) return <p>Chargement des disponibilités...</p>;
    if (error) return <p>Erreur: {error.message}</p>;
    if (!data || !data.chambresDisponibles || data.chambresDisponibles.length === 0) {
        return (
            <div className="flex justify-center mt-6">
              <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-md max-w-md">
                <h4 className="text-lg font-semibold">❌ Aucune chambre disponible</h4>
                <p className="text-sm mt-1">
                  Nous sommes désolés, mais il n’y a plus de chambres disponibles pour les dates sélectionnées.
                </p>
                <p className="text-sm mt-1">
                  📅 Essayez de modifier vos dates ou consultez d’autres hôtels.
                </p>
              </div>
            </div>
          );
    }

    return (

        <div>

            {data.chambresDisponibles.map((chambre, index) => (
                <div
                    className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 ml-20 h-auto items-center rounded-2xl bg-white [box-shadow:var(--shadow)]  max-w-[800px]"
                >
                    <div
                        className="flex flex-col items-center justify-between pt-9 px-6 pb-6 relative"
                    >
                       



                        <div className="relative mx-auto -mt-16 mb-8 flex flex-col items-center justify-center">
                            {/* Cadre circulaire pour l'icône */}
                            <div className="w-20 h-20 flex items-center justify-center rounded-full border-4 border-[#a7ebcf] bg-white shadow-lg">
                                <FaBed className="text-3xl text-[#014737]" />
                            </div>
                            {/* Titre sous l'icône */}
                            <h3 className="mt-2 text-lg font-semibold text-gray-800">
                                Chambre {chambre.type}
                            </h3>
                        </div>
                        <p className="text-center text-sm text-gray-600 mt-2">
                            <FaCheckCircle className="inline text-green-500 mr-1" />
                            Chambres disponibles : <span className="font-bold text-teal-600">{chambre.dispo}</span>
                        </p>
                        <div className="flex items-center justify-center mt-4">
                            <FaMoneyBillWave className="text-green-500 text-xl mr-2" />
                            <span className="text-lg font-bold text-gray-700">{chambre.prix} TND </span>
                        </div>
                        <div className="mt-4">
                            <h5 className="text-sm font-semibold text-gray-700 flex items-center">
                                <FaUsers className="text-indigo-500 text-xl mr-2" />
                                Occupation :
                            </h5>
                            <div className="flex justify-center space-x-2 mt-2">
                                {Array(adultes).fill(null).map((_, i) => (
                                    <FaPerson key={`adult-${i}`} className="ml-1 text-[#634647]" />
                                ))}
                                {Array(enfants).fill(null).map((_, i) => (
                                    <FaChild key={`child-${i}`} className="ml-1 text-[#ddad81]" />
                                ))}
                            </div>

                        </div>

                        <button
                            class="mb-2 text-sm mr-auto text-zinc-600 cursor-pointer font-semibold transition-colors hover:text-[#634647] hover:underline underline-offset-2"
                            onClick={() => setArrangement((prev) => (prev === '' ? chambre.type : ''))}
                        >
                            {arrangement ? "Moins d'options" : "Plus d'options"}
                        </button>
                        <button
                            className="absolute flex items-center  font-semibold right-6 bottom-6 cursor-pointer py-2 px-8 w-max break-keep text-sm rounded-lg transition-colors text-[#7C2D12] hover:text-[#FDBA74] bg-[#FDBA74] hover:bg-[#7C2D12]"
                            type="button"
                            onClick={handleReserveClick}
                        >
                            <FaRegCalendarCheck  className="mr-2"/>
                            Réserver
                        </button>
                        {arrangement && (
                            <div className="w-full mt-4">
                                {/* Sélecteur d'arrangement */}
                                <div>
                                    <label htmlFor="arrangement" className="block text-sm font-semibold">
                                        Arrangements :
                                    </label>
                                    <select
                                        id="arrangement"
                                        value={arrangement}
                                        onChange={handleArrangementChange}
                                        className="w-full p-2 mt-2 border rounded"
                                    >
                                        {hotel && hotel.arrangement && hotel.arrangement.length > 0 ? (
                                            hotel.arrangement.map((arrangement, index) => (
                                                <option key={index} value={arrangement}>
                                                    {arrangement}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>Aucun arrangement disponible</option>
                                        )}
                                    </select>
                                </div>

                                {/* Sélection des suppléments */}
                                <div className="mt-4">
                                    <h5 className="text-sm font-semibold">Suppléments :</h5>

                                    {hotel?.supplements?.length > 0 ? (
                                        <div className="flex flex-wrap gap-4">
                                            {hotel.supplements.map((supplement, index) => (
                                                <label
                                                    key={index}
                                                    className="relative flex cursor-pointer items-center space-x-3 rounded-lg  px-4 py-2 transition duration-300 ease-in-out hover:bg-teal-50"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`supplement-${index}`}
                                                        name={supplement}
                                                        value={supplement}
                                                        checked={suppléments.includes(supplement)}
                                                        onChange={handleSupplementChange}
                                                        className="peer hidden"
                                                    />
                                                    {/* Custom checkbox */}
                                                    <div className="relative flex h-6 w-6 items-center justify-center rounded-md border-2 border-teal-500 bg-white peer-checked:bg-[#a7ebcf] peer-checked:border-[#a7ebcf]">
                                                        <svg
                                                            className="h-4 w-4 text-palette-bleufonce opacity-0 transition duration-200 peer-checked:opacity-100"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414L8 15.414l-4.707-4.707a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <span className="text-teal-700 font-medium">{supplement}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">Aucun supplément disponible</p>
                                    )}
                                </div>

                                <p className="mt-9"><strong>Prix total:</strong> {prixTotal ? `${prixTotal}TND` : "Calcul en cours..."}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>


    );
};

export default HotelAvailability;