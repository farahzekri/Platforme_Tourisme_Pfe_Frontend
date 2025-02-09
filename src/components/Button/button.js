import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Button = ({
    onClick,
    icon,
    label,
    className = "",
    bgColor = "from-blue-500 to-blue-600", // Default gradient
    hoverBgColor = "hover:from-blue-600 hover:to-blue-700", // Default hover gradient
    textColor = "text-white", // Default text color
  }) => {
    return (
      <button
        onClick={onClick}
        className={`bg-gradient-to-r ${bgColor} ${textColor} px-6 py-3 rounded-xl shadow-lg text-base font-semibold 
                    ${hoverBgColor} transform transition-all duration-300 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${className}`}
      >
        <FontAwesomeIcon icon={icon} className="mr-3 text-lg" />
        {label}
      </button>
    );
  };
  
  export default Button;