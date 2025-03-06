import React from "react";

const CardRecherche = ({ hotel }) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const formatDate = (date) => date.toISOString().split("T")[0];

    return (
        <div className="bg-orange-500 text-white p-5  rounded-lg shadow-lg space-y-4">
            <h3 className="text-lg font-bold">Rechercher votre séjour</h3>
            <div className="space-y-2">
                <label className="block">Pays & Ville</label>
                <input type="text" value={`${hotel.country} - ${hotel.city}`} readOnly className="w-full p-2 rounded text-black" />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block">Arrivée</label>
                    <input type="date" defaultValue={formatDate(tomorrow)} className="w-full p-2 rounded text-black" />
                </div>
                <div>
                    <label className="block">Départ</label>
                    <input type="date" defaultValue={formatDate(dayAfterTomorrow)} className="w-full p-2 rounded text-black" />
                </div>
            </div>
            <div>
                <label className="block">Adultes & Enfants</label>
                <input type="text" value="2 adultes, 0 enfant" readOnly className="w-full p-2 rounded text-black" />
            </div>
        </div>
    );
};

export default CardRecherche;
