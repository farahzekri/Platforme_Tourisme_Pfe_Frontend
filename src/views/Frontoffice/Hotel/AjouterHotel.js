import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import image1 from '../../../assets/img/hotel-resto-1.jpg'
import image2 from '../../../assets/img/hotel-resto-2.jpg'
import image3 from '../../../assets/img/hotel-resto-5.jpg'
import IndexNavbar from "components/Navbars/IndexNavbar"
import InputWithIcon from "../composant/input";
import { FaBed, FaCity, FaExternalLinkAlt, FaFileContract, FaGlobeAmericas, FaHotel, FaLocationArrow, FaThemeisle } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import { IoFastFood, IoMapSharp, IoStarSharp } from "react-icons/io5";
import { FaChildren } from "react-icons/fa6";
import MultiSelectWithTags from "../composant/Multiselcteyr";
import { RxActivityLog } from "react-icons/rx";
import { MdOutlineSelfImprovement } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
const HotelAjouter = () => {
    const [hotelData, setHotelData] = useState({
        name: "",
        country: "",
        city: "",
        stars: 1,
        Typecontract: "",
        minChildAge: "",
        maxChildAge: "",
        address: "",
        tripAdvisorLink: "",
        rooms: [],
        childrenCategories: "",
        options: "",
        location: "",
        themes: [],
        arrangement: [],
        amenities: [],
        supplements: [],
    });

    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleRoomsChange = (selectedOptions) => {
        setSelectedRooms(selectedOptions);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotelData({ ...hotelData, [name]: value });
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
                            <img src={image1} alt="Hotel 1" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image2} alt="Hotel 2" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={image3} alt="Hotel 3" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>

                    {/* Texte par-dessus le carousel */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold z-10">
                        Ajouter un Hôtel
                    </div>
                </div>


                <div className="max-w-7xl mx-auto mt-10 flex space-x-4">
                    {/* First Card: Informations de l'Hôtel */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Informations de l'Hôtel</h2>
                        <form className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Nom de l'hôtel"
                                        type="name"
                                        placeholder="Entre le Nom de l'hôtel"
                                        icon={<FaHotel />}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Pays"
                                        type="Pays"
                                        placeholder="Entre le Pays"
                                        icon={<FaGlobeAmericas />}
                                    />
                                </div>
                            </div>
                            <InputWithIcon
                                label="Ville"
                                type="Ville"
                                placeholder="Entre le Ville"
                                icon={<FaCity />}
                            />
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Nombre d'étoiles"
                                        type="stars"
                                        placeholder="Entre le Nombre d'étoiles"
                                        icon={<IoStarSharp />}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Adress Maps"
                                        type="stars"
                                        placeholder="Entre Adress Maps"
                                        icon={<IoMapSharp />}
                                    />
                                </div>
                            </div>
                            <InputWithIcon
                                label="Type de contrat"
                                type="select"
                                icon={<FaFileContract />}
                                options={[
                                    { value: "", label: "Selectionee un type" },
                                    { value: "Réduction par age d'enfant", label: "Réduction par age d'enfant" },
                                    { value: "Sans Réduction par age d'enfant", label: "Sans Réduction par age d'enfant" },

                                ]}
                            />
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Age Minimal d'enfant "
                                        type="number"
                                        placeholder="Entrez l'Age Minimal d'enfant "
                                        // value={value}
                                        // onChange={handleChange}
                                        icon={<FaChildren />}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Age Maximal  d'enfant "
                                        type="number"
                                        placeholder="Entrez l'Age Maximal  d'enfant "
                                        // value={value}
                                        // onChange={handleChange}
                                        icon={<FaChildren />}
                                    />
                                </div>
                            </div>
                            <InputWithIcon
                                label="Lien TripAdvisor"
                                type="stars"
                                placeholder="Entre Lien TripAdvisor"
                                icon={<FaExternalLinkAlt />}
                            />
                            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                                Ajouter l'hôtel
                            </button>
                        </form>
                    </div>

                    {/* Second Card: Informations Supplémentaires */}
                    <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Informations Supplémentaires</h2>
                        <form className="space-y-4">
                            <MultiSelectWithTags
                                label="Choisissez des chambres"
                                icon={<FaBed />}
                                options={[
                                    { value: "Chambre single", label: "Chambre single" },
                                    { value: "Chambre Double", label: "Chambre Double" },
                                    { value: "Chambre Triple", label: "Chambre Triple" },
                                    { value: "Chambre quadruple", label: "Chambre quadruple" },
                                    { value: "Suite", label: "Suite" },
                                ]}
                                onChange={handleRoomsChange}
                            />
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
                            />
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Option de l'hôtel"
                                        type="stars"
                                        placeholder="Entre Option de l'hôtel"
                                        icon={<RxActivityLog />}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Localisation"
                                        type="stars"
                                        placeholder="Entre Localisation"
                                        icon={<FaLocationArrow />}
                                    />
                                </div>
                            </div>
                            <InputWithIcon
                                label="Theme disponible"
                                type="stars"
                                placeholder="Entre Theme disponible"
                                icon={<FaThemeisle />}
                            />
                            <MultiSelectWithTags
                                label="Arrangement"
                                icon={<IoFastFood />}
                                options={[
                                    { value: "Logement simple", label: "Logement simple" },
                                    { value: "Logement Peite déjeuner", label: "Logement Peite déjeuner" },
                                    { value: "Demi Pension", label: "Demi Pension" },
                                    { value: "Pension compléte", label: "Pension compléte" },
                                    { value: "Tout inclus", label: "Tout inclus" },
                                ]}
                                onChange={handleRoomsChange}
                            />
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Suppléments"
                                        type="stars"
                                        placeholder="Entre les Suppléments"
                                        icon={<IoIosAdd />}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputWithIcon
                                        label="Aménagement"
                                        type="stars"
                                        placeholder="Entre leAménagement"
                                        icon={<MdOutlineSelfImprovement />}
                                    />
                                </div>
                            </div>
                           
                           
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default HotelAjouter;