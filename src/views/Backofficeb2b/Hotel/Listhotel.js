
import { useGetHotels } from "views/hooks/Hotel";
import Table from "../composant/table";
import { useEffect, useState } from "react";
import Button from "components/Button/button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const HotelListDachbord = () => {
    const { data: hotels, isLoading, error } = useGetHotels();
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();


    const columns = ["Nom de l'hôtel", "Pays", "Ville", "min Age d'enfant", "Max Age d'enfant", "Statut", "Actions"];
    useEffect(() => {
        if (Array.isArray(hotels) && hotels.length > 0){
            setTableData(
                hotels.map((hotel) => ({
                    id: hotel._id,
                    "Nom de l'hôtel": hotel.name,
                    Pays: hotel.country,
                    Ville: hotel.city,
                    "min Age d'enfant": hotel.minChildAge,
                    "Max Age d'enfant": hotel.maxChildAge,
                    Statut: hotel.status,
                    Actions: hotel._id,
                }))
            );
        }
    }, [hotels]);
    const handleUpdate = (id) => {
        navigate(`/Daschbordb2b/AjouterHotel?edit=true&id=${id}`);
    };
    const handelonperiode=(id)=>{
        navigate(`/Daschbordb2b/ListePeriodeParhotel/${id}`)
    }
    if (isLoading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
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
                        />
                    </div>
                </form>


                <Button
                    onClick={() => navigate("/Daschbordb2b/AjouterHotel")}
                    icon={faPlus}
                    label="Ajouter un Hotel"
                    bgColor="bg-palette-greenajou"
                    hoverBgColor="hover:bg-palette-green"
                    textColor="text-white"
                />
            </div>
            <Table
                color="dark"
                title="Hôtels"
                columns={columns}
                data={tableData}
                Update={handleUpdate}
                onPeriode={handelonperiode}


            />
        </div>
    );
};
