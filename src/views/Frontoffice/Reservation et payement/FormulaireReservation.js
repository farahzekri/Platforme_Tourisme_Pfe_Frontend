import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import IndexNavbar from "components/Navbars/IndexNavbar"
import image1 from "../../../assets/img/bg_5.jpg"
import ReservationSummary from "./detailreservation";
import ClientInfoSection from "./composantFormulaire/ClientInfoSection";
import { FaSuitcaseRolling } from "react-icons/fa";
import InfotmationOccupation from "./composantFormulaire/informationocuupatoin";
import WishList from "./composantFormulaire/whisches";
import PaymentMethodSelector from "./composantFormulaire/mthodepayement";
import { useCreateReservation } from "views/hooks/Reservation";

const ReservationFormPage = () => {
    const { state } = useLocation();
    const { mutate: createReservation, isLoading, isSuccess, error } = useCreateReservation();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        reserverCivility: "",
        reserverFirstname: "",
        reserverLastname: "",
        reserverEmail: "",
        reserverPhone: "",
        adults: [{ civilite: "", firstname: "", lastname: "" }],
        enfant: [{ sexe: "", firstnamech: "", lastnamech: "" }],
        wishes: [],
        paymentMethod: "",
        roomType:"",
        dateArrivee:"",
        dateDepart:"",
        arrangement:"",
        supplements:[],
        totalPrice:""   
    });
    const validateForm = () => {
        const newErrors = {};
      
        if (!formData.reserverCivility) newErrors.reserverCivility = "Champ requis";
        if (!formData.reserverFirstname.trim()) newErrors.reserverFirstname = "Champ requis";
        if (!formData.reserverLastname.trim()) newErrors.reserverLastname = "Champ requis";
        if (!formData.reserverEmail.trim()) {
          newErrors.reserverEmail = "Champ requis";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reserverEmail)) {
          newErrors.reserverEmail = "Email invalide";
        }
        if (!formData.reserverPhone.trim()) newErrors.reserverPhone = "Champ requis";
      
        formData.adults.forEach((adult, i) => {
            const adultErrors = {}; // On initialise un objet pour l'adulte courant
    
            // On vérifie si chaque champ est vide
            if (!adult.civilite?.trim()) adultErrors.civilite = "Champ requis";
            if (!adult.firstname?.trim()) adultErrors.firstname = "Champ requis";
            if (!adult.lastname?.trim()) adultErrors.lastname = "Champ requis";
    
            // Si l'adulte a des erreurs, on les ajoute à newErrors
            if (Object.keys(adultErrors).length > 0) {
                newErrors.adults = newErrors.adults || [];
                newErrors.adults[i] = adultErrors; // On ajoute les erreurs pour l'adulte à son index
            }
        });
      
        formData.enfant.forEach((child, i) => {
            const childErrors = {};
            if (!child.firstnamech?.trim()) childErrors.firstnamech = "Champ requis";
            if (!child.lastnamech?.trim()) childErrors.lastnamech = "Champ requis";
            if (!child.sexe?.trim()) childErrors.sexe = "Champ requis";
            
            if (Object.keys(childErrors).length > 0) {
                newErrors.enfants = newErrors.enfants || [];
                newErrors.enfants[i] = childErrors;
            }
        });
      
        if (!formData.paymentMethod) newErrors.paymentMethod = "Méthode de paiement requise";
      
        return newErrors;
      };

    const handlePhoneChange = (formattedPhone) => {
        console.log("📞 Phone formatted:", formattedPhone);  
        setFormData(prev => ({
          ...prev,
          reserverPhone: formattedPhone,
        }));
        setErrors((prev) => ({
            ...prev,
            reserverPhone: "",
          }));
      };
    const handleChange = (e) => {
      
        if (!e.target) {
            console.error("L'élément cible n'est pas défini");
            return;
        }

        const { name, value } = e.target;

        if (!name) {
            console.error("Le champ n'a pas de nom");
            return;
        }

        // Mise à jour de l'état avec la valeur de l'input
        setFormData(prev => ({
            ...prev,
            [name]: value,
            
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
    };
    const handleAdultChange = (index, field, value) => {
        const updatedAdults = [...formData.adults];
        if (!updatedAdults[index]) {
            updatedAdults[index] = {};
        }
        updatedAdults[index][field] = value;
    
        setFormData((prev) => ({
            ...prev,
            adults: updatedAdults,
        }));
        setErrors((prev) => ({
            ...prev,
            adults: "",
          }))
    };
    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...formData.enfant];
        if (!updatedChildren[index]) {
            updatedChildren[index] = {};
        }
        updatedChildren[index][field] = value;
    
        setFormData((prev) => ({
            ...prev,
            enfant: updatedChildren,
        }));
        setErrors((prev) => ({
            ...prev,
            enfant: "",
          }))
    };
    const handleChangePayment = (value) => {
        setFormData((prev) => ({ ...prev, paymentMethod: value }));
        setErrors((prev) => ({
            ...prev,
            paymentMethod: "",
          }))
    };

    let hasScrolledToError = false;
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
      
          if (!hasScrolledToError) {
            const firstErrorField = document.querySelector("[data-error='true']");
            if (firstErrorField) {
              firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
              hasScrolledToError = true;
            }
          }
          return;
        }
      
        hasScrolledToError = false;
        setErrors({});
        const reservationPayload = {
          reserverCivility: formData.reserverCivility,
          reserverFirstname: formData.reserverFirstname,
          reserverLastname: formData.reserverLastname,
          reserverEmail: formData.reserverEmail,
          reserverPhone: formData.reserverPhone,
          adults: formData.adults.filter(adult =>
            adult.firstname?.trim() !== "" || adult.lastname?.trim() !== "" || adult.civilite?.trim() !== ""
          ).map(adult => ({
            civility: adult?.civilite || "",
            firstname: adult?.firstname || "",
            lastname: adult?.lastname || ""
          })),
          children: formData.enfant.filter(child =>
            child.firstnamech?.trim() !== "" || child.lastnamech?.trim() !== "" || child.sexe?.trim() !== ""
          ).map(child => ({
            civility: child?.sexe || "",
            firstname: child?.firstnamech || "",
            lastname: child?.lastnamech || ""
          })),
          roomType: state.roomType,
          dateArrivee: state.dateArrivee,
          dateDepart: state.dateDepart,
          arrangement: state.arrangement,
          supplements: state.supplements,
          wishes: formData.wishes || "",
          totalPrice: state.prixTotal,
          paymentMethod:formData.paymentMethod,         };
      
        console.log("Envoyer la réservation : ", reservationPayload);
      
        createReservation({
          hotelId: state.hotelId,
          formData: reservationPayload,
        });
      };

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
                        Reservation
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

                    <div className="col-span-2 bg-white rounded-xl ml-20  shadow p-6">
                        {/* Message motivant */}
                        <div className="relative text-center mb-10 bg-white py-8 px-6 rounded-xl shadow-md border border-[#0D9488]">
                            <div className="flex items-center justify-center gap-4 mb-2">
                                <FaSuitcaseRolling className="text-4xl text-[#0D9488] animate-bounce" />
                                <h2 className="text-3xl font-bold text-[#0D9488]">
                                    Réservez votre séjour inoubliable !
                                </h2>
                            </div>
                            <p className="text-lg text-gray-600">
                                Prenez une minute pour remplir ce formulaire et garantir vos vacances de rêve.
                            </p>
                        </div>

                        <ClientInfoSection
                            formData={formData}
                            onChange={handleChange}
                            handlePhoneChange={handlePhoneChange}
                            errors={errors}
                        />
                        <InfotmationOccupation
                            formData={formData}
                            onChange={handleAdultChange }
                            handleChildChange={handleChildChange}
                            adult={state.adultes}
                            enfant={state.enfants}
                            errors={errors}
                        />
                        <WishList
                            wishes={formData.wishes}
                            onChange={(updatedWishes) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    wishes: updatedWishes,
                                }))
                            }
                        />
                        <PaymentMethodSelector
                            value={formData.paymentMethod}
                            onChange={handleChangePayment}
                            prixTotal={state.prixTotal}
                        />
                         <div className="flex justify-between mt-10">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 h-11 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit} 
                            className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0D5C56] transition"
                        >
                            Confirmer & Paiement
                        </button>
                    </div>
                    </div>
                   

                    {/* RÉCAPITULATIF À DROITE */}
                    <ReservationSummary state={state} />
                </div>
            </div>
        </>
    );
};

export default ReservationFormPage;
