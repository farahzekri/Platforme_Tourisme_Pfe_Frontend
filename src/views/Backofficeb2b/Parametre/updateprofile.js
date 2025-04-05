import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateB2BInfo, useGetB2BByidAgence } from "views/hooks/use";
import { FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaFile, FaUserEdit, FaKey } from "react-icons/fa";
import InputWithIcon from "views/Frontoffice/composant/input";
import ActionCard from "./Actioncard";
import FileUploaderComponent from "./fileuplode";
import Alert from "components/Alert/Alert";


const UpdateAgence = () => {
  const { id } = useParams();
  const { mutate: updateB2B, isLoading } = useUpdateB2BInfo();
  const { data: agence, isLoading: isLoadingAgence } = useGetB2BByidAgence(id);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    nameAgence: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    documents: "",
    typeAgence: "",
  });

  useEffect(() => {
    if (agence) {
      setFormData({
        nameAgence: agence.nameAgence || "",
        email: agence.email || "",
        phoneNumber: agence.phoneNumber || "",
        address: agence.address || "",
        city: agence.city || "",
        country: agence.country || "",
        documents: agence.documents || "",
        typeAgence: agence.typeAgence || "",
      });
    }
  }, [agence]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileUpload = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: files, // On stocke uniquement les URLs Cloudinary
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
        ...formData,
        documents: formData.documents || [], // Envoyer uniquement les URLs
    };

    try {
        await updateB2B({ id, updatedData });
        
        setAlert({ message: "Informations mises à jour avec succès !", type: "success" });
        setTimeout(() => {
            setAlert({ message: "", type: "" });
           
        }, 3000);
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        setAlert({ message: "Erreur lors de la mise à jour. Veuillez réessayer.", type: "error" });
        setTimeout(() => setAlert({ message: "", type: "" }), 5000);
    }
};

  

  if (isLoadingAgence) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 mt-20 pt-20 min-h-screen">
     
      <div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-lg">
      <Alert message={alert.message} type={alert.type} />
        <h2 className="text-xl font-semibold mb-4">Modifier les informations de l'agence</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon label="Nom de l'agence" name="nameAgence" value={formData.nameAgence} onChange={handleChange} icon={<FaBuilding />} />
          <InputWithIcon label="Email" type="email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} />
          <InputWithIcon label="Téléphone" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} icon={<FaPhone />} />
          <InputWithIcon label="Adresse" type="text" name="address" value={formData.address} onChange={handleChange} icon={<FaMapMarkerAlt />} />
          <InputWithIcon label="Ville" type="text" name="city" value={formData.city} onChange={handleChange} icon={<FaMapMarkerAlt />} />
          <InputWithIcon label="Pays" type="text" name="country" value={formData.country} onChange={handleChange} icon={<FaGlobe />} />
          <FileUploaderComponent label="Documents justificatifs" existingFiles={formData.documents} onFilesChange={handleFileUpload} />
          <button type="submit" disabled={isLoading} className="w-full bg-lightBlue-100 hover:bg-blue-700 justify-end text-white font-semibold py-2 rounded-lg transition-all">
            Mettre à jour
          </button>
        </form>
      
      </div>
    

      <ActionCard id={id} nameAgence={agence.nameAgence} status={agence.status}/>
    </div>
  );
};

export default UpdateAgence;
