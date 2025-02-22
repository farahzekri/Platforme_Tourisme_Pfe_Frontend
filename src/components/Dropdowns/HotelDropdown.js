import React, { useState, useRef } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { FaChevronDown, FaHotel, FaList, FaFileContract } from "react-icons/fa";

const HotelDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <div className="relative select-none">
      {/* Bouton principal */}
      <button
        className="flex items-center gap-2 px-4 py-2 text-black bg-gray-900 rounded-md hover:bg-primary hover:text-white transition duration-300"
        ref={btnDropdownRef}
        onClick={() => (dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover())}
      >
        Hôtel
        <FaChevronDown className={`transform transition-transform duration-300 ${dropdownPopoverShow ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      <div
        ref={popoverDropdownRef}
        className={`${dropdownPopoverShow ? "block" : "hidden"}  bg-white text-base z-50 float-left py-4 list-none text-left rounded shadow-lg min-w-56 w-64`}
      >
        <ul className="py-2">
          <li>
            <Link
              to="/AjouterHotel"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300"
            >
              <FaHotel className="text-green-500" />
              Ajouter un Hôtel
            </Link>
          </li>
          <li>
            <Link
              to="/ListeHotel"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300"
            >
              <FaList className="text-green-500" />
              Voir tous les Hôtels
            </Link>
          </li>
          <li>
            <Link
              to="/add-hotel-contract"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary transition-all duration-300"
            >
              <FaFileContract className="text-green-500" />
              Ajouter Contrat de l'Hôtel
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HotelDropdown;
