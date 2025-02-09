/*eslint-disable*/
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import image from '../../assets/img/hubs-logo.jpg'
import { faBars, faBusinessTime, faCheckToSlot, faClipboardList, faHouse, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <>
      {/* Bouton Menu Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?  <FontAwesomeIcon icon={faBusinessTime} size={20} />: <FontAwesomeIcon icon={faBars} size={20}/>}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-xl p-6 w-64 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={image} className="h-50 w-auto" alt="Logo" />
          </Link>
          {/* Bouton fermer (mobile) */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
           <FontAwesomeIcon icon={faBusinessTime} size={20} />
          </button>
        </div>

        {/* Super Admin */}
      
        <ul className="space-y-2 mt-3">
          <SidebarItem to="/admin/dashboard" icon={<FontAwesomeIcon icon={faHouse} />} label="Dashboard" />
         
        </ul>
        <hr className="my-4 border-gray-300" />
        <h6 className="text-gray-700 text-xs uppercase font-extrabold mt-6">Gestion des Admin</h6>
        <ul className="space-y-2 mt-3">
      
          <SidebarItem to="/admin/listadmin" icon={<FontAwesomeIcon icon={faUserShield} />} label="Admin" />
        </ul>
        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Agence */}
        <h6 className="text-gray-700 text-xs uppercase font-extrabold">Gestion des Agence</h6>
        <ul className="space-y-2 mt-3">
          <SidebarItem to="/admin/preselction" icon={<FontAwesomeIcon icon={faClipboardList} />} label="Préinscription" />
          <SidebarItem to="/admin/inscription" icon={<FontAwesomeIcon icon={faCheckToSlot} />} label="Inscription" />
        </ul>
      </nav>
    </>
  );
};

// Composant SidebarItem pour éviter la répétition du code
const SidebarItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
        isActive 
          ? "bg-lightBlue-450 text-white" 
          : "text-gray-700 bg-white hover:bg-lightBlue-450 hover:text-white"
      }`}
    >
      <span className="mr-2">{icon}</span> {label}
    </Link>
  </li>
  );
};

export default Sidebar;