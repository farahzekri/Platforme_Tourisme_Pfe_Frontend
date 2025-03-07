import InputField from "components/InputField/inputField";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "views/hooks/use";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { mutate: sendPasswordResetEmail, isLoading } = useSendPasswordResetEmail();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            sendPasswordResetEmail(email);
        } else {
            alert("Veuillez saisir un email !");
        }
    };

    return (
        <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-blueGray-500 text-sm font-bold">
                                  Mot de passe oublié
                                </h6>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-blueGray-400 text-center mb-3 font-bold">
                                <small>veuillez entrer votre nom d'utilisateur ou votre adresse e-mail, vous recevrez un lien pour créer un nouveau mot de passe par e-mail</small>
                            </div>



                            <form>
                                <InputField
                                    label=" Ton Email"
                                    type="email"
                                    icon="fas fa-envelope"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"

                                />

                              

                                <div className="text-center mt-6">
                                    <button
                                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Envoi en cours..." : "Envoyer l'email"}
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

export default ForgotPassword;