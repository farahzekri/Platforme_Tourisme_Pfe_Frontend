import React from "react";

const InputWithIcon = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  name,
  onChange, 
  icon, 
  options = [], 
  multiple = false ,
  error 
}) => {
  return (
    <div className="space-y-2">
      {/* Le label */}
      <label className="text-gray-700 font-semibold ">{label}</label>

      <div className={`shadow-lg flex gap-2 items-center bg-white p-2 hover:shadow-xl duration-300 hover:border-2 border-gray-400 group delay-200 rounded-md ${error ? "border-red-500" : value ? "border-green-500" : "border-gray-400"}`}>
        {/* Icône dynamique */}
        <div className="group-hover:rotate-[360deg] duration-300">
          {icon}
        </div>

        {/* Champ input, select ou number */}
        {type === "select" ? (
          <select
            className="flex-1 w-full focus:outline-none bg-white border-none"
            value={value}
            onChange={onChange}
            name={name}
            multiple={multiple}  // Ajouter l'attribut multiple pour permettre la sélection multiple
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "number" ? (
          <input
            type="number"
            className="flex-1 w-full focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            min="0"  // Exemple d'attribut pour définir un minimum si besoin
          />
        )  : type === "file" ? (
          <input
            type="file"
            className="flex-1 w-full focus:outline-none"
            name={name}
            onChange={onChange}
            multiple={multiple}
          />
        ):(
          <input
            type={type}
            className="flex-1 w-full  focus:outline-none"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
          />
        )}
      </div>
       {/* Message d'erreur */}
       {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputWithIcon;