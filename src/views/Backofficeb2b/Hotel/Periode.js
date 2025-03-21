import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPeriodeByidHotel } from "views/hooks/periodehotel";
import Table from "../composant/table";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button/button";
import { useDeletePeriode } from "views/hooks/periodehotel";
import ConfirmationModal from "components/modal/confirmationModal";


export const PeriodeHotel = () => {
    const { hotelId } = useParams();
    const { data: Periode, isLoading, error } = useGetPeriodeByidHotel(hotelId);
    const [tableData, setTableData] = useState([]);
    const { mutate: deletePeriode } = useDeletePeriode();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPeriode, setSelectedPeriode] = useState(null);
    const columns = ["Date De Debut", "Date De Fin", "Delai D'annumltaion",  "Delai De Retrocession", "Allotement", "Prix","Supprimer/Modification"];
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        if (Array.isArray(Periode) && Periode.length > 0) {
            setTableData(
                Periode.map((period) => ({
                    id: period._id,
                    "Date De Debut": new Date(period.dateDebut).toLocaleDateString('fr-FR'),
                    "Date De Fin": new Date(period.dateFin).toLocaleDateString('fr-FR'),
                    "Delai D'annumltaion": period.delai_annulation,
                    "Delai De Retrocession": period.delai_retrocession,
                    Allotement: period.allotement,
                    Prix: period.prixWeekday,
                }))
            );
        }
    }, [Periode]);
    const filteredData = tableData.filter((period) => {
        return period["Date De Debut"].toLowerCase().includes(searchQuery.toLowerCase());
    });
    const handleUpdate = (id) => {
        navigate(`/Daschbordb2b/AjouterPeriode/${hotelId}?edit=true&id=${id}`);
    };
    const handleDelete = (hotel) => {
        setSelectedPeriode(hotel); 
        setIsModalOpen(true);     
        console.log('userselectione', hotel); 
    };
    const confirmDelete = () => {
        if (selectedPeriode) {
            console.log('userselectione', selectedPeriode.id); 
            deletePeriode(selectedPeriode.id); 
            setIsModalOpen(false);
        } else {
            console.log('Aucun hôtel sélectionné'); 
        }
    };
    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    return (
        <>
            <div className="w-full mb-13 px-4 pt-8 mt-20">
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
                                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Rechercher des utilisateurs..."
                                            required
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)} 
                                        />
                                    </div>
                                </form>
                
                
                                <Button
                                    onClick={() => navigate(`/Daschbordb2b/AjouterPeriode/${hotelId}`)}
                                    icon={faPlus}
                                    label="Ajouter un Periode"
                                    bgColor="bg-palette-greenajou"
                                    hoverBgColor="hover:bg-palette-green"
                                    textColor="text-white"
                                />
                            </div>
                <Table
                    color="dark"
                    title="Periodes"
                    columns={columns}
                    data={filteredData}
                    Update={handleUpdate}
                    ondelete={handleDelete}
                />
                <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Supprimer la Periode"
                message={`Voulez-vous vraiment supprimer la Periode a le prix   ${selectedPeriode?.Prix} ?`}
                confirmText="Oui, supprimer"
                cancelText="Annuler"
                animationDirection="fadeIn"
            />
            </div>
        </>
    )
}