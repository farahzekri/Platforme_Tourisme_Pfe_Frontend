import React, { useState } from "react";
import { useRegisterUser } from "views/hooks/use";

import { useNavigate } from "react-router-dom";
import { validateFieldRegistre } from "./validation";
import SelectField from "components/InputField/Selectedinputandfield";
import InputField from "components/InputField/inputField";
import SelectedFile from "components/InputField/selecedfile";
import Alert from "components/Alert/Alert";
export default function Registeragence() {
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [formData, setFormData] = useState({
        nameAgence: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
        documents: "",
        typeAgence: "",

    });
    const { mutate: registerUser } = useRegisterUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const errorMessage = validateFieldRegistre(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };
    const handleSelectChange = (value) => {
        setFormData({
            ...formData,
            typeAgence: value, // Met à jour le type d'agence dans le formData
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateFieldRegistre(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);



        if (Object.keys(newErrors).length > 0) {

            setAlert({ message: "Please correct any errors before submitting !", type: "error" });
            return;
        }


        registerUser(formData, {
            onSuccess: (data) => {
                setAlert({ message: "User registered successfully !", type: "success" });
                console.log("Utilisateur enregistré :", data);


                setTimeout(() => {
                    navigate("/auth/login");
                }, 3000);
            },
            onError: (error) => {
                console.error("Erreur d'enregistrement :", error);
                setAlert({ message: "Registration failed !", type: "error" });
                setTimeout(() => {
                    setAlert({ message: "", type: "" }); // Cacher l'alerte après 3 secondes
                }, 3000);
            },
        });
    };

    const options = [
        { value: " ", label: "select a type" },
        { value: "travel_agency", label: "Travel agency" },
        { value: "rental_agency", label: "Rental agency" },
        { value: "hotel", label: "Hotel" },
    ];
    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">
                                        Sign up with
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={require("assets/img/github.svg").default}
                                        />
                                        Github
                                    </button>
                                    <button
                                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        <img
                                            alt="..."
                                            className="w-5 mr-1"
                                            src={require("assets/img/google.svg").default}
                                        />
                                        Google
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center mb-3 font-bold">
                                    <small>Or sign up with credentials</small>
                                </div>
                                <Alert message={alert.message} type={alert.type} />
                                <form>
                                    <InputField
                                        label="Name Agence"
                                        type="text"
                                        icon="fas fa-user"
                                        name="nameAgence"
                                        value={formData.nameAgence}
                                        onChange={handleChange}
                                        placeholder="Name Agence"
                                        error={errors.nameAgence}
                                    />
                                    <InputField
                                        label="Email"
                                        type="email"
                                        icon="fas fa-envelope"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        error={errors.email}
                                    />
                                    <InputField
                                        label="Password"
                                        type="password"
                                        icon="fas fa-lock"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        error={errors.password}
                                    />
                                    <InputField
                                        label="Phone Number"
                                        type="tel"
                                        icon="fas fa-phone"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        error={errors.phoneNumber}
                                    />
                                    <SelectField
                                        label="Type d'agence"
                                        options={options}
                                        value={formData.typeAgence}
                                        onChange={handleSelectChange}
                                        icon="fas fa-building" 
                                        error={formData.typeAgence === "" && formData.typeAgence !== "other" ? "Please select an agency type." : ""}
                                    />
                                    <InputField
                                        label="Adresse"
                                        type="text"
                                        icon="fas fa-map-marker-alt"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="adresse"
                                        error={errors.address}
                                    />
                                    <InputField
                                        label="City"
                                        type="text"
                                        icon="fas fa-city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="city"
                                        error={errors.city}
                                    />
                                    <InputField
                                        label="Country"
                                        type="text"
                                        icon="fas fa-globe"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="country"
                                        error={errors.country}
                                    />
                                    <SelectedFile
                                        label="Document"
                                        value={formData.documents}
                                        onChange={handleChange}
                                        error={errors.document}
                                        name="documents"
                                    />
                                    <div>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                                            />
                                            <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                                I agree with the{" "}
                                                <a
                                                    href="#pablo"
                                                    className="text-lightBlue-500"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    Privacy Policy
                                                </a>
                                            </span>
                                        </label>
                                    </div>

                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Create Account pro
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}