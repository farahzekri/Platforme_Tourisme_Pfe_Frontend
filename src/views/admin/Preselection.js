import CardTable from "components/Cards/CardTable";
import InputField from "components/InputField/inputField";
import SelectField from "components/InputField/Selectedinputandfield";
import SelectedFile from "components/InputField/selecedfile";
import ConfirmationModal from "components/modal/confirmationModal";
import Modal from "components/modal/modalformulaire";
import React, { useState } from "react";
import { validateFieldRegistre } from "views/auth/validation";
import { useRegisterUser } from "views/hooks/use";
import { useGetAllB2BUsers, useUpdateB2BStatus } from "views/hooks/use";
import Alert from "components/Alert/Alert";
import { useNavigate } from "react-router-dom";

export default function Preselction() {
    const { data: b2bUsers = [], isLoading, isError } = useGetAllB2BUsers();
    const { mutate: updateStatus } = useUpdateB2BStatus();
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalAction, setModalAction] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenform, setIsModalOpenform] = useState(false);
    const handleOpenModalform = () => setIsModalOpenform(true);
    const handleCloseModalform = () => setIsModalOpenform(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: "", type: "" });
    const { mutate: registerUser } = useRegisterUser();
    const [searchTerm, setSearchTerm] = useState("");
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
    if (isLoading) return <p>Chargement des utilisateurs...</p>;
    if (isError) return <p>Erreur lors du chargement des utilisateurs.</p>;

   
    const columns = ["nameAgence", "Email", "Statut", "phoneNumber", "Date d'inscription", "Action"];

   
 
    const handleOpenModal = (user, action) => {
        setSelectedUser(user);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        if (modalAction === "accept") {
            updateStatus({ nameAgence: selectedUser.nameAgence, status: "approved" });
        } else if (modalAction === "reject") {
            updateStatus({ nameAgence: selectedUser.nameAgence, status: "rejected" });
        }
        setIsModalOpen(false); // Fermer le modal après confirmation
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
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
    const options = [
        { value: " ", label: "select a type" },
        { value: "travel_agency", label: "Travel agency" },
        { value: "rental_agency", label: "Rental agency" },
        { value: "hotel", label: "Hotel" },
    ];
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
    const handleViewDetails = (nameAgence) => {
        console.log("nameAgence:", nameAgence);
        navigate(`/admin/details/${nameAgence}`);
    }
    const filteredData = b2bUsers.filter((user) => 
        user.nameAgence.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm)
    );
    return (
        <>
            <div className="w-full mb-13 px-4 pt-5 mt-20">
                <div className="flex justify-between items-center mb-4 space-x-4">

                    {/* Barre de recherche */}
                    <form className="relative w-2/3">
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Rechercher des utilisateurs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* Bouton pour ajouter une agence */}
                    <button
                        onClick={handleOpenModalform}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                    >
                        Ajouter une agence
                    </button>

                </div>
                <CardTable
                    color="dark"
                    title="Utilisateurs B2B"
                    columns={columns}
                    data={filteredData.map((user) => ({
                        nameAgence: user.nameAgence,
                        Email: user.email,
                        Statut: user.status,
                        phoneNumber: user.phoneNumber,
                        "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
                    }))}
                    onAccept={(user) => handleOpenModal(user, "accept")}
                    onReject={(user) => handleOpenModal(user, "reject")}
                    onViewdetail={(user) => handleViewDetails(user.nameAgence)}
                />

                <ConfirmationModal
                    isOpen={isModalOpen}
                    message={
                        modalAction === "accept"
                            ? "Are you sure you want to approve this user?"
                            : "Are you sure you want to reject this user?"
                    }
                    onConfirm={handleConfirm}
                    onClose={handleCloseModal}
                    
                />
                <Modal
                    isOpen={isModalOpenform}
                    onClose={handleCloseModalform}
                    title="Add New Admin"
                >

                    <Alert message={alert.message} type={alert.type} />
                    {/* Form content */}
                    <form className="space-y-4">
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
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full px-5 py-2.5 text-white bg-red-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
                        >
                            Submit
                        </button>
                    </form>
                </Modal>
            </div>
        </>
    )
}