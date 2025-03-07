import InputField from "components/InputField/inputField";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "views/hooks/use";


const ResetPassword = () => {
    const { email } = useParams();  // Récupérer l'email à partir des paramètres d'URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { mutate: resetPassword, isLoading } = useResetPassword();  // Mutation pour réinitialiser le mot de passe
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas !");
        return;
      }
  
      // Appel de la mutation pour réinitialiser le mot de passe
      resetPassword({ email, newPassword });  // Envoie l'email et le nouveau mot de passe
    };
  
    useEffect(() => {
      if (!email) {
        alert("Email manquant.");
        navigate("/");  // Redirection vers la page d'accueil si l'email n'est pas disponible
      }
    }, [email, navigate]);

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-blueGray-500 text-sm font-bold">
                                    Réinitialisation du mot de passe
                                </h6>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                <small>Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.</small>
                            </div>



                            <form>
                                <InputField
                                    label=" Nouveau mot de passe"
                                    type="password"
                                    icon="fas fa-lock"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your password"

                                />
                                <InputField
                                    label=" Confiration de mot de passe "
                                    type="password"
                                    icon="fas fa-lock"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmer le mot de passe"

                                />



                                <div className="text-center mt-6">
                                    <button
                                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
                                    </button>
                                </div>


                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
