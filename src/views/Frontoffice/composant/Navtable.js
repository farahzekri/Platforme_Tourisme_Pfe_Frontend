import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavTabs = ({ hotel }) => {
    const [activeTab, setActiveTab] = useState("tarifs");
    const navigate=useNavigate();
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg w-72 max-w-sm">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Actions rapides</h2>
          <button
            className="w-full flex items-center justify-start px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 focus:outline-none"
            onClick={() => navigate(`/DetailHotel/${hotel.id}`)}
          >
           Detail Hotel
          </button>
          
          <button
            className="w-full flex items-center justify-start px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 focus:outline-none"
            onClick={() => navigate(`/TarifDisponiblite/${hotel.id}`)}
          >
            Tarifs & Disponibilité
          </button>
          
          <button
            className="w-full flex items-center justify-start px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 focus:outline-none"
            // onClick={() => onButtonClick("avis")}
          >
            Avis Clients
          </button>
          
          <button
            className="w-full flex items-center justify-start px-4 py-2 border rounded-lg bg-white hover:bg-gray-100 focus:outline-none"
            // onClick={() => onButtonClick("activites")}
          >
            Activités
          </button>
        </div>
      </div>
    );
};

export default NavTabs;