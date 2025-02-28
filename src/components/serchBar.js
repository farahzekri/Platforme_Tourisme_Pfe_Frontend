import { useState } from "react";
// import { FaSearch, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { supplementsOptions } from '../views/Frontoffice/Hotel/fichierdonne'
import { useSearchHotels } from "views/hooks/periodehotel";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [selectedOption, setSelectedOption] = useState("programme");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [adultes, setAdults] = useState(2);
  const [enfants, setChildren] = useState(0);
  const [agesEnfants, setAgesEnfants] = useState([]);
  const [arrangementChoisi, setArrangementChoisi] = useState('petit déjeuner');
  const [supplementsChoisis, setSelectedSupplement] = useState([]);
  const handleSaveOccupancy = () => {
    setShowModal(false);
  };
  const { mutate, isLoading } = useSearchHotels();
  const navigate = useNavigate(); 

  const handleSearch = () => {
    const searchParams = {
        country,
        dateDebut,
        dateFin,
        adultes,
        enfants,
        agesEnfants,
        arrangementChoisi,
        supplementsChoisis
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
          navigate('/search-results', { replace: true, state: { hotels: data.hotels } }); 
      },
      onError: (error) => {
          console.error("❌ Erreur lors de la recherche :", error);
      }
  });
};
  return (
    <div className="w-full flex flex-col items-center mt-6">
      {/* Onglets */}
      <div className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg shadow-md">
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
      ) :(
      <div className="w-full mt-6 p-6 bg-white rounded-lg shadow-lg">
        {selectedOption === "programme" ? (
          <p className="text-gray-700">Contenu pour Programmes Organisés...</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-4">
              {/* Pays */}
              <div className="flex-1">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Pays
                </label>
                <input
                  type="text"
                  placeholder="Entrez un pays"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              {/* Date d'Arrivée */}
              <div className="flex-1">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Date d'Arrivée
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              {/* Date de Sortie */}
              <div className="flex-1">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Date de Sortie
                </label>
                <input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              {/* Occupation */}
              <div className="flex-1 relative">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Occupation
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${adultes} Adultes, ${enfants} Enfants`}
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
              </div>

              {/* Arrangement */}
              <div className="flex-1">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Arrangement
                </label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                  value={arrangementChoisi}
                  onChange={(e) => setArrangementChoisi(e.target.value)}
                >
                  <option value="petit déjeuner">Petite Déjeuner</option>
                  <option value="demi pension">Demi Pension</option>
                  <option value="all inclusive">All Inclusive</option>
                </select>
              </div>

              {/* Suppléments */}
              <div className="flex-1">
                <label className="text-gray-700 font-semibold uppercase text-sm">
                  Suppléments
                </label>
                <select
                  className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
                  value={supplementsChoisis}
                  onChange={(e) => setSelectedSupplement(e.target.value)}
                >
                  {/* Option par défaut 'Aucun' */}
                  <option value="">Aucun</option>

                  {/* Rendu dynamique des options de supplément */}
                  {supplementsOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button

                className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                onClick={handleSearch} disabled={isLoading}
              >
                {isLoading ? "Chargement..." : "Rechercher"}
              </button>

            </div>
          </>

        )}
      </div>
    )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Sélectionner l'occupation</h3>
            <div className="flex justify-between items-center mb-3">
              <span>Adultes:</span>
              <input
                type="number"
                value={adultes}
                min="1"
                max="10"
                className="border p-2 rounded w-16"
                onChange={(e) => setAdults(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-3">
              <span>Enfants:</span>
              <input
                type="number"
                value={enfants}
                min="0"
                max="10"
                className="border p-2 rounded w-16"
                onChange={(e) => setChildren(e.target.value)}
              />
            </div>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              onClick={handleSaveOccupancy}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default SearchBar;
