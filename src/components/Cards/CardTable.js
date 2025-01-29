import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan, faUserCheck, faUserXmark } from "@fortawesome/free-solid-svg-icons";



// import TableDropdown from "components/Dropdowns/TableDropdown.js";

const CardTable = ({
  columns = [],
  data = [],
  color = "light",
  title = "Card Table",
  onAccept = () => { },
  onReject = () => { },
  onViewdetail=()=>{ },
  ondelete=()=>{},
}) => {
  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
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
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  >
                    {/* Affichage spécifique pour la colonne "Statut" */}
                    {column === "Statut" && row[column] === "pending" ? (
                      <div className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-orange-500 inline-block mr-2"></span>
                        {row[column]}
                      </div>
                    ) : column === "Action" ? (
                      /* Affichage spécifique pour la colonne "Action" */
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => onAccept(row)}
                          className="flex items-center text-customgreen text-green-500 hover:text-green-600"
                        >
                          <FontAwesomeIcon icon={faUserCheck} className="text-customgreen text-lg mr-2" />
                          <span className="text-xs font-semibold">Accepted</span>
                        </button>
                        <button
                          onClick={() => onReject(row)}
                          className="flex items-center text-red-500 hover:text-red-600"
                        >
                          <FontAwesomeIcon icon={faUserXmark} className="text-red-500 text-lg mr-2" />
                          <span className="text-xs font-semibold">Rejected</span>
                        </button>
                        <button
                          onClick={() => onViewdetail(row)}// Ajoute ta fonction onViewDetails
                          className="flex items-center  "
                        >
                          <FontAwesomeIcon icon={faEye} style={{color: "#FFD43B",}} className="text-lg" />
                          
                        </button>
                      </div>
                       ) : column === "Actions" ? (
                        <button
                        onClick={() => ondelete(row)}
                        className="flex items-center  "
                      >
                       
                       <FontAwesomeIcon icon={faTrashCan} style={{color: "#e64141",}} />
                      </button>
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
    </div>
  );
};

export default CardTable;

CardTable.defaultProps = {
  color: "light",
  onAccept: () => console.log("Accepted!"),
  onReject: () => console.log("Rejected!"),
  onViewdetail:()=>console.log("detail"),
  ondelete:()=>console.log("delete"),
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onViewdetail:PropTypes.func,
  ondelete:PropTypes.func,
};