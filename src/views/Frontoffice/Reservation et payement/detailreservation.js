// ReservationSummary.jsx

import React from 'react';
import { FaChild, FaGlobe, FaHandsHelping, FaRegSmileBeam, FaRegSmileWink, FaStar, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ReservationSummary = ({ state }) => {
    return (
        <div className="bg-white   shadow-lg rounded-xl p-6 space-y-6 max-w-xl">
        <h3 className="text-2xl font-bold text-gray-800">Résumé de la réservation</h3>
        <div className="flex space-x-4 items-center">
            <img
                src={state.hotelImage}
                alt={state.hotelImage}
                className="w-full h-80 object-cover rounded-lg shadow"
            />

        </div>
        <div className="flex flex-col space-y-2">
            {/* Nom de l’hôtel + étoiles côte à côte */}
            <div className="flex items-center justify-between">
                <h4 className="text-2xl font-bold text-gray-800">{state.hotelName}</h4>
                <div className="flex items-center text-palette-jaun text-xl">
                    {[...Array(state.hotelStarts)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
            </div>


            <p className="text-base text-gray-600">
                {state.hotelCountry}, {state.hotelCity}
            </p>


            <div className="flex items-center text-sm text-gray-700">
                <MdLocationOn className="mr-1 text-red-500 text-base" />
                <span>Situé à : {state.hoteladdress}</span>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl border shadow-sm text-center">
            <div>
                <p className="text-lg uppercase text-gray-500 tracking-wide">Arrivée</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                    {format(new Date(state.dateArrivee), "dd MMMM yyyy", { locale: fr })}
                </p>
            </div>
            <div>
                <p className="text-lg uppercase text-gray-400 tracking-wide">Départ</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">
                    {format(new Date(state.dateDepart), "dd MMMM yyyy", { locale: fr })}
                </p>
            </div>
            <div>
                <p className="text-lg uppercase text-gray-400 tracking-wide">Nuits</p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{state.nbNuits}</p>
            </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border shadow-lg space-y-6">
            {/* Section Arrangement et Suppléments */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold text-gray-700 mb-1">Votre choix :</p>
                    <p className="text-sm font-medium text-gray-800">
                        <strong>Arrangement :</strong> {state.arrangement || "Non sélectionné"}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>Suppléments :</strong> {state?.suppléments?.length > 0 ? state.suppléments.join(", ") : "Aucun supplément"}
                    </p>
                </div>
                {/* Icône de Suppléments */}
                <div className="flex items-center justify-center">
                    <FaRegSmileWink className="text-teal-500 text-3xl" />
                </div>
            </div>

            {/* Séparateur pour la section suivante */}
            <div className="border-t border-gray-300 mt-4"></div>

            {/* Section Chambre & Occupation */}
            <div>
                <p className="text-xl font-semibold text-gray-700 mb-1">Détails de votre chambre</p>
                <p className="text-lg font-medium text-gray-800">
                    Chambre : {state.roomType || "Non précisé"}
                </p>

                <div className="flex items-center space-x-2 mt-2">
                    <strong>Occupation :</strong>
                    {Array(state.adultes).fill(null).map((_, i) => (
                        <FaUser key={`adult-${i}`} className="text-gray-700 text-xl" />
                    ))}
                    {Array(state.enfants).fill(null).map((_, i) => (
                        <FaChild key={`child-${i}`} className="text-orange-400 text-xl" />
                    ))}
                </div>
            </div>

            {/* Footer pour le montant */}
            <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Montant total :</span>
                <span className="text-xl font-bold text-[#0F766E]">{state.prixTotal} TND</span>
            </div>
        </div>

        {/* Phrase motivante pour réserver */}
        <div className="text-center mt-6">
            {/* Phrase motivante avec icônes 3D */}
            <p className="text-lg font-medium text-palette-bleuclere">
                 Rejoignez les milliers de Tunisiens qui ont choisi le meilleur ! 
            </p>
            <p className="text-palette-green mt-2 text-xl font-semibold">
                Vous méritez une expérience inoubliable, alors pourquoi attendre ?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
                {/* Icônes 3D */}
                <div className="transform transition-all hover:scale-110 hover:rotate-12">
                    <FaGlobe className="text-[#0F766E] text-4xl hover:text-teal-600" />
                </div>
                <div className="transform transition-all hover:scale-110 hover:rotate-12">
                    <FaRegSmileBeam className="text-palette-jaunFonce text-4xl hover:text-yellow-500" />
                </div>
                <div className="transform transition-all hover:scale-110 hover:rotate-12">
                    <FaHandsHelping className="text-palette-orange text-4xl hover:text-palette-orange-600" />
                </div>
            </div>
            {/* Button pour modifier la recherche */}
            <div className="mt-6">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 transform hover:scale-105"
                >
                     Modifier ma recherche 
                </button>
            </div>
        </div>


    </div>
    );
};

export default ReservationSummary;
