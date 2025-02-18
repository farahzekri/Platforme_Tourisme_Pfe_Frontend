import React, { useState } from "react";

const MultiSelectWithTags = ({ label, options, onChange ,icon}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (!selectedOptions.includes(selectedValue)) {
      const newSelectedOptions = [...selectedOptions, selectedValue];
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
    }
  };

  const handleTagRemove = (value) => {
    const newSelectedOptions = selectedOptions.filter(option => option !== value);
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  return (
    <div className="space-y-2">
      {/* Le label */}
      <label className="text-gray-700 font-semibold">{label}</label>

      {/* Sélecteur déroulant */}
      <div className="shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md">

      <div className="group-hover:rotate-[360deg] duration-300">
          {icon}
        </div>
        <select
          value="" // permet de réinitialiser la sélection après ajout
          onChange={handleSelectChange}
          className="flex-1 focus:outline-none bg-white border-none"
        >
          <option value="">-- Choisir une option --</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des options sélectionnées sous forme de tags */}
      <div className="mt-2">
        {selectedOptions.map((option, index) => (
          <span
            key={index}
            className="inline-block bg-blue-500 text-white rounded-full px-4 py-1 mr-2 mb-2"
          >
            {option}{" "}
            <span
              className="cursor-pointer ml-2"
              onClick={() => handleTagRemove(option)}
            >
              &#10005; {/* Croix pour supprimer */}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectWithTags;
