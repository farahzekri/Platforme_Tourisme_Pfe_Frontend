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
import autoTable from "jspdf-autotable";
import logo from "../../../assets/img/hubs-logo.jpg"
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
const SuccessPage = () => {
    const { state } = useLocation();
    const [reservationData, setReservationData] = useState(null);


    useEffect(() => {


        const data = localStorage.getItem("reservationData");
        if (data) {
            setReservationData(JSON.parse(data));
        }
    }, []);

    const handleDownloadVoucher = () => {
        const doc = new jsPDF();

        const today = new Date().toLocaleDateString();

        // 1. LOGO + HEADER
        doc.addImage(logo, "PNG", 15, 10, 40, 20);
        doc.setFontSize(16);
        doc.text("Hubs Travel - Voucher de Réservation", 60, 25); // un peu plus bas

        // Date à droite, en haut
        doc.setFontSize(10);
        doc.text(`Tunis, le ${today}`, 195, 15, { align: "right" }); // bien en haut à droite

        doc.line(15, 35, 195, 35); // séparation

        // 2. INFOS RÉSERVATION
        doc.setFontSize(12);
        doc.text(`Hôtel : ${reservationData.hotelName} (${reservationData.hotelCity})`, 20, 45);
        doc.text(
            `Bénéficiaires : ${reservationData.adultes} adulte(s), ${reservationData.enfants} enfant(s)`,
            20,
            55
        );
        doc.text(`Arrivée : ${reservationData.dateArrivee}`, 20, 65);
        doc.text(`Départ : ${reservationData.dateDepart}`, 20, 75);
        doc.text(`Nombre de nuits : ${reservationData.nbNuits}`, 20, 85);

        // 3. TABLEAU RECAP
        autoTable(doc, {
            startY: 95,
            head: [["Type de chambre", "Arrangement", "Supplément", "Prix Total (TND)"]],
            body: [
                [
                    reservationData.roomType || "Standard",
                    reservationData.arrangement || "petit déjeuner",
                    reservationData.suppléments || "Aucun",
                    `${reservationData.prixTotal} TND`,
                ],
            ],
            theme: "grid",
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: 255,
                halign: "center",
            },
            styles: {
                halign: "center",
                cellPadding: 4,
            },
        });

        // 4. REMARQUES
        const finalY = doc.lastAutoTable.finalY + 10;
        doc.setFontSize(11);
        doc.text("Remarques :", 20, finalY);
        doc.setFontSize(10);
        doc.text(
            `Ce voucher doit être présenté à la réception de l'hôtel le jour de votre arrivée.\n` +
            `Il contient toutes les informations nécessaires pour valider votre réservation.\n` +
            `Merci de vérifier que les informations sont correctes. En cas de doute, contactez notre service client.`,
            20,
            finalY + 10
        );

        // 5. FOOTER
        doc.setFontSize(9);
        doc.text("Hubs Travel - Une plateforme de confiance", 105, 285, { align: "center" });
        const signatureY = 250; // position verticale du cachet
        const signatureX = 140; // position horizontale du cachet

        doc.setDrawColor(0); // Couleur de la bordure (noir)
        doc.setLineWidth(0.5);
        doc.rect(signatureX, signatureY, 55, 25); // rectangle encadré

        // Texte à l'intérieur
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.text("Hubs Travel", signatureX + 5, signatureY + 10);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(reservationData.hotelName || "Nom de l'hôtel", signatureX + 5, signatureY + 18);
        // 6. SAVE
        doc.save("voucher_reservation.pdf");
    };
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
                                Vous pouvez <span className="font-semibold">télécharger votre voucher</span> dès maintenant.
                               
                                <div className=" flex justify-center ">
                                <button
                                    onClick={handleDownloadVoucher}
                                    className="mt-6 px-6  py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-500 transition flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faFilePdf} className="text-white text-lg" />
                                    Télécharger le voucher (PDF)
                                </button>
                                </div>
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
