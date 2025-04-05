import { useState } from "react";
import { useUpdateB2BPassword } from "views/hooks/use";
import ActionCard from "./Actioncard";
import { useGetB2BByidAgence } from "views/hooks/use";
import { useParams } from "react-router-dom";
import InputWithIcon from "views/Frontoffice/composant/input";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Alert from "components/Alert/Alert";

const UpdatePassword = () => {
    const { id } = useParams();
    const { data: agence, isLoading: isLoadingAgence } = useGetB2BByidAgence(id);
    const [formData, setFormData] = useState({ email: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    const { mutate: updatePassword, isLoading } = useUpdateB2BPassword();
    const [alert, setAlert] = useState({ message: "", type: "" });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            setAlert({ message: "Les mots de passe ne correspondent pas !", type: "error" });
            return;
        };
        try{
            await updatePassword({ email: formData.email, oldPassword: formData.oldPassword, newPassword: formData.newPassword });
        setAlert({ message: "Mot de passe mises à jour avec succès !", type: "success" });
        setTimeout(() => {
            setAlert({ message: "", type: "" });
           
        }, 3000);

        }catch(error){
            console.error("Erreur lors de la mise à jour :", error);
            setAlert({ message: "Erreur lors de la mise à jour. Veuillez réessayer.", type: "error" });
            setTimeout(() => setAlert({ message: "", type: "" }), 5000);

        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 mt-20 pt-20 min-h-screen">
            <div className="w-full md:w-2/3 bg-white shadow-lg p-6 rounded-lg">
                  <Alert message={alert.message} type={alert.type} />
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Changer le mot de passe</h2>
                <p className="text-center text-gray-600  mb-6">Assurez-vous de bien choisir un mot de passe sécurisé.</p>
                <form onSubmit={handleSubmit} className="space-y-4  items-center justify-center">
                    {/* Email */}
                    <InputWithIcon label="Email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope/>}/>
                    
                    {/* Ancien mot de passe */}
                    <InputWithIcon label="Ancien mot de passe" type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} icon={<FaLock/>} />
                    
                    {/* Nouveau mot de passe */}
                    <InputWithIcon label="Nouveau mot de passe" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} icon={<FaLock/>} />
                    
                    {/* Confirmation du mot de passe */}
                    <InputWithIcon label="Confirmer le mot de passe" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} icon={<FaLock/>} />
                    
                    <button
                        type="submit"
                        className="w-full bg-lightBlue-100 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? "Mise à jour..." : "Mettre à jour"}
                    </button>
                </form>
            </div>
            <ActionCard id={id} nameAgence={agence?.nameAgence || ""} status={agence?.status || ""} />
        </div>
    );
};

export default UpdatePassword;
