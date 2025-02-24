import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InputWithIcon from "../composant/input";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import IndexNavbar from "components/Navbars/IndexNavbar"
import Alert from "components/Alert/Alert";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoCloudyNightSharp } from "react-icons/io5";
import { MdAssignmentReturn, MdFreeCancellation } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { useCreatePeriode } from "views/hooks/periodehotel";
import { ValidationHotel } from "./ValidatorHotel";
const AjouterPeriode = () => {
    const { hotelId } = useParams();
    const { data: hotel, isLoadinghotel, error } = useGethotelbyidhotel(hotelId);
    const mutation = useCreatePeriode();
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        dateDebut: '',
        dateFin: '',
        minNuits: '',
        allotement: '',
        delai_annulation: '',
        delai_retrocession: '',
        prixWeekday: '',
        prixWeekend: '',
        DCR: '',
        DMJ: '',
        supplementsPrix: [],
        arrangementsPrix: []
    });


    const handleChange = (e, index = null) => {
        const { name, value } = e.target;


        if (name === "supplementsPrix") {
            const updatedSupplements = [...formData.supplementsPrix];
            updatedSupplements[index].prix = value;
            setFormData(prevState => ({ ...prevState, supplementsPrix: updatedSupplements }));
        }

        else if (name === "arrangementsPrix") {
            const updatedArrangements = [...formData.arrangementsPrix];
            updatedArrangements[index].prix = value;
            setFormData(prevState => ({ ...prevState, arrangementsPrix: updatedArrangements }));
        }
        else {
              const errorMessage = ValidationHotel(name, value);
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage, 
            }))
        }
    };

    useEffect(() => {
        if (hotel) {
            const initialSupplements = hotel.supplements.map((supplement, index) => ({
                supplement: supplement,
                prix: formData.supplementsPrix[index]?.prix || '',
            }));
            const initialArrangements = hotel.arrangement.map((arrangement, index) => ({
                arrangement: arrangement,
                prix: formData.arrangementsPrix[index]?.prix || '',
            }));

            setFormData(prevState => ({
                ...prevState,
                supplementsPrix: initialSupplements,
                arrangementsPrix: initialArrangements
            }));
        }
    }, [hotel]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = ValidationHotel(key, formData[key]);
            if (error) {
                validationErrors[key] = error;
            }
        });
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setAlert({ message: "Veuillez remplir tous les champs obligatoires correctement.", type: "error" });
            setTimeout(() => setAlert({ message: "", type: "" }), 5000);
            return;
        }
        mutation.mutate(
            { id: hotelId, formData },
            {
                onSuccess: () => {
                    setAlert({ message: "Periode Ajouter avec succès !", type: "success" });
                    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
                },
                onError: (error) => {
                    console.error(error);
                    setAlert({ message: "Erreur lors de l'Ajouter.", type: "error" });
                    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
                }
            }
        );
    };
    return (
        <>
            <IndexNavbar fixed />
            <div className="w-full min-h-screen bg-gray-100">
                <div className="relative w-full h-96 ">
                    {/* Swiper avec autoplay */}
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img src={hotel?.image?.[0]} alt="Hotel 1" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={hotel?.image?.[1]} alt="Hotel 2" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={hotel?.image?.[2]} alt="Hotel 3" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>

                    {/* Texte par-dessus le carousel */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">
                        Ajouter Periode
                    </div>
                </div>

                <Alert message={alert.message} type={alert.type} />

                <div className="max-w-8xl mx-auto mt-10 flex space-x-4 grid grid-cols-3 gap-4">
                    {/* First Card: Détails de la période */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Détails de la période</h2>
                        <form className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Date début*"
                                        type="date"
                                        name="dateDebut"
                                        icon={<HiCalendarDateRange />}
                                        value={formData.dateDebut}
                                        onChange={handleChange}
                                        error={errors.dateDebut}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Date fin*"
                                        type="date"
                                        icon={<HiCalendarDateRange />}
                                        name="dateFin"
                                        value={formData.dateFin}
                                        onChange={handleChange}
                                        error={errors.dateFin}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Nombre min de nuit*"
                                        type="number"
                                        name="minNuits"
                                        icon={<IoCloudyNightSharp />}
                                        value={formData.minNuits}
                                        onChange={handleChange}
                                        error={errors.minNuits}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Allotement*"
                                        type="number"
                                        name="allotement"
                                        value={formData.allotement}
                                        onChange={handleChange}
                                        error={errors.allotement}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Délai d'annulation*"
                                        type="text"
                                        name="delai_annulation"
                                        icon={<MdFreeCancellation />}
                                        value={formData.delai_annulation}
                                        onChange={handleChange}
                                        error={errors.delai_annulation}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Délai de rétrocession*"
                                        type="text"
                                        name="delai_retrocession"
                                        icon={<MdAssignmentReturn />}
                                        value={formData.delai_retrocession}
                                        onChange={handleChange}
                                        error={errors.delai_retrocession}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Prix en semaine*"
                                        type="number"
                                        name="prixWeekday"
                                        icon={<IoMdPricetags />}
                                        value={formData.prixWeekday}
                                        onChange={handleChange}
                                        error={errors.prixWeekday}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Prix weekend*"
                                        type="number"
                                        name="prixWeekend"
                                        icon={<IoMdPricetags />}
                                        value={formData.prixWeekend}
                                        onChange={handleChange}
                                        error={errors.prixWeekend}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="DCR*"
                                        type="date"
                                        icon={<HiCalendarDateRange />}
                                        name="DCR"
                                        value={formData.DCR}
                                        onChange={handleChange}
                                        error={errors.DCR}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="DMJ*"
                                        type="date"
                                        icon={<HiCalendarDateRange />}
                                        name="DMJ"
                                        value={formData.DMJ}
                                        onChange={handleChange}
                                        error={errors.DMJ}
                                    />
                                </div>
                            </div>
                            <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                                Ajouter la periode
                            </button>
                        </form>
                    </div>

                    {/* Second Card: Suppléments */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Suppléments</h2>
                        {hotel?.supplements?.length > 0 ? (
                            hotel.supplements.map((supplement, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span>{supplement}</span>
                                    <InputWithIcon
                                        type="number"
                                        value={formData.supplementsPrix[index]?.prix || ''}
                                        name="supplementsPrix"
                                        onChange={(e) => handleChange(e, index)} // Utiliser handleChange générique avec index
                                        placeholder="Prix en TND"
                                    />
                                    <span className="ml-2">TND</span>
                                </div>
                            ))
                        ) : (
                            <div>Aucun supplément à affecter pour cet hôtel.</div>
                        )}
                    </div>



                    {/* Third Card: Arrangements */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Arrangements</h2>
                        {hotel?.arrangement?.length > 0 ? (
                            hotel.arrangement.map((arrangement, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span>{arrangement}</span>
                                    <InputWithIcon
                                        type="number"
                                        value={formData.arrangementsPrix[index]?.prix || ''}
                                        name="arrangementsPrix"
                                        onChange={(e) => handleChange(e, index)} // Utiliser handleChange générique avec index
                                        placeholder="Prix en TND"
                                    />
                                    <span className="ml-2">TND</span>
                                </div>
                            ))
                        ) : (
                            <div>Aucun arrangement à affecter pour cet hôtel.</div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
};

export default AjouterPeriode;
