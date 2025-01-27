import React, { useState } from "react";

const InputField = ({
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  error,
  name, 
}) => {
  const [showPassword, setShowPassword] = useState(false);

 
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={name || label} 
      >
        {label}
      </label>
      {icon && (
        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
          <i className={icon}></i>
        </span>
      )}
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${
          error ? "border-red-500 bg-red-50" : ""
        }`}
        placeholder={placeholder}
        id={label}
        name={name} 
      />
      {type === "password" && (
        <span
          className="absolute right-3 top-7 cursor-pointer text-blueGray-700"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
        </span>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-300">
          <span className="font-medium">Erreur:</span> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
