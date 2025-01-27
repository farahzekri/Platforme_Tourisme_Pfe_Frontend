import React, { useState, useEffect } from "react";

const SelectField = ({ label, options, value, onChange, icon, error }) => {
  const [customOption, setCustomOption] = useState(""); // Pour gérer l'input "Autre"

  // Met à jour la valeur de l'input personnalisé uniquement lorsque la sélection est "other"
  useEffect(() => {
    if (value !== "other") {
      setCustomOption(""); // Réinitialiser l'input personnalisé quand la sélection n'est pas "other"
    }
  }, [value]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "other") {
      onChange("other"); // Change la valeur à "other"
    } else {
      onChange(selectedValue); // Change la valeur en fonction de la sélection
    }
  };

  const handleCustomInputChange = (e) => {
    setCustomOption(e.target.value); // Mets à jour la valeur de l'input "Autre"
  };

  const handleCustomInputBlur = () => {
    if (customOption !== "") {
      onChange(customOption); // Envoie la valeur de l'input au parent seulement après que l'utilisateur ait terminé
    }
  };

  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      {icon && (
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
          <i className={icon}></i>
        </span>
      )}
      <select
        className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${
          error && value !== "other" ? "border-red-500 bg-red-50" : ""
        }`}
        id={label}
        value={value}
        onChange={handleSelectChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
        <option value="other">other</option>
      </select>

      {value === "other" && (
        <div className="mt-2">
          <input
            type="text"
            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full ${
              error ? "border-red-500 bg-red-50" : ""
            }`}
            placeholder="Saisissez le type d'agence"
            value={customOption} // Utilise customOption pour l'affichage
            onChange={handleCustomInputChange} // Gère la saisie sans appeler onChange parent
            onBlur={handleCustomInputBlur} // Met à jour le parent quand l'utilisateur quitte le champ
          />
        </div>
      )}

      {error && value !== "other" && (
        <p className="mt-2 text-sm text-red-300">
          <span className="font-medium">Erreur:</span> {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
