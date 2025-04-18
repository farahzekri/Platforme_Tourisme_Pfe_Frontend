import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faMoneyCheck, faMoneyCheckDollar, faPen, faPersonShelter, faTrashCan, faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";



// import TableDropdown from "components/Dropdowns/TableDropdown.js";

const Table = ({
    columns = [],
    data = [],
    color = "light",
    title = "Card Table",
    onAccept = () => { },
    onReject = () => { },
    onViewdetail = () => { },
    ondelete = () => { },
    Update = () => { },
    onPeriode = () => { },
    OnRooms = () => { },
    OnReservation = () => { },
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Récupération des données à afficher pour la page actuelle
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    return (
        <div
            className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl " +
                (color === "light" ? "bg-white" : "bg-lightBlue-450 text-white")
            }
        >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className={
                                "font-semibold text-lg " +
                                (color === "light" ? "text-blueGray-700" : "text-white")
                            }
                        >
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-450 text-lightBlue-200 border-lightBlue-700")
                                    }
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    >
                                        {/* Affichage spécifique pour la colonne "Statut" */}
                                        {column === "Statut" ? (
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={row[column] === "active"}
                                                    readOnly
                                                />
                                                <div
                                                    className={`group peer ring-0 rounded-full outline-none duration-300 w-16 h-8 shadow-md flex items-center px-1
                                                    ${row[column] === "active" ? "bg-emerald-500 justify-end" : "bg-palette-orangefonce justify-start"}
                                                    peer-focus:outline-none`}
                                                >
                                                    <div
                                                        className={`w-6 h-6 bg-white rounded-full flex justify-center items-center text-lg font-bold
                                                     transition-transform duration-300 ${row[column] === "active" ? "rotate-0" : "-rotate-180"}`}
                                                    >
                                                        {row[column] === "active" ? "✔️" : "✖️"}
                                                    </div>
                                                </div>
                                            </label>
                                        ) : column === "Action" ? (
                                            /* Affichage spécifique pour la colonne "Action" */
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => onAccept(row)}
                                                    className="flex items-center text-palette-customgreenfonce text-green-500 hover:text-palette-customgreen"
                                                >
                                                    <FontAwesomeIcon icon={faUserCheck} className="text-palette-customgreenfonce hover:text-palette-customgreen text-lg mr-2" />
                                                    <span className="text-xs font-semibold">Accepté</span>
                                                </button>
                                                <button
                                                    onClick={() => onReject(row)}
                                                    className="flex items-center text-palette-orangefonce hover:text-palette-orange"
                                                >
                                                    <FontAwesomeIcon icon={faUserXmark} className="text-palette-orangefonce hover:text-palette-orange text-lg mr-2" />
                                                    <span className="text-xs font-semibold">Rejetée</span>
                                                </button>
                                                <button
                                                    onClick={() => onViewdetail(row)}// Ajoute ta fonction onViewDetails
                                                    className="flex items-center  "
                                                >
                                                    <FontAwesomeIcon icon={faEye} style={{ color: "#e9c46a", }} className="text-lg" />

                                                </button>
                                            </div>
                                        ) : column === "Actions" ? (
                                            <div className="flex items-center space-x-4">
                                                <div className="relative group">
                                                    <button
                                                        onClick={() => onViewdetail(row.id)}// Ajoute ta fonction onViewDetails
                                                         className="flex items-center text-[#e9c46a] hover:text-[#e6d7b4] transition duration-200"
                                                      
                                                    >
                                                        <FontAwesomeIcon icon={faEye}  className="text-lg" />

                                                    </button>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Voir le détail
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <button
                                                        onClick={() => Update(row.id)}// Ajoute ta fonction onViewDetails
                                                       className="flex items-center text-[#74c6ec] hover:text-[#aad4e7] transition duration-200"
                                                       
                                                    >

                                                        <FontAwesomeIcon icon={faPen} className="text-lg" />
                                                    </button>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Modifier l'hôtel
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <buton
                                                        onClick={() => onPeriode(row.id)}// Ajoute ta fonction onViewDetails
                                                         className="flex items-center text-[#db5fec] hover:text-[#f3d8eb] transition duration-200"

                                                    >
                                                        <FontAwesomeIcon icon={faMoneyCheck}  className="text-lg"/>
                                                    </buton>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Voir la période de l'hôtel
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <button
                                                        onClick={() => OnRooms(row.id)}// Ajoute ta fonction onViewDetails
                                                        className="flex items-center text-[#ec5fb1] hover:text-[#eca6cf] transition duration-200"

                                                    >

                                                        <FontAwesomeIcon icon={faPersonShelter} className="text-lg" />
                                                    </button>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Chambres disponibles
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <button
                                                        onClick={() => OnReservation(row.id)}
                                                        className="flex items-center text-[#8CB85A] hover:text-green-300 transition duration-200"
                                                    >
                                                        <FontAwesomeIcon icon={faMoneyCheckDollar} className="text-lg" />
                                                    </button>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Voir toutes les réservations
                                                    </div>
                                                </div>
                                                <div className="relative group">
                                                    <button
                                                        onClick={() => ondelete(row)}
                                                        className="flex items-center hover:text-palette-orange "

                                                    >

                                                        <FontAwesomeIcon icon={faTrashCan} className="text-palette-orangefonce hover:text-palette-orange text-lg mr-2" />
                                                    </button>
                                                    <div className="absolute bottom-full mb-2 w-max  px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition duration-200">
                                                        Supprimer l'hôtel
                                                    </div>
                                                </div>
                                            </div>
                                        ) : column === "Supprimer/Modification" ? (
                                            <div className="flex items-center space-x-4">
                                                <button
                                                    onClick={() => ondelete(row)}
                                                    className="flex items-center hover:text-palette-orange "
                                                >

                                                    <FontAwesomeIcon icon={faTrashCan} className="text-palette-orangefonce hover:text-palette-orange text-lg mr-2" />
                                                </button>

                                                <button
                                                    onClick={() => Update(row.id)}// Ajoute ta fonction onViewDetails
                                                    className="flex items-center  "
                                                >

                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                            </div>
                                        ) : (
                                            /* Affichage par défaut pour les autres colonnes */
                                            row[column] || "-"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Précédent
                </button>
                <span>
                    Page {currentPage} sur {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Suivant
                </button>
            </div>

        </div>
    );
};

export default Table;

Table.defaultProps = {
    color: "light",
    onAccept: () => console.log("Accepted!"),
    onReject: () => console.log("Rejected!"),
    onViewdetail: () => console.log("detail"),
    ondelete: () => console.log("delete"),
};

Table.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onViewdetail: PropTypes.func,
    ondelete: PropTypes.func,
};