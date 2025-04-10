import React from "react";
import { FiUser } from "react-icons/fi"; // Icône par défaut

const SelectInput = ({ label, value, onChange, options, icon }) => {
  return (
    <div className="relative max-w-sm">
      {label && (
        <label className="block text-lg font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative max-w-sm">
        {/* Icône à gauche */}
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          {icon ? (
            React.createElement(icon, {
              className: "w-5 h-5 text-[#014737] dark:text-gray-400",
            })
          ) : (
            <FiUser className="w-5 h-5 text-[#014737] dark:text-gray-400" />
          )}
        </div>

        {/* Select input stylé */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-50 border border-[#014737] text-gray-900 text-base rounded-xl 
          focus:ring-[#014737] focus:border-[#014737] block w-full pl-12 py-5 px-4
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">-- Sélectionner --</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
