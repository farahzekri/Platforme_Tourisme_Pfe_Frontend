import CardTable from "components/Cards/CardTable";
import { useEffect, useState } from "react";
import { useGetHistory } from "views/hooks/historique";



export default function Historique() {
    const { data: history = [], isLoading, isError } = useGetHistory()
    const [tableData, setTableData] = useState([]);
    const [actionFilter, setActionFilter] = useState("");
    const columns = ["Non_Utlisateur", "Les_Action", "Details", "Date"];

    useEffect(() => {
        if (history.length > 0) {
            const formattedHistory = history
                .filter((user) => {
                    // Appliquer le filtre d'action si une valeur est sélectionnée
                    return actionFilter ? user.action === actionFilter : true;
                })
                .map((user) => {
                    const date = new Date(user.date);
                    const formattedDate = date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : 'Date invalide';

                    return {
                        id: user._id,
                        Non_Utlisateur: user.admin?.username || user.admin?.nameAgence || "Inconnu",
                        Les_Action: user.action,
                        Details: user.details,
                        Date: formattedDate,
                    };
                });

            setTableData(formattedHistory);
        }
    }, [history, actionFilter]);


    if (isLoading) return <p>Chargement des admin...</p>;
    if (isError) return <p>Erreur lors du chargement des admin.</p>;
    return (
        <>
            <div className="w-full mb-13 px-4 pt-8 mt-20">
                <div className="flex gap-2 p-2">
                    {[
                        { value: "", label: "Toutes" },
                        { value: "Connexion", label: "Connexion" },
                        { value: "Ajout Agence", label: "Ajout Agence" },
                        { value: "Suppression", label: "Suppression" },
                        { value: "Mise à jour", label: "Mise à jour" },
                    ].map((option) => (
                        <label key={option.value} className="cursor-pointer">
                            <input
                                type="radio"
                                name="actionFilter"
                                value={option.value}
                                checked={actionFilter === option.value}
                                onChange={(e) => setActionFilter(e.target.value)}
                                className="sr-only peer"
                            />
                            <div className="flex items-center justify-center h-12 px-4 rounded-xl border-2 border-gray-300 bg-gray-50 transition duration-150 hover:border-blue-400 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400">
                                <span className="text-gray-500 peer-checked:text-blue-500">
                                    {option.label}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>
                <CardTable
                    color="dark"
                    title="Admin"
                    columns={columns}
                    data={tableData}


                />
            </div>
        </>
    )

}