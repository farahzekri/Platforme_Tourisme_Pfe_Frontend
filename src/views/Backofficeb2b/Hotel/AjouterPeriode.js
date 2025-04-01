import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InputWithIcon from "../../Frontoffice/composant/input";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import IndexNavbar from "components/Navbars/IndexNavbar"
import Alert from "components/Alert/Alert";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoCloudyNightSharp } from "react-icons/io5";
import { MdAssignmentReturn, MdFreeCancellation } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import { useCreatePeriode } from "views/hooks/periodehotel";
import { ValidationHotel } from "../../Frontoffice/Hotel/ValidatorHotel";
import { FaPercentage } from "react-icons/fa";
import { useUpdatePeriode } from "views/hooks/periodehotel";
import { useGetPeriodeById } from "views/hooks/periodehotel";
import Loader from "views/Errorpages/loader";
import  Button  from "../../../components/Button/button";
import { faLeftLong, faPlus } from "@fortawesome/free-solid-svg-icons";
const AjouterPeriode = () => {
    const { hotelId } = useParams();
    
    const { data: hotel, isLoadinghotel, error } = useGethotelbyidhotel(hotelId);

    const {mutate:createperiode} = useCreatePeriode();
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [errors, setErrors] = useState({});
    const navigate=useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isEditMode = queryParams.get("edit") === "true";
    const periodeId = queryParams.get("id");
    const updateperiode=useUpdatePeriode();
    const {data:periode, isLoadingperiode, errorperiode}=useGetPeriodeById(periodeId)
    const [formData, setFormData] = useState({
        dateDebut: '',
        dateFin: '',
        minNuits: '',
        allotement: '',
        delai_annulation: '',
        delai_retrocession: '',
        prixWeekday: '',
        prixWeekend: '',
        pourcentageSupplementSingle: '',
        pourcentageSupplementSingleWeekend: '',
        supplementsPrix: [],
        arrangementsPrix: []
    });


    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
    
        if (name === "supplementsPrix" && index !== null) {
            setFormData(prevState => {
                const updatedSupplements = [...(prevState.supplementsPrix || [])];
    
                // Vérifier si l'index existe déjà
                if (!updatedSupplements[index]) {
                    updatedSupplements[index] = { prix: value };  // Initialiser si inexistant
                } else {
                    updatedSupplements[index] = { ...updatedSupplements[index], prix: value };
                }
    
                return { ...prevState, supplementsPrix: updatedSupplements };
            });
        }
    
        else if (name === "arrangementsPrix" && index !== null) {
            setFormData(prevState => {
                const updatedArrangements = [...(prevState.arrangementsPrix || [])];
    
                if (!updatedArrangements[index]) {
                    updatedArrangements[index] = { prix: value };
                } else {
                    updatedArrangements[index] = { ...updatedArrangements[index], prix: value };
                }
    
                return { ...prevState, arrangementsPrix: updatedArrangements };
            });
        }
    
        else {
            const errorMessage = ValidationHotel(name, value);
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: errorMessage,
            }));
        }
    };
    useEffect(() => {
        if (isEditMode && periode) {
            setFormData({
                ...periode,
                dateDebut: periode.dateDebut ? periode.dateDebut.split("T")[0] : "",
                dateFin: periode.dateFin ? periode.dateFin.split("T")[0] : "",
                supplementsPrix: periode.supplementsPrix || [],
            });
        }
    }, [isEditMode, periode]);
    
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
        console.log("FormData avant envoi :", formData); 
        // Validation des champs
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
    
        if (isEditMode) {
            // Mode édition : Mettre à jour la période
            updateperiode.mutate(
                { id: periodeId, formData },
                {
                    onSuccess: () => {
                        setAlert({ message: "Période mise à jour avec succès !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                            navigate(`/Daschbordb2b/ListePeriodeParhotel/${hotelId}`);
                        }, 3000);
                    },
                    onError: (error) => {
                        console.error(error);
                        setAlert({ message: "Erreur lors de la mise à jour.", type: "error" });
                        setTimeout(() => setAlert({ message: "", type: "" }), 5000);
                    }
                }
            );
        } else {
            // Mode ajout : Ajouter une nouvelle période
            createperiode(
                { id: hotelId, formData },
                {
                    onSuccess: () => {
                        setAlert({ message: "Période ajoutée avec succès !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                            navigate(`/Daschbordb2b/ListePeriodeParhotel/${hotelId}`);
                        }, 3000);
                    },
                    onError: (error) => {
                        console.error(error);
                        setAlert({ message: "Erreur lors de l'ajout.", type: "error" });
                        setTimeout(() => setAlert({ message: "", type: "" }), 5000);
                    }
                }
            );
        }
    };
    if (isEditMode,isLoadingperiode) return <Loader />;
    return (
        <>

            <div className="w-full min-h-screen mt-20 pt-5 bg-gray-100">

                <Alert message={alert.message} type={alert.type} />

                <div className="max-w-8xl mx-auto mt-10 flex flex-col space-y-4">
                    {/* First Card: Détails de la période */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                    <div className="flex justify-start mb-5">
                        <Button
                             onClick={() => {
                                console.log("hotelId:", hotelId);  // Debugging
                                navigate(`/Daschbordb2b/ListePeriodeParhotel/${hotelId}`);
                            }}
                            icon={faLeftLong}
                            label="Retourn"
                            bgColor="bg-palette-orange"
                            hoverBgColor="hover:bg-palette-orangefonce"
                            textColor="text-white"
                        />
                         </div>
                       
                        <h2 className="text-2xl font-bold mb-4">Détails de la période</h2>
                        <form className="space-y-4">
                            <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                                    <InputWithIcon
                                        label="Date début*"
                                        type="date"
                                        name="dateDebut"
                                        icon={<HiCalendarDateRange />}
                                        value={formData.dateDebut}
                                        onChange={handleChange}
                                    // error={errors.dateDebut}
                                    />
                                
                                    <InputWithIcon
                                        label="Date fin*"
                                        type="date"
                                        icon={<HiCalendarDateRange />}
                                        name="dateFin"
                                        value={formData.dateFin}
                                        onChange={handleChange}
                                    // error={errors.dateFin}
                                    />
                             
                              
                                    <InputWithIcon
                                        label="Nombre min de nuit*"
                                        type="number"
                                        name="minNuits"
                                        icon={<IoCloudyNightSharp />}
                                        value={formData.minNuits}
                                        onChange={handleChange}
                                        error={errors.minNuits}
                                    />
                              
                               
                                    <InputWithIcon
                                        label="Allotement*"
                                        type="number"
                                        name="allotement"
                                        value={formData.allotement}
                                        onChange={handleChange}
                                        error={errors.allotement}
                                    />
                             
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                    <InputWithIcon
                                        label="Délai d'annulation*"
                                        type="text"
                                        name="delai_annulation"
                                        icon={<MdFreeCancellation />}
                                        value={formData.delai_annulation}
                                        onChange={handleChange}
                                        error={errors.delai_annulation}
                                    />
                              
                             
                                    <InputWithIcon
                                        label="Délai de rétrocession*"
                                        type="text"
                                        name="delai_retrocession"
                                        icon={<MdAssignmentReturn />}
                                        value={formData.delai_retrocession}
                                        onChange={handleChange}
                                        error={errors.delai_retrocession}
                                    />
                             
                         
                                    <InputWithIcon
                                        label="Prix en semaine*"
                                        type="number"
                                        name="prixWeekday"
                                        icon={<IoMdPricetags />}
                                        value={formData.prixWeekday}
                                        onChange={handleChange}
                                        error={errors.prixWeekday}
                                    />
                        
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">

               
                            
                                    <InputWithIcon
                                        label="Suppliment single weekend*"
                                        type="number"
                                        icon={<FaPercentage />}
                                        name="pourcentageSupplementSingleWeekend"
                                        value={formData.pourcentageSupplementSingleWeekend}
                                        onChange={handleChange}
                                        // error={errors.pourcentageSupplementSingleWeekend}
                                    />
                           
                            
                                    <InputWithIcon
                                        label="Supplement Single*"
                                        type="number"
                                        icon={<FaPercentage />}
                                        name="pourcentageSupplementSingle"
                                        value={formData.pourcentageSupplementSingle}
                                        onChange={handleChange}
                                        error={errors.pourcentageSupplementSingle}
                                    />
                               
                            </div>

                        </form>
                    </div>

                    {/* Second Card: Suppléments */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Suppléments</h2>
                        {hotel?.supplements?.length > 0 ? (
                            hotel.supplements.map((supplement, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                                    <span className="truncate">{supplement}</span>
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
                                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                                    <span  className="truncate">{arrangement}</span>
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

                     
                        <div className="flex justify-end mt-9">
                        <Button
                            onClick={handleSubmit}
                            icon={faPlus}
                            label=  {isEditMode ? "Modifier Periode":"Ajouter Peirode"}
                            bgColor="bg-palette-greenajou"
                            hoverBgColor="hover:bg-palette-green"
                            textColor="text-white"
                        />
                     
                         </div>
                    </div>


                </div>
            </div >
        </>
    );
};

export default AjouterPeriode;
