import CardTable from "components/Cards/CardTable";
import ConfirmationModal from "components/modal/confirmationModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeletB2b } from "views/hooks/use";
import { useGetAllB2BUsersAccpeted } from "views/hooks/use";


export default function Inscription() {
const { data: b2bUsers = [], isLoading, isError } = useGetAllB2BUsersAccpeted();
const columns = ["NonAgence", "Email", "Statut", "Téléphone", "Date d'inscription","Supprimer/voir detail"];
const [searchTerm, setSearchTerm] = useState("");
const [isModalOpenconfirm, setIsModalOpenconfirm] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const deleteAdminMutation = useDeletB2b();
const [tableData, setTableData] = useState([]);
const navigate = useNavigate();
const [filteredData, setFilteredData] = useState([]);
useEffect(() => {
    if (b2bUsers.length > 0) {
        const formattedData = b2bUsers.map((user) => ({
            id: user._id,
            NonAgence: user.nameAgence,
            Email: user.email,
            Statut: user.status,
            Téléphone: user.phoneNumber,
            "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
        }));
        setTableData(formattedData);
        setFilteredData(formattedData); // Initialiser les données filtrées
    }
}, [b2bUsers]);

useEffect(() => {
    setFilteredData(
        tableData.filter((user) => 
            user.NonAgence.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.Téléphone.includes(searchTerm)
        )
    );
}, [searchTerm, tableData]);
if (isLoading) return <p>Chargement des utilisateurs...</p>;
if (isError) return <p>Erreur lors du chargement des utilisateurs.</p>;
const handleViewDetails = (nameAgence) => {
    console.log("nameAgence:", nameAgence);
    navigate(`/admin/details/${nameAgence}`);
}
const handleOpenModalconfrm = (user) => {
    console.log("User sélectionné :", user);

    if (!user || !user.NonAgence) {
        console.error("⚠️ Erreur : utilisateur invalide ou NonAgence manquant.");
        return;
    }

    setSelectedUser({ ...user, nameAgence: user.NonAgence }); // ✅ Ajouter nameAgence
    setIsModalOpenconfirm(true);
};


const handleCloseModalconfirme = () => {
    setIsModalOpenconfirm(false);
};
const handleConfirm = async () => {
    if (!selectedUser || !selectedUser.nameAgence) { // ✅ Vérifier nameAgence
        console.error("❌ Erreur : Aucun utilisateur sélectionné ou nameAgence est vide.");
        return;
    }

    console.log("✅ Admin username to delete:", selectedUser.nameAgence);

    try {
        await deleteAdminMutation.mutateAsync(selectedUser.nameAgence); // ✅ Utiliser nameAgence
        
        setTableData((prevData) =>
            prevData.filter((user) => user.NonAgence !== selectedUser.NonAgence)
        );

        setIsModalOpenconfirm(false);
    } catch (error) {
        console.error("❌ Erreur lors de la suppression", error);
    }
};
return(
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </form>
    
                     
    
                    </div>
                    <CardTable
                        color="dark"
                        title="Utilisateurs B2B"
                        columns={columns}
                        data={filteredData}
                        onViewdetail={(user) => handleViewDetails(user.NonAgence)}
                        ondelete={(user) => {
                            console.log("🟢 Utilisateur envoyé pour suppression :", user);
                            handleOpenModalconfrm(user);
                        }}
                    />
                    <ConfirmationModal
                    isOpen={isModalOpenconfirm}
                    message="Etes-vous sûr de vouloir supprimer cet utilisateur ?"
                    onConfirm={handleConfirm}
                    onClose={handleCloseModalconfirme}

                />
                  
                  
                </div>
    </>
)

}