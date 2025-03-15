import React from "react";
import { FiUser } from "react-icons/fi"; // Exemple d'icône, tu peux changer par celle que tu veux

const TextInput = ({ label, value, onChange, placeholder, type = "text", icon }) => {
  return (
    <div className="relative max-w-sm">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative max-w-sm">
        {/* Icône pour le champ (à gauche) */}
        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
          {icon ? (
            // Utilisation d'une icône passée en paramètre
            React.createElement(icon, { className: "w-5 h-5 text-[#014737] dark:text-gray-400" })
          ) : (
            // Icône par défaut
            <FiUser className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          )}
        </div>
        {/* Input texte */}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-gray-50 border border-[#014737] text-gray-900 text-sm rounded-lg focus:ring-[#014737] focus:border-[#014737] block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default TextInput;
