import "swiper/css";
import "swiper/css/autoplay"; // Si tu utilises l'autoplay
import "swiper/css/navigation"; // Si tu utilises la navigation
import "swiper/css/pagination";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import image1 from "../../../assets/img/bg_5.jpg"
import CardRecherche from "../composant/cardRecherche";
import GoogleMapCard from "../composant/cardmaps";
import { useGetHotelsbyidWithPrice } from "views/hooks/periodehotel";
import NavTabs from "../composant/Navtable";
import { useEffect, useState } from "react";
import HotelAvailability from "./RommAvailbility";
import DateInput from "../composant/inputRecherche/DateInput";
import TextInput from "../composant/inputRecherche/InputNumber";
import { FaChildren } from "react-icons/fa6";
import { BsPersonStanding } from "react-icons/bs";
import {  MdSafetyCheck } from "react-icons/md";
import { useGethotelbyidhotel } from "views/hooks/Hotel";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
export default function Tarifetdisponiblite() {
  const { id } = useParams();
  const location = useLocation();
  const {
    dateDebut,
    dateFin,
    adulte,
    enfant,
    agesEnfant,
  } = location.state || {};
  const { data: hotelDetails, isLoading, error } = useGetHotelsbyidWithPrice(id);
  const { data: hotel, isLoadinghotel, errorl } = useGethotelbyidhotel(id);
  const [dateArrivee, setDateArrivee] = useState(dateDebut || '');
  const [dateDepart, setDateDepart] = useState(dateFin || '');
  const [adultes, setAdultes] = useState(adulte || 1);
  const [enfants, setEnfants] = useState(enfant|| 0);
  const [agesEnfants, setAgesEnfants] = useState(agesEnfant || []);
  const [searchClicked, setSearchClicked] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    if (dateArrivee && !dateFin) {
      const nextDay = new Date(dateArrivee);
      nextDay.setDate(nextDay.getDate() + 1); // Ajoute un jour
      setDateDepart(nextDay.toISOString().split("T")[0]); // Met à jour la date de départ
    }
  }, [dateArrivee]);
  const handleNombreEnfantsChange = (val) => {
    const nombre = Number(val) || 0;
    setEnfants(nombre);

    // Met à jour le tableau des âges pour correspondre au nombre d'enfants
    setAgesEnfants(new Array(nombre).fill(""));
  };

  const handleAgeChange = (index, val) => {
    const newAges = [...agesEnfants];
    newAges[index] = val;
    setAgesEnfants(newAges);
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
            Tarif et Desponiblite
          </div>
        </div>
        <div className="grid md:grid-cols-5 gap-2 mt-2">
          <div className="md:col-span-1 flex flex-col gap-5">
            {/* Carte de recherche */}
            <CardRecherche hotel={hotelDetails} />

            {/* Carte Google Map */}
            <GoogleMapCard hotel={hotelDetails} />
          </div>

          <div className="md:col-span-3 bg-white p-5 rounded-lg shadow-lg">
            <div className="mb-4 p-4 bg-gray-200 rounded-lg">
              {hotel?.Typecontract === "Réduction par age d'enfant" && (
                <div className="p-4 border-l-4 border-[#048A68] bg-green-100 rounded-lg shadow-md">
                  <h4 className="text-md font-semibold text-[#014737] mb-1">
                    🎉 Offre Spéciale : Réduction Enfants !
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Cet hôtel applique une <span className="font-bold">réduction de 50%</span>
                    pour les enfants âgés entre <span className="font-bold">{hotel.minChildAge}</span>
                    et <span className="font-bold">{hotel.maxChildAge}</span> ans.
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    👶 Les bébés de moins de {hotel.minChildAge} ans ne paient pas.
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    🧑‍🦱 Les enfants de plus de {hotel.maxChildAge} ans sont considérés comme des adultes.
                  </p>
                </div>
              )}


              <div className="flex items-center justify-center mb-3">
                <FaRegCalendarCheck className="text-[#048A68] text-2xl mt-4 mr-2" />
                <h3 className="text-2xl mt-4 font-semibold text-gray-900">Tarif & disponibilité</h3>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700 text-base">
                  <span className="font-semibold">Sélectionnez vos dates</span> d'arrivée et de départ.
                </p>
                <p className="text-gray-700 text-base mt-1">
                  Indiquez le <span className="font-semibold">nombre d'adultes et d'enfants</span> pour voir les offres adaptées.
                </p>
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <DateInput
                    label="Date d'Arrivée"
                    value={dateArrivee}
                    onChange={(dateStr) => {
                      setDateArrivee(dateStr);
                      setDateDepart(''); // Réinitialiser la date de départ
                    }}
                    placeholder="Sélectionner une date"
                    minDate={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <DateInput
                    label="Date de Départ"
                    value={dateDepart}
                    onChange={(dateStr) => setDateDepart(dateStr)}
                    placeholder="Sélectionner une date"
                    minDate={dateDepart}
                  />
                  {/* <label className="block text-sm font-medium">Date de Départ</label>
                  <input type="date" value={dateDepart} onChange={(e) => setDateDepart(new Date(e.target.value).toISOString().split("T")[0])} className="w-full p-2 border rounded" /> */}
                </div>
                <div>
                  <TextInput
                    label="Nombre d'adultes"
                    value={adultes}
                    onChange={(val) => setAdultes(Number(val))}
                    placeholder="Entrez un nombre"
                    type="number"

                    icon={BsPersonStanding}
                  />

                </div>
                <div>
                  <TextInput
                    label="Nombre d'enfants"
                    value={enfants}
                    onChange={handleNombreEnfantsChange}
                    placeholder="Entrez un nombre"
                    type="number"
                    icon={FaChildren}
                  />
                  {enfants > 0 && (
                    <div className="mt-4">
                      {agesEnfants.map((age, index) => (
                        <TextInput
                          key={index}
                          label={`Âge de l'enfant ${index + 1}`}
                          value={age}
                          onChange={(val) => handleAgeChange(index, val)}
                          placeholder="Entrez l'âge"
                          type="number"
                          icon={FaChildReaching}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={() => setSearchClicked(true)}
                  className="flex items-center mt-4 px-4 py-2 bg-[#014737] text-white hover:text-[#014737] hover:bg-[#BCF0DA] rounded-lg hover:bg-blue-600 transition-colors ml-4"
                >
                  <MdSafetyCheck className="mr-2" /> {/* Icône à gauche du texte */}
                  Vérifier la disponibilité
                </button>
              </div>
            </div>

            {searchClicked && (
              <HotelAvailability id={id} dateArrivee={dateArrivee} dateDepart={dateDepart} adultes={adultes} enfants={enfants} agesEnfants={agesEnfants}/>
            )}


          </div>
          <div className="md:col-span-1">
            <div className="mt-5">
              <NavTabs hotel={hotelDetails} />
            </div>
          </div>
        </div>

      </div>

    </>
  )
}