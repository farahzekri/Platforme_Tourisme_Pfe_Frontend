import { useEffect, useState } from "react";
// import { FaSearch, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { motion } from 'framer-motion';

import { useSearchHotels } from "views/hooks/periodehotel";
import { useNavigate } from "react-router-dom";
import { FaChild, FaMapMarkerAlt, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import DateInput from "./InputField/DateInputRecherhce";
import CitySelector from "./InputField/cityselecteur";
const SearchBar = ({ initialData }) => {
  const [selectedOption, setSelectedOption] = useState("hotel");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(initialData?.country || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [dateDebut, setDateDebut] = useState(initialData?.dateDebut || '');
  const [dateFin, setDateFin] = useState(initialData?.dateFin || '');
  const [adultes, setAdults] = useState(initialData?.adultes || 2);
  const [enfants, setChildren] = useState(initialData?.enfants || 0);
  const [agesEnfants, setAgesEnfants] = useState(initialData?.agesEnfants || []);
  // const [arrangementChoisi, setArrangementChoisi] = useState('petit déjeuner');
  // const [supplementsChoisis, setSelectedSupplement] = useState([]);
  useEffect(() => {
    if (dateDebut) {
      const nextDay = new Date(dateDebut);
      nextDay.setDate(nextDay.getDate() + 1); // Ajoute un jour
      setDateFin(nextDay.toISOString().split("T")[0]); // Met à jour la date de départ
    }
  }, [dateDebut]);
  const handleAgeChange = (index, value) => {
    let ageValue = parseInt(value, 10);
  
    if (isNaN(ageValue)) {
      ageValue = 2; // Valeur par défaut si vide ou invalide
    }
  
    // Appliquer les limites
    if (ageValue < 2) ageValue = 2;
    if (ageValue > 12) ageValue = 12;
  
    const newAges = [...agesEnfants];
    newAges[index] = ageValue;
    setAgesEnfants(newAges);
  }

  // Mettre à jour le nombre d'enfants
  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setChildren(value);
    setAgesEnfants(new Array(value).fill(''));
  };
  const handleSaveOccupancy = () => {
    setShowModal(false);
  };
  const { mutate, isLoading } = useSearchHotels();
  const navigate = useNavigate();


  const handleSearch = () => {
    const searchParams = {
      country,
      city,
      dateDebut,
      dateFin,
      adultes,
      enfants,
      agesEnfants,

    };
    setLoading(true);
    console.log("Données envoyées : ", searchParams);
    mutate(searchParams, {
      onSuccess: (data) => {
        console.log("✅ Résultats reçus :", data);

        if (!data || !data.hotels) {
          console.error("❌ Problème : Pas d'hôtels reçus !");
          return;
        }

        console.log("📦 Hôtels envoyés au navigateur :", data.hotels);
        setLoading(false);
        navigate('/search-results', {
          replace: true,
          state: {
            hotels: data.hotels,
            searchParams // Ajouter les données de recherche pour les pré-remplir
          }
        });
      },
      onError: (error) => {
        console.error("❌ Erreur lors de la recherche :", error);
      }
    });
  };
  return (
    <div className="w-full flex flex-col items-center mt-6">
      {/* Onglets */}
      <div className="flex flex-wrap justify-center gap-4 bg-gray-100 p-2 rounded-lg shadow-md">
        <button
          className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-2 ${selectedOption === "programme"
            ? "bg-white text-orange-500 border-orange-500 shadow-md"
            : "bg-orange-500 text-white border-transparent hover:bg-orange-600 hover:scale-105"
            } rounded-lg`}
          onClick={() => setSelectedOption("programme")}
        >
          Programmes Organisés
        </button>
        <button
          className={`px-6 py-3 text-lg font-semibold transition-all duration-300 border-2 ${selectedOption === "hotel"
            ? "bg-white text-orange-500 border-orange-500 shadow-md"
            : "bg-orange-500 text-white border-transparent hover:bg-orange-600 hover:scale-105"
            } rounded-lg`}
          onClick={() => setSelectedOption("hotel")}
        >
          Hôtel
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-12 w-32 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <div className="w-full mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
          {selectedOption === "programme" ? (
            <p className="text-gray-700">Contenu pour Programmes Organisés...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 ">
                {/* Pays */}
                <div >

                  <CitySelector country={country} city={city} setCountry={setCountry} setCity={setCity} />
                </div>
                {/* Date d'Arrivée */}
                <div >
                  <label className="text-gray-700 font-semibold uppercase text-sm">
                    Date d'Arrivée
                  </label>
                  <DateInput

                    value={dateDebut}
                    onChange={(dateStr) => {
                      setDateDebut(dateStr);
                      setDateFin(''); // Réinitialiser la date de départ
                    }}
                    placeholder="Sélectionner une date"
                    minDate={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Date de Sortie */}
                <div >
                  <label className="text-gray-700 font-semibold uppercase text-sm">
                    Date de Sortie
                  </label>
                  <DateInput
                    value={dateFin}
                    onChange={(dateStr) => setDateFin(dateStr)}
                    placeholder="Sélectionner une date"
                    minDate={dateFin}
                  />
                </div>

                {/* Occupation */}
                <div >
                  <label className="text-gray-700 font-semibold uppercase text-sm">
                    Occupation
                  </label>
                  <div className="relative">
                    <PiUsersThreeFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
                    <input
                      type="text"
                      readOnly
                      value={`${adultes} Adultes, ${enfants} Enfants`}
                      className="w-full border border-primary bg-white h-20 p-3 pl-10 rounded-md focus:ring-2 focus:ring-orange-500 outline-none outline-none cursor-pointer"
                      onClick={() => setShowModal(true)}
                    />
                  </div>

                </div>
                {showModal && (
                  <div className="fixed inset-0 flex z-10 items-center justify-center bg-gray-800 bg-opacity-50">
                    <motion.div
                      className="bg-white p-6 rounded-lg shadow-lg relative w-96"
                      initial={{ x: '100%' }} // Modal commence à droite
                      animate={{ x: 0 }}      // Modal glisse vers la gauche
                      exit={{ x: '100%' }}    // Modal glisse vers la droite lors de la fermeture
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <button
                        className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
                        onClick={() => setShowModal(false)}
                      >
                        <FaTimes size={20} />
                      </button>
                      <h3 className="text-lg font-semibold mb-4 text-center">Sélectionnez combien de personnes réservent</h3>

                      {/* Sélecteur Adultes */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="flex items-center gap-2">
                          <FaUser className="text-gray-600" />
                          Adultes:
                        </span>
                        <input
                          type="number"
                          value={adultes}
                          min="1"
                          max="10"
                          className="border p-2 rounded w-16 text-center"
                          onChange={(e) => setAdults(parseInt(e.target.value, 10) || 1)}
                        />
                      </div>

                      {/* Sélecteur Enfants */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="flex items-center gap-2">
                          <FaChild className="text-orange-500" />
                          Enfants:
                        </span>
                        <input
                          type="number"
                          value={enfants}
                          min="0"
                          max="10"
                          className="border p-2 rounded w-16 text-center"
                          onChange={handleChildrenChange}
                        />
                      </div>

                      {/* Champs d'âge pour chaque enfant */}
                      {enfants > 0 && (
                        <div className="bg-gray-100 p-3 rounded-md mt-3">
                          <h4 className="text-sm font-semibold mb-2">Âges des enfants</h4>
                          {agesEnfants.map((age, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                              <span>Âge Enfant {index + 1}:</span>
                              <input
                                type="number"
                                value={age}
                                min="2"
                                max="12"
                                className="border p-2 rounded w-16 text-center"
                                onChange={(e) => handleAgeChange(index, e.target.value,10) || 1}
                                onInput={(e) => {
                                  const val = parseInt(e.target.value, 10);
                                  if (val >= 2 && val <= 12) {
                                    handleAgeChange(index, val);
                                  }
                                }}
                              />
                              
                            </div>
                           
                          ))}
                        </div>
                      )}

                      {/* Bouton Enregistrer */}
                      <button
                        className="mt-4 px-4 py-2 w-full bg-orange-500 text-white rounded hover:bg-orange-600"
                        onClick={handleSaveOccupancy}
                      >
                        Enregistrer
                      </button>
                    </motion.div>
                  </div>
                )}
                <button
                  className="px-6 mt-6 py-3 h-20 flex items-center justify-center gap-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Chargement..."
                  ) : (
                    <>
                      <FaSearch className="text-lg" /> Recherche
                    </>
                  )}
                </button>

              </div>
            </>

          )}
        </div>
      )}

    </div>

  );
};

export default SearchBar;
