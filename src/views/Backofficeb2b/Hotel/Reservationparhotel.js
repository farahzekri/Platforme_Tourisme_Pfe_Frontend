import { useGetReservationsByHotel } from "views/hooks/Reservation";
import Table from "../composant/table"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export const Reservation = () => {
    const {hotelId}=useParams();
    const { data, isLoading, error } = useGetReservationsByHotel(hotelId);
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const columns = ["Civility", "Firstname", "Lastname", "Email", "Phone", "paymentMethod", "paymentStatus"];
     useEffect(() => {
            if (Array.isArray(data) && data.length > 0) {
                setTableData(
                    data.map((reser) => ({
                        Civility: reser.reserverCivility,
                        Firstname: reser.reserverFirstname,
                        Lastname: reser.reserverLastname,
                        Email: reser.reserverEmail,
                        Phone: reser.reserverPhone,
                        paymentMethod: reser.paymentMethod,
                        paymentStatus: reser.paymentStatus,
                        
                    }))
                );
            }
        }, [data]);
        const filteredData = tableData.filter((data) => {
            return (
                data.Firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.Lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                data.Phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });
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



                </div>
                <Table
                    color="dark"
                    title="Les Person qui ont fait la Reservation"
                    columns={columns}
                    data={filteredData}
                   

                />
            </div>

        </>
    )
}