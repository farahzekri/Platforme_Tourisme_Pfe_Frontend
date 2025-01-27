import CardTable from "components/Cards/CardTable";
import React from "react";
import { useGetAllB2BUsers ,useUpdateB2BStatus} from "views/hooks/use";

export default function Preselction() {
    const { data: b2bUsers = [], isLoading, isError } = useGetAllB2BUsers();
    const { mutate: updateStatus } = useUpdateB2BStatus();
    if (isLoading) return <p>Chargement des utilisateurs...</p>;
    if (isError) return <p>Erreur lors du chargement des utilisateurs.</p>;

    // Colonnes dynamiques
    const columns = ["nameAgence", "Email", "Statut", "phoneNumber", "Date d'inscription", "Action"];

    // Formater les données pour correspondre aux colonnes
    const tableData = b2bUsers.map((user) => ({
        nameAgence: user.nameAgence,
        Email: user.email,
        Statut: user.status,
        phoneNumber: user.phoneNumber,
        "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
    }));
    const handleAccept = (user) => {
        updateStatus({ nameAgence: user.nameAgence, status: 'approved' });
      };
    
      const handleReject = (user) => {
        updateStatus({ nameAgence: user.nameAgence, status: 'rejected' });
      };
    return (
        <>
            <div className="w-full mb-13 px-4 pt-5 mt-20">
                <div className="flex justify-between items-center mb-4 space-x-4">

                    {/* Barre de recherche */}
                    <form className="relative w-2/3">
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Rechercher des utilisateurs..."
                                required
                            />
                        </div>
                    </form>

                    {/* Bouton pour ajouter une agence */}
                    <button
                        onClick={() => {/* Ajoute ici ta logique pour ajouter une agence */ }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                    >
                        Ajouter une agence
                    </button>

                </div>
                <CardTable
                    color="dark"
                    title="Utilisateurs B2B"
                    columns={columns}
                    data={tableData}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            </div>
        </>
    )
}