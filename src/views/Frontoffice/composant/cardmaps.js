

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const MAPTILER_API_KEY = "2tfGoyYcpEZ7wzWERdDs";
const GoogleMapCard = ({ hotel }) => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (hotel?.address) {
      // Géocodage avec MapTiler
      const geocodeAddress = async () => {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(hotel?.address)}.json?key=${MAPTILER_API_KEY}`
        );
        const data = await response.json();
        if (data.features.length > 0) {
          setLatLng({
            lat: data.features[0].geometry.coordinates[1],
            lng: data.features[0].geometry.coordinates[0],
          });
        } else {
          console.error("Geocoding failed: Address not found");
        }
      };
      geocodeAddress();
    }
  }, [hotel]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isModalOpen && latLng.lat && latLng.lng) {
      // Suppression de toute carte existante
      document.getElementById("modal-map").innerHTML = "";

      const map = L.map("modal-map").setView([latLng.lat, latLng.lng], 14);

      // Ajout des tuiles MapTiler
      L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`, {
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
      }).addTo(map);

      // Ajout d'un marqueur rouge
      L.marker([latLng.lat, latLng.lng], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Icône de localisation rouge
          iconSize: [35, 35],
          iconAnchor: [17, 35],
        }),
      }).addTo(map);
    }
  }, [isModalOpen, latLng]);
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-bold mb-2 flex items-center justify-center">
      <FaMapMarkerAlt className="text-red-500 z-10 animate-pulse" size={20} />

        Localisation
      </h3>

      <div className="relative w-1/2 aspect-square min-w-[19rem] rounded-lg shadow-lg">
        {/* Carte SVG */}
        <svg viewBox="0 0 500 500" className="absolute inset-0 rounded-lg w-full">
          <rect fill="#f5f0e5" width="500" height="500"></rect>
          <path
            fill="#90daee"
            d="M0,367.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55.23,146.23.46,292.46.69,438.69H0v-132.18Z"
          ></path>
        </svg>

        {/* Villes sur la carte */}
        <div className="absolute inset-0">
          {[
            { x: "5%", y: "67%", label: "🏖️ Ville de plage" },
            { x: "32%", y: "32%", label: "🌷 Cité des Fleurs" },
            { x: "58%", y: "83%", label: "🏄 ville du surf" },
            { x: "65%", y: "22%", label: "🏛️ Capitale Cité" },
            { x: "87%", y: "58%", label: "🎢 Pays des divertissements" },
            { x: "94%", y: "38%", label: "🌊 Ville côtière" },
          ].map((city, index) => (
            <div
              key={index}
              className="absolute w-8 h-8 flex items-center justify-center rounded-full"
              style={{ left: city.x, top: city.y }}
            >
              {/* Marqueur 📍 */}
              <span className="relative text-xl">📍</span>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-palette-green text-white text-sm font-bold px-3 py-1 rounded-lg border border-white shadow-md"
              >
                {city.label}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton pour voir la destination */}
      <button
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        onClick={toggleModal}
      >
        Voir la destination
      </button>

      {/* Modal pour afficher la carte complète */}
      {isModalOpen && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ backdropFilter: "blur(5px)" }} // Applique un flou au fond
        >
          <div className="bg-white p-5 rounded-lg shadow-lg relative" style={{ width: "600px", height: "450px" }}>
            <h3 className="text-lg font-bold mb-5">Carte complète</h3>
            <div id="modal-map" style={{ width: "100%", height: "80%" }}></div>
            <button
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 absolute top-2 right-2"
              onClick={toggleModal}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapCard;
