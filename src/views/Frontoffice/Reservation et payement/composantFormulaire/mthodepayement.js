import React, { useState } from "react";
import { MdOutlinePayment } from "react-icons/md";

const PaymentMethodSelector = ({ value, onChange ,prixTotal }) => {
    const [method, setMethod] = useState(value || "");

    const handleSelect = (selected) => {
        setMethod(selected);
        onChange(selected);
    };

    const renderPrix = () => {
        if (value === "enligne_total") {
            return (
                <p className="text-green-700 font-semibold mt-2">
                    Montant à payer : {prixTotal} TND
                </p>
            );
        } else if (value === "enligne_moitie") {
            return (
                <p className="text-green-700 font-semibold mt-2">
                    Montant à payer maintenant : {prixTotal / 2} TND
                </p>
            );
        }
        return null;
    };
    return (
        <div className="mt-4">

            <div className="bg-teal-50 p-4 rounded-xl shadow-sm border-l-4 border-[#0D9488] mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#115E59] flex items-center gap-3">
                    <MdOutlinePayment className="text-2xl text-[#115E59]" />
                    Méthode de paiement
                </h2>
            </div>
            <p className="text-lg text-gray-700 text-center mb-10">
                Si vous choisissez de passer par une agence, indiquez si vous organisez le voyage vous-même ou si vous préférez effectuer le paiement en ligne.
            </p>
            <div className="flex gap-4 mb-4">
                <button
                    type="button"
                    onClick={() => handleSelect("agence")}
                    className={`px-4 py-2 rounded-lg border ${method === "agence" ? "bg-[#0F766E] border-[#0F766E] text-lg text-white" : "bg-green-100 border-green-100"
                        }`}
                >
                    Avec une agence
                </button>

                <button
                    type="button"
                    onClick={() => setMethod("enligne")}
                    className={`px-4 py-2 rounded-lg border ${method.startsWith("enligne") ? "bg-[#0F766E] border-[#0F766E] text-lg text-white" : "bg-green-100 border-green-100"
                        }`}
                >
                    En ligne
                </button>
            </div>

            {method === "enligne" && (
    <div className="ml-2 space-y-4 p-4">
        {/* Option 1 - Tout payer en ligne */}
        <label className="relative flex items-center cursor-pointer">
            <input
                type="radio"
                name="enligne"
                value="enligne_total"
                checked={value === "enligne_total"}
                onChange={() => handleSelect("enligne_total")}
                className="sr-only peer"
            />
            <div
                className="w-6 h-6 bg-transparent border-2 border-[#10B981] rounded-full
                peer-checked:bg-[#10B981] peer-checked:border-emerald-[#10B981]
                peer-hover:shadow-lg peer-hover:shadow-[#10B981]/50
                peer-checked:shadow-lg peer-checked:shadow-[#10B981]/50
                transition duration-300 ease-in-out"
            ></div>
            <span className="ml-3 text-gray-800 text-lg">
                Tout payer en ligne <span className="text-green-700 font-semibold">({prixTotal} TND)</span>
            </span>
        </label>

        {/* Option 2 - Moitié en ligne, moitié sur place */}
        <label className="relative flex items-center cursor-pointer">
            <input
                type="radio"
                name="enligne"
                value="enligne_moitie"
                checked={value === "enligne_moitie"}
                onChange={() => handleSelect("enligne_moitie")}
                className="sr-only peer"
            />
            <div
                className="w-6 h-6 bg-transparent border-2 border-[#10B981] rounded-full
                peer-checked:bg-[#10B981] peer-checked:border-emerald-[#10B981]
                peer-hover:shadow-lg peer-hover:shadow-[#10B981]/50
                peer-checked:shadow-lg peer-checked:shadow-[#10B981]/50
                transition duration-300 ease-in-out"
            ></div>
            <span className="ml-3 text-gray-800 text-lg">
                Moitié en ligne <span className="text-green-700 font-semibold">({prixTotal / 2} TND)</span>, 
                moitié sur place <span className="text-green-700 font-semibold">({prixTotal / 2} TND)</span>
            </span>
        </label>
    </div>
)}
        </div>
    );
};

export default PaymentMethodSelector;
