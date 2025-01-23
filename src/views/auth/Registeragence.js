import React, { useState } from "react";
import { useRegisterUser } from "views/hooks/use";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateFieldRegistre } from "./validation";
export default function Registeragence() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nameAgence: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",

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
            toast.error("Veuillez corriger les erreurs avant de soumettre !");
            return;
        }


        registerUser(formData, {
            onSuccess: (data) => {
                toast.success("Utilisateur enregistré avec succès !");
                console.log("Utilisateur enregistré :", data);


                setTimeout(() => {
                    navigate("/auth/login");
                }, 3000);
            },
            onError: (error) => {
                console.error("Erreur d'enregistrement :", error);
                toast.error("L'enregistrement a échoué !");
            },
        });
    };
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
                                <form>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Name Agence
                                        </label>
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <input
                                            type="name"
                                            name="nameAgence"
                                            value={formData.nameAgence}
                                            onChange={handleChange}
                                            className={`px-2 py-1  placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.email ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="Name"
                                        />
                                        {errors.nameAgence && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.nameAgence}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Email
                                        </label>
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.email ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="Email"
                                        />
                                         {errors.email && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Password
                                        </label>
                                        <span class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i class="fas fa-lock"></i>
                                        </span>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.password ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="Password"
                                        />
                                          {errors.password && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="phone-number"
                                        >
                                            Phone Number
                                        </label>
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i className="fas fa-phone"></i>
                                        </span>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.phoneNumber ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="Phone Number"
                                        />
                                        {errors.phoneNumber && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.phoneNumber}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="phone-number"
                                        >
                                            adresse
                                        </label>
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i className="fas fa-map-marker-alt"></i>
                                        </span>
                                        <input
                                            type="tel"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.address ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="adresse"
                                        />
                                        {errors.address && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.address}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="phone-number"
                                        >
                                            city
                                        </label>
                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i class="fas fa-city"></i>
                                        </span>
                                        <input
                                            type="tel"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.city ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="city"
                                        />
                                         {errors.city && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.city}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="phone-number"
                                        >
                                            country
                                        </label>

                                        <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-700 bg-transparent rounded text-base items-center justify-center w-8 pl-2 py-1">
                                            <i class="fas fa-globe"></i>
                                        </span>
                                        <input
                                            type="tel"
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className={`px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10 ${errors.country ? 'border-red-500 bg-red-50' : ''
                                            }`}
                                            placeholder="country"
                                        />
                                        {errors.country && (
                                            <p className="mt-2 text-sm text-red-300">
                                                <span className="font-medium ">Erreur:</span> {errors.country}
                                            </p>
                                        )}
                                    </div>

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