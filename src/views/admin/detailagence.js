import Card from "components/Cards/simplecard";
import { useParams } from "react-router-dom";

import { FaFileAlt, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useGetB2BByNameAgence } from "views/hooks/use";


export default function DetailAgence(){
    const { nameAgence } = useParams();
    const { data: b2bDetails, isLoading, error } = useGetB2BByNameAgence(nameAgence);
    console.log('reponce ',b2bDetails)
  if (isLoading) return <p className="text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur lors du chargement de l'agence.</p>;

  return (
    <div className="p-6">
      <Card title={`Détails de l'Agence: ${b2bDetails?.nameAgence}`}>
        <div className="space-y-4">
          {/* Informations générales */}
          <div className="flex items-center">
            <FaEnvelope className="text-blue-500 mr-2" />
            <span className="font-medium">Email:</span>
            <p className="ml-2">{b2bDetails?.email}</p>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-green-500 mr-2" />
            <span className="font-medium">Téléphone:</span>
            <p className="ml-2">{b2bDetails?.phoneNumber}</p>
          </div>

          {/* Localisation */}
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <span className="font-medium">Localisation:</span>
            <p className="ml-2">
              {b2bDetails?.address}, {b2bDetails?.city}, {b2bDetails?.country}
            </p>
          </div>

          {/* Type d'agence */}
          <div className="flex items-center">
            <span className="font-medium">Type d'agence:</span>
            <p className="ml-2">{b2bDetails?.typeAgence}</p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-lg font-bold">Documents:</h3>
            <ul className="list-disc list-inside">
              {b2bDetails?.documents?.length > 0 ? (
                b2bDetails.documents.map((doc, index) => (
                  <li key={index} className="text-blue-600 flex items-center">
                    <FaFileAlt className="mr-2" />
                    {doc}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Aucun document disponible.</p>
              )}
            </ul>
          </div>

          {/* Statut */}
          <div>
            <span className="font-medium">Statut:</span>
            <p
              className={`ml-2 font-bold ${
                b2bDetails?.status === "approved"
                  ? "text-green-500"
                  : b2bDetails?.status === "pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {b2bDetails?.status}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}