import {  useEffect } from "react";

export const ConfirmationModalSiAccepted = ({ isOpen, onClose, onSubmit, contractDetails, setContractDetails }) => {
    useEffect(() => {
        setContractDetails((prev) => ({
            ...prev,
            startDate: new Date().toISOString().split('T')[0], // Date d'aujourd'hui
        }));
    }, [setContractDetails]);
    if (!isOpen) return null;
  
    
    const calculateDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return '';

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculer la différence en mois
        const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

        return months >= 0 ? months : 0;
    };

    // Initialiser la date de début avec la date actuelle
   

    const handleChangeEndDate = (e) => {
        const newEndDate = e.target.value;
        setContractDetails((prev) => {
            const newDuration = calculateDuration(prev.startDate, newEndDate); // Calculer la durée
            return { ...prev, endDate: newEndDate, duration: newDuration }; // Mettre à jour l'état
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <h3 className="text-lg font-semibold text-gray-800">Détails du contrat</h3>
                <div className="mt-4 space-y-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Date De Debut</label>
                    <input
                        type="date"
                        value={contractDetails.startDate}
                        onChange={(e) => setContractDetails({ ...contractDetails, startDate: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Date De Fin</label>
                    <input
                        type="date"
                        value={contractDetails.endDate}
                        onChange={handleChangeEndDate} // Mise à jour de la date de fin et calcul de la durée
                        className="w-full p-2 border rounded"
                    />
                    {/* Durée calculée automatiquement */}
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Durée</label>
                    <input
                        type="number"
                        value={contractDetails.duration}
                        readOnly // Rendre le champ en lecture seule
                        className="w-full p-2 border rounded"
                    />
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Amount</label>
                    <input
                        type="number"
                        value={contractDetails.amount}
                        onChange={(e) => setContractDetails({ ...contractDetails, amount: e.target.value })}
                        placeholder="Montant (€)"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mt-6 flex justify-end gap-4">
                    <button className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={onClose}>
                        Annuler
                    </button>
                    <button className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-green-600" onClick={onSubmit}>
                        Valider
                    </button>
                </div>
            </div>
        </div>
    );
};