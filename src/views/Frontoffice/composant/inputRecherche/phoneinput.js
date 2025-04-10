import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { FiPhone } from "react-icons/fi";
import 'react-phone-input-2/lib/style.css';

const PhoneInputField = ({ label, value, onChange  }) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = {
    paddingLeft: '3rem',                // espace pour l'icône
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
    paddingRight: '1rem',
    width: '100%',
    height: '64px',
    border: isFocused ? '2px solid #014737' : '1px solid #014737',
    borderRadius: '0.75rem',           // 12px ≈ rounded-xl
    fontSize: '1rem',                  // text-base
    backgroundColor: '#f9fafb',        // gray-50
    color: '#1f2937',                  // text-gray-900
    outline: 'none',
    transition: 'border 0.2s ease',
  };

  return (
    <div className="relative max-w-sm w-full">
      {label && (
        <label className="block text-lg font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icône téléphone */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiPhone className="w-5 h-5 text-[#014737]" />
        </div>

        {/* Input phone */}
        <PhoneInput
          country={'tn'}
          value={value}
          onChange={onChange}
          enableSearch={true}
          inputStyle={inputStyle}
          buttonClass="!border-none !rounded-xl !pr-2"
          containerClass="!w-full  "
          dropdownClass="!z-50"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default PhoneInputField;
