import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
const CitySelector = ({ setCountry, setCity }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Liste des villes et pays
  const citiesList = [
    "Tunisie, Tunis",
    "Tunisie, Sousse",
    "Tunisie, Sfax",
    "Tunisie, Nabeul",
    "Tunisie, Bizerte",
    "Tunisie, Gabès",
    "Tunisie, Monastir",
    "Tunisie, Kairouan",
    "Tunisie, Djerba",
    "Tunisie, Tataouine",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtrage des options
    const newFiltered = citiesList.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(newFiltered);
  };

  const handleSelectCity = (fullLocation) => {
    setInputValue(fullLocation);
    setIsFocused(false);

    // Séparer pays et ville
    const [selectedCountry, selectedCity] = fullLocation.split(", ");
    setCountry(selectedCountry);
    setCity(selectedCity);
  };

  return (
    <div className="relative w-full max-w-md">
      <label className="text-gray-700 font-semibold uppercase text-sm mb-1">
        Pays et Ville
      </label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Fermeture avec délai
          className="w-full border border-primary bg-white h-20 p-3 pl-10 rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="Sélectionnez un pays et une ville..."
        />
        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />

        {/* Liste déroulante des villes */}
        {isFocused && filteredOptions.length > 0 && (
          <ul className="absolute bg-white w-full mt-1 max-h-48 overflow-y-auto border border-gray-300 rounded-md shadow-lg z-10 drop-shadow-xl">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-palette-bleuclere hover:text-white transition-all duration-200 ease-in-out"
                onClick={() => handleSelectCity(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
