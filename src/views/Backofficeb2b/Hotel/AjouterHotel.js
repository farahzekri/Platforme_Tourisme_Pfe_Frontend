import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import { useEffect, useState } from "react";

import InputWithIcon from "../../Frontoffice/composant/input";
import { FaBed, FaCity, FaExternalLinkAlt, FaFileContract, FaGlobeAmericas, FaHotel, FaImages, FaLocationArrow, FaThemeisle } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { IoFastFood, IoMapSharp, IoStarSharp } from "react-icons/io5";
import { FaChildren } from "react-icons/fa6";
import MultiSelectWithTags from "../../Frontoffice/composant/Multiselcteyr";
import { RxActivityLog } from "react-icons/rx";
import { MdOutlineSelfImprovement, MdWeekend } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import Loader from "views/Errorpages/loader";
import { supplementsOptions } from "../../Frontoffice/Hotel/fichierdonne";
import { ValidationHotel } from "../../Frontoffice/Hotel/ValidatorHotel";
import Alert from "components/Alert/Alert";
import { useLocation, useNavigate } from "react-router-dom";
import { useGethotelbyidhotel, useUpdateHotel, useCreateHotel } from "views/hooks/Hotel";


const HotelAjouter = () => {
    const { mutate: createHotel, isLoading, isError } = useCreateHotel();
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: "", type: "" });
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const isEditing = params.get("edit") === "true";
    const hotelId = params.get("id");
    console.log("hotelId from URL:", hotelId);
    const navigate=useNavigate();

    const updateHotel = useUpdateHotel();
    const { data: hotel, isLoadinghotel, error } = useGethotelbyidhotel(hotelId);
    console.log("isLoadinghotel:", isLoadinghotel);
    console.log("error:", error);
    console.log("hotel data:", hotel);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        city: '',
        stars: '',
        Typecontract: '',
        minChildAge: '',
        maxChildAge: '',
        address: '',
        tripAdvisorLink: '',
        rooms: [],
        childrenCategories: '',
        options: '',
        location: '',
        themes: [],
        arrangement: [],
        amenities: [],
        supplements: [],
        Jourdeweekend: [],
        image: [],
    });
    useEffect(() => {
        console.log("isEditing:", isEditing);
        console.log("hotelId:", hotelId);
        console.log("hotel data:", hotel);
        if (isEditing && hotel) {
            setFormData(hotel);
        }
    }, [isEditing, hotel]);
    const handleFileChange = async (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            formData.append("upload_preset", "my_preset");
            formData.append("folder", "hotels");

            try {
                const response = await fetch("https://api.cloudinary.com/v1_1/dltoyzote/image/upload", {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Erreur Cloudinary : ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                uploadedImages.push(data.secure_url);
            } catch (error) {
                console.error("Erreur lors de l'upload :", error);
            }
        }


        setFormData((prevData) => ({
            ...prevData,
            image: [...(prevData.image || []), ...uploadedImages],
        }));
    };
    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            image: prevData.image.filter((_, i) => i !== index)
        }));
    };
    const handleChange = (e, isMulti = false) => {

        if (isMulti) {

            setFormData((prevData) => ({
                ...prevData,
                [e.name]: e.value,
            }));

        } else {
            const { name, value } = e.target;
            const errorMessage = ValidationHotel(name, value);
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
            }))
        }
    };
    const handleSubmit = (e) => {
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

        if (isEditing) {
            // **Mise à jour**
            updateHotel.mutate(
                { id: hotelId, formData },
                {
                    onSuccess: () => {
                        setAlert({ message: "Hôtel mis à jour avec succès !", type: "success" });
                        setTimeout(() => {
                            setAlert({ message: "", type: "" });
                            navigate(`/Daschbordb2b/ListeHotel`);
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
            // **Ajout**
            createHotel(formData, {
                onSuccess: (data) => {
                    setAlert({ message: "Hôtel ajouté avec succès !", type: "success" });
                    setTimeout(() => {
                        setAlert({ message: "", type: "" });
                        navigate(`/Daschbordb2b/ListeHotel`);
                    }, 3000);
                    setFormData({ name: '', country: '', city: '', stars: '', Typecontract: '', minChildAge: '', maxChildAge: '', address: '', tripAdvisorLink: '', rooms: [], childrenCategories: [], options: [], location: {}, themes: [], arrangement: [], amenities: [], supplements: [] });
                    setErrors({});
                   
                },
                onError: (error) => {
                    console.error(error);
                    setAlert({ message: "Une erreur est survenue. Veuillez réessayer.", type: "error" });
                    setTimeout(() => setAlert({ message: "", type: "" }), 5000);
                }
            });
        }
    };

    if (isEditing && isLoadinghotel) return <Loader />;

    return (
        <>


            <div className="w-full min-h-screen mt-20 pt-5 bg-gray-100">

                <Alert message={alert.message} type={alert.type} />
                
                <div className="max-w-8xl mx-auto mt-10 flex flex-col space-y-4">
                {/* <div className="absolute  items-center justify-center text-lightBlue-450 text-3xl font-bold z-10">
                        {isEditing ? "Modifier l'hôtel" : "Ajouter un hôtel"}
                    </div> */}
                    {/* First Card: Informations de l'Hôtel */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Informations de l'Hôtel</h2>
                        <form className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Nom de l'hôtel*"
                                        type="name"
                                        placeholder="Entre le Nom de l'hôtel"
                                        icon={<FaHotel />}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        error={errors.name}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Pays*"
                                        type="Pays"
                                        placeholder="Entre le Pays"
                                        icon={<FaGlobeAmericas />}
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        error={errors.country}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Ville*"
                                        type="Ville"
                                        placeholder="Entre le Ville"
                                        icon={<FaCity />}
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        error={errors.city}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Nombre d'étoiles*"
                                        type="stars"
                                        placeholder="Entre le Nombre d'étoiles"
                                        icon={<IoStarSharp />}
                                        name="stars"
                                        value={formData.stars}
                                        onChange={handleChange}
                                        error={errors.stars}
                                    />
                                </div>

                            </div>
                            <div className="flex gap-4">

                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Age Minimal d'enfant*"
                                        type="number"
                                        placeholder="Entrez l'Age Minimal d'enfant "
                                        icon={<FaChildren />}
                                        name="minChildAge"
                                        value={formData.minChildAge}
                                        onChange={handleChange}
                                        error={errors.minChildAge}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Age Maximal  d'enfant*"
                                        type="number"
                                        placeholder="Entrez l'Age Maximal  d'enfant "
                                        icon={<FaChildren />}
                                        name="maxChildAge"
                                        value={formData.maxChildAge}
                                        onChange={handleChange}
                                        error={errors.maxChildAge}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">

                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Adress Maps*"
                                        type="address"
                                        placeholder="Entre Adress Maps"
                                        icon={<IoMapSharp />}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        error={errors.address}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Lien TripAdvisor"
                                        type="stars"
                                        placeholder="Entre Lien TripAdvisor"
                                        icon={<FaExternalLinkAlt />}
                                        name="tripAdvisorLink"
                                        value={formData.tripAdvisorLink}
                                        onChange={handleChange}
                                        error={errors.tripAdvisorLink}
                                    />
                                </div>
                            </div>


                        </form>
                    </div>

                    {/* Second Card: Informations Supplémentaires */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Informations Supplémentaires</h2>
                        <form className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <MultiSelectWithTags
                                        label="Choisissez des chambres"
                                        icon={<FaBed />}
                                        options={[
                                            { value: "single", label: "Chambre single" },
                                            { value: "double", label: "Chambre Double" },
                                            { value: "triple", label: "Chambre Triple" },
                                            { value: "quadruple", label: "Chambre quadruple" },
                                            { value: "suite", label: "Suite" },
                                            { value: "junior", label: "junior" },
                                            { value: "quintuple", label: "quintuple" },
                                        ]}
                                        isMulti
                                        name="rooms"
                                        value={formData.rooms}
                                        onChange={(selectedOptions) => handleChange({ name: "rooms", value: selectedOptions }, true)}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Catégorie d'enfants"
                                        type="select"
                                        icon={<RiParentFill />}
                                        options={[
                                            { value: "", label: "Selectionee un Catégorie d'enfants" },
                                            { value: "Enfant de 2 a 8 ans", label: "Enfant de 2 a 8 ans" },
                                            { value: "Enfant de 2 a 8 ans", label: "Enfant de 9 a 11 ans" },
                                            { value: "Enfant de 2 a 8 ans", label: "Enfant de 4 a 11 ans" },
                                            { value: "Enfant de 2 a 8 ans", label: "Enfant de 6 a 11 ans" },
                                            { value: "Enfant de 2 a 8 ans", label: "Enfant de 4 a 6 ans" },
                                            { value: "Enfant de 4 a 6 ans", label: "Enfant de 2 a 6 ans" },

                                        ]}
                                        name="childrenCategories"
                                        value={formData.childrenCategories}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Type de contrat*"
                                        type="select"
                                        icon={<FaFileContract />}
                                        options={[
                                            { value: "", label: "Selectionee un type" },
                                            { value: "Réduction par age d'enfant", label: "Réduction par age d'enfant" },
                                            { value: "Sans Réduction par age d'enfant", label: "Sans Réduction par age d'enfant" },

                                        ]}
                                        name="Typecontract"
                                        value={formData.Typecontract}
                                        onChange={handleChange}
                                        error={errors.Typecontract}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <MultiSelectWithTags
                                        label="Arrangement"
                                        icon={<IoFastFood />}
                                        options={[
                                            { value: "logement simple", label: "Logement simple" },
                                            { value: "petit déjeuner", label: "Logement Peite déjeuner" },
                                            { value: "demi-pension", label: "Demi Pension" },
                                            { value: "pension complète", label: "Pension compléte" },
                                            { value: "all inclusive", label: "Tout inclus" },
                                        ]}
                                        isMulti
                                        name="arrangement"
                                        value={formData.arrangement}
                                        onChange={(selectedOptions) => handleChange({ name: "arrangement", value: selectedOptions }, true)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Option de l'hôtel"
                                        type="stars"
                                        placeholder="Entre Option de l'hôtel"
                                        icon={<RxActivityLog />}
                                        name="options"
                                        value={formData.options}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Localisation"
                                        type="stars"
                                        placeholder="Entre Localisation"
                                        icon={<FaLocationArrow />}
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Theme disponible"
                                        type="stars"
                                        placeholder="Entre Theme disponible"
                                        icon={<FaThemeisle />}
                                        name="themes"
                                        value={formData.themes}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/4">
                                    <InputWithIcon
                                        label="Aménagement"
                                        type="stars"
                                        placeholder="Entre leAménagement"
                                        icon={<MdOutlineSelfImprovement />}
                                        name="amenities"
                                        value={formData.amenities}
                                        onChange={handleChange}
                                    />

                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <MultiSelectWithTags
                                        label="Suppléments"
                                        icon={<IoIosAdd />}
                                        options={supplementsOptions}
                                        isMulti
                                        name="supplements"
                                        value={formData.supplements}
                                        onChange={(selectedOptions) => handleChange({ name: "supplements", value: selectedOptions }, true)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <MultiSelectWithTags
                                        label="Jour de weekend"
                                        icon={<MdWeekend />}
                                        options={[
                                            { value: "Lundi", label: "Lundi" },
                                            { value: "Mardi", label: "Mardi" },
                                            { value: "Mercredi", label: "Mercredi" },
                                            { value: "Jeudi", label: "Jeudi" },
                                            { value: "Vendredi", label: "Vendredi" },
                                            { value: "Samedi", label: "Samedi" },
                                            { value: "Dimanche", label: "Dimanche" },
                                        ]}
                                        isMulti
                                        name="Jourdeweekend"
                                        value={formData.Jourdeweekend}
                                        onChange={(selectedOptions) => handleChange({ name: "Jourdeweekend", value: selectedOptions }, true)}
                                    />
                                </div>
                            </div>





                        </form>
                    </div>

                    {/* 3eme card */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Image </h2>
                        <form className="space-y-4">


                            <InputWithIcon
                                label="Images"
                                type="file"
                                icon={<FaImages />}
                                name="image"
                                onChange={handleFileChange}
                                multiple // Permet de sélectionner plusieurs fichiers à la fois
                            />


                            {formData.image && formData.image.length > 0 && formData.image.map((image, index) => (
                                <div key={index} style={{ position: "relative", display: "inline-block", margin: "5px" }}>
                                    <img src={image} alt={`Image ${index + 1}`} width="100" style={{ borderRadius: "5px" }} />


                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "5px",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "50%",
                                            width: "20px",
                                            height: "20px",
                                            fontSize: "14px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))}




                        </form>
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 mt-20 rounded hover:bg-blue-600 transition">

                            {isEditing ? "Modifier l'hôtel" : "Ajouter l'hôtel"}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default HotelAjouter;