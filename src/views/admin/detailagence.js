import Card from "components/Cards/simplecard";
import { useParams } from "react-router-dom";

import { FaFileAlt, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useGetB2BByNameAgence } from "views/hooks/use";
import Button from "components/Button/button";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useUpdateB2B } from "views/hooks/use";
import {  useState } from "react";
import Modal from "components/modal/modalformulaire";
import InputField from "components/InputField/inputField";


export default function DetailAgence() {
  const { nameAgence } = useParams();
  const { data: b2bDetails, isLoading, error, refetch } = useGetB2BByNameAgence(nameAgence);
  const UpdateB2B = useUpdateB2B();
  const [modalIsopen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    typeAgence: "",
    contract: {
      startDate: "",
      endDate: "",
      duration: "",
      amount: "",
    }
  });
  
  console.log('reponce ', b2bDetails)
  if (isLoading) return <p className="text-gray-500">Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur lors du chargement de l'agence.</p>;
  const openModal = () => {
    setFormData({ ...b2bDetails });
    setModalIsOpen(true);
  }
  const closeModal = () => {
    setModalIsOpen(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");
  
    if (subfield) {
      setFormData(prevState => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subfield]: value,
        },
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await UpdateB2B.mutateAsync({ nameAgence, ...formData });
    refetch(); 
    closeModal(); 
  };
  return (
    <div className="max-w-xxl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <Card title={`Détails de l'Agence: ${b2bDetails?.nameAgence}`}>

        {/* Informations générales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow icon={<FaEnvelope className="text-blue-500" />} label="Email" value={b2bDetails?.email} />
          <InfoRow icon={<FaPhone className="text-green-500" />} label="Téléphone" value={b2bDetails?.phoneNumber} />
          <InfoRow
            icon={<FaMapMarkerAlt className="text-red-500" />}
            label="Localisation"
            value={`${b2bDetails?.address}, ${b2bDetails?.city}, ${b2bDetails?.country}`}
          />
          <InfoRow label="Type d'agence" value={b2bDetails?.typeAgence} />
        </div>

        {/* Documentation */}
        <div>
          <h3 className="text-lg font-bold mb-2">Documents :</h3>
          {b2bDetails?.documents?.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {b2bDetails.documents.map((doc, index) => (
                <li key={index} className="flex items-center text-blue-600">
                  <FaFileAlt className="mr-2" />
                  <a href={doc} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {doc}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun document disponible.</p>
          )}
        </div>
        {b2bDetails?.status === "approved" && b2bDetails?.contract && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Détails du Contrat :</h3>
            <InfoRow label="Date de début" value={new Date(b2bDetails.contract.startDate).toLocaleDateString()} />
            <InfoRow label="Date de fin" value={new Date(b2bDetails.contract.endDate).toLocaleDateString()} />
            <InfoRow label="Durée" value={`${b2bDetails.contract.duration} mois`} />
            <InfoRow label="Montant" value={`${b2bDetails.contract.amount} TND`} />
            <div className="mt-2">
              <a
                href={b2bDetails.contract.contractFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <FaFileAlt className="mr-2" />
                Voir le contrat
              </a>
            </div>
          </div>
        )}

        {/* Statut avec badge */}
        <div className="flex items-center space-x-2 mt-5">
          <span className="font-medium">Statut :</span>
          <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold 
          ${b2bDetails?.status === "approved" ? "bg-palette-green" :
              b2bDetails?.status === "pending" ? "bg-yellow-500" :
                "bg-red-500"}`}
          >
            {b2bDetails?.status}
          </span>


          <div className=" pl-5">
            <Button
              onClick={openModal}
              icon={faPenToSquare}
              label="Modification"
              bgColor="bg-palette-greenajou"
              hoverBgColor="hover:bg-palette-green"
              textColor="text-white"
            />

          </div>
        </div>

      </Card>
      <Modal
        isOpen={modalIsopen}
        onClose={closeModal}
        title="Modification Agence"
        size="xl"
      >
        <div className="flex w-full  gap-2">
          <InputField
            label="Email"
            type="email"
            icon="fas fa-envelope"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"

          />
          <InputField
            label=" téléphone"
            type="tel"
            icon="fas fa-phone"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="Phone Number"

          />
        </div>
        <div className="flex w-full gap-4">
          <InputField
            label="Adresse"
            type="text"
            icon="fas fa-map-marker-alt"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="adresse"

          />
          <InputField
            label="Ville"
            type="text"
            icon="fas fa-city"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="city"

          />

          <InputField
            label="Pays"
            type="text"
            icon="fas fa-globe"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            placeholder="country"

          />
        </div>
        {b2bDetails?.status === "approved" &&  b2bDetails?.contract &&(
          <>
            <InputField
              label="Date de début"
              type="date"
              name="contract.startDate"
             value={formData.contract?.startDate ? formData.contract.startDate.split('T')[0] : ""} 
              onChange={handleChange}
            />
            <InputField
              label="Date de fin"
              type="date"
              name="contract.endDate"
              value={formData.contract?.endDate ? formData.contract.endDate.split('T')[0] : ""}
              onChange={handleChange}
              placeholder=""

            />
            <InputField
              label="Dure"
              type="text"
              icon=""
              name="Dure"
              value={formData.contract?.duration || ""}
              onChange={handleChange}


            />
            <InputField
              label="Amount"
              type="text"
              icon="fas fa-ha-holding-dollar"
              name="Dure"
              value={formData.contract?.amount || ""}
              onChange={handleChange}


            />

          </>
        )}
        <button onClick={handleSubmit} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enregistrer</button>
        <button onClick={closeModal} className="ml-2 text-gray-500">Annuler</button>



      </Modal>



    </div>
  );
}

// Composant pour afficher une ligne d'information avec icône
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm">
    {icon && <div className="mr-3 text-lg">{icon}</div>}
    <div>
      <span className="font-medium text-gray-700">{label} :</span>
      <p className="text-gray-600 ml-2">{value}</p>
    </div>
  </div>
);