import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import image1 from "../../../assets/img/bg_5.jpg"
import IndexNavbar from "components/Navbars/IndexNavbar";
import ReservationSummary from "./detailreservation";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SuccessPage = () => {
    const { state } = useLocation();
    const [reservationData, setReservationData] = useState(null);


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
                    <div className="col-span-2 flex justify-center items-center bg-gradient-to-br from-green-100 via-white to-green-100 rounded-2xl ml-20 shadow-xl p-10 h-full">
                        <div className="bg-white text-center p-10 rounded-3xl shadow-lg border border-green-800 max-w-2xl w-full mx-auto animate-fade-in-up transition-all duration-700">
                            <div className="flex justify-center mb-6">
                                <FaCheckCircle className="text-6xl text-green-800 animate-pulse drop-shadow-lg" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-700 mb-4">Merci pour votre paiement !</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Votre réservation a bien été <span className="font-semibold text-green-700">confirmée</span>.<br />
                                Vous recevrez un <span className="font-semibold">email de confirmation</span> sous peu.
                            </p>
                        </div>
                    </div>
                    {reservationData && <ReservationSummary state={reservationData} />}
                </div>
            </div>
        </>
    );
};

export default SuccessPage;
