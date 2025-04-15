import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTimesCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import image1 from "../../../assets/img/bg_5.jpg"; // remplace par ton image
import IndexNavbar from "components/Navbars/IndexNavbar";
import ReservationSummary from "./detailreservation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FailurePage = () => {
    const [reservationData, setReservationData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {


        const data = localStorage.getItem("reservationData");
        if (data) {
            setReservationData(JSON.parse(data));
        }
    }, []);
    return (
        <>
            <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100">
                <div className="relative w-full h-96">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img src={image1} alt="Hotel" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">
                        Paiement
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    <div className="col-span-2 flex justify-center items-center bg-gradient-to-br from-red-50 via-white to-red-100 rounded-xl shadow-xl p-10 h-full">
                        <div className="text-center p-10 bg-white rounded-3xl shadow-lg border border-red-400 w-full max-w-2xl animate-fade-in-up transition-all duration-700">
                            <svg
                                className="w-48 mx-auto mb-6  animate-pulse"
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="30" y="60" width="140" height="80" rx="12" fill="#f3f4f6" stroke="#f87171" strokeWidth="4" />
                                <rect x="45" y="75" width="40" height="10" rx="2" fill="#d1d5db" />
                                <rect x="45" y="90" width="110" height="10" rx="2" fill="#d1d5db" />


                                <line x1="40" y1="65" x2="160" y2="135" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />


                                <text x="100" y="165" textAnchor="middle" fill="#b91c1c" fontSize="14" fontWeight="bold">
                                    Paiement refusé
                                </text>
                            </svg>
                            <h2 className="text-2xl font-bold text-red-700 mb-4">Échec du paiement</h2>
                            <p className="text-gray-600 mb-6">
                                Une erreur est survenue lors du traitement de votre paiement.<br />
                                Veuillez réessayer ou utiliser un autre moyen de paiement.
                            </p>
                            <button
                                onClick={() => navigate(`/reservation`)}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow"
                            >
                                Réessayer
                            </button>
                        </div>
                    </div>
                    {reservationData && <ReservationSummary state={reservationData} />}
                </div>
            </div>
        </>
    );
};

export default FailurePage;
