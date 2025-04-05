import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaKey } from "react-icons/fa";

const ActionCard = ({ id, nameAgence, status }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full md:w-1/3 bg-white shadow-lg p-6 rounded-xl flex flex-col gap-6 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-center text-gray-800">Paramètres</h2>
            <hr className="border-gray-300" />

            {/* Carte Agence */}
            <div className="relative bg-gradient-to-r from-lightBlue-100 to-lightBlue-200 p-6 rounded-lg text-white shadow-md">
                {/* SVG Responsable animé */}
                <div className="absolute -top-6 right-4 w-24 opacity-90 animate-bounce">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        fill="currentColor"
                        className="w-20 h-20"
                    >
                        <circle cx="32" cy="32" r="30" fill="#f4f4f4" />
                        <circle cx="32" cy="24" r="8" fill="#333" />
                        <rect x="22" y="36" width="20" height="12" rx="6" fill="#333" />
                        <path d="M26 48c-8 4-12 8-12 10h36c0-2-4-6-12-10" fill="#666" />
                    </svg>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{nameAgence}</h3>
                    {status === "approuvée" ? (
                        <p className="text-sm flex items-center gap-1">
                            🎉 Votre agence est approuvée et active sur notre plateforme !
                        </p>
                    ) : (
                        <p className="text-sm">⏳ En attente de validation par le super-admin...</p>
                    )}
                </div>

                {status === "approuvée" && (
                    <div className="mt-3 text-sm bg-white bg-opacity-20 p-3 rounded-md">
                        ✅ Félicitations ! Si vous avez des questions, contactez notre support. 📞
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
                <button
                    className="p-4 bg-lightBlue-700 hover:bg-lightBlue-400 text-white rounded-lg shadow-md flex items-center justify-between cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => navigate(`/Daschbordb2b/Parametre/${id}`)}
                >
                    <span>Mettre à jour le profil</span>
                    <FaUserEdit className="text-2xl" />
                </button>

                <button
                    className="p-4 bg-lightBlue-700 hover:bg-lightBlue-400 text-white rounded-lg shadow-md flex items-center justify-between cursor-pointer transition-transform transform hover:scale-105"
                    onClick={() => navigate(`/Daschbordb2b/changementmotdepase/${id}`)}
                >
                    <span>Changer le mot de passe</span>
                    <FaKey className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default ActionCard;
