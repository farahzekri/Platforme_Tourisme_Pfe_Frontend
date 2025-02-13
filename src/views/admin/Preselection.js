import CardTable from "components/Cards/CardTable";
import InputField from "components/InputField/inputField";
import SelectField from "components/InputField/Selectedinputandfield";
import SelectedFile from "components/InputField/selecedfile";
import ConfirmationModal from "components/modal/confirmationModal";
import Modal from "components/modal/modalformulaire";
import React, { useState } from "react";
import { validateFieldRegistre } from "views/auth/validation";
import { useAddAgence } from "views/hooks/use";
import { useGetAllB2BUsers, useUpdateB2BStatus } from "views/hooks/use";
import Alert from "components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button/button";
import { ConfirmationModalSiAccepted } from "components/modal/confirmationModalAccepted";

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
    const { mutate: registerUser } = useAddAgence();
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [contractDetails, setContractDetails] = useState({
        startDate: '',
        endDate: '',
        duration: '',
        amount: '',
    });
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


    const columns = ["NonAgence", "Email", "Statut", "Téléphone", "Date d'inscription", "Action"];



    const handleOpenModal = (user, action) => {
        setSelectedUser(user);
        setModalAction(action);
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        console.log(selectedUser);
        if (!selectedUser.Email) {
            console.error("❌ L'email de l'utilisateur est introuvable !");
            return;
        }
        if (modalAction === "accept") {
            setIsModalOpen(false);
            setIsContractModalOpen(true);
        } else if (modalAction === "reject") {
            updateStatus({
                nameAgence: selectedUser.NonAgence,
                status: "rejetée",
                email: selectedUser.Email
            });
        }
        setIsModalOpen(false);
    };
    // const handleChangecontrar = (e) => {
    //     const { name, value } = e.target;
    //     setContractDetails((prev) => ({ ...prev, [name]: value }));
    // };
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
    const handleContractSubmit = () => {
        updateStatus({
            nameAgence: selectedUser.NonAgence,
            status: "approuvée",
            email: selectedUser.Email,
            ...contractDetails, // Envoi des détails du contrat
        });
        setIsContractModalOpen(false);
    };
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
    const filteredData = b2bUsers.filter((user) => {
        // Recherche par nom, email ou numéro de téléphone
        const matchesSearch =
            user.nameAgence.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phoneNumber.includes(searchTerm);

        // Filtrage par date d'inscription
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const userDate = new Date(user.createdAt);

        const matchesDate =
            dateFilter === "" ||
            (dateFilter === "today" && userDate.toDateString() === today.toDateString()) ||
            (dateFilter === "week" && userDate >= oneWeekAgo) ||
            (dateFilter === "year" && userDate >= oneYearAgo);

        return matchesSearch && matchesDate;
    });


    return (
        <>
            <div className="w-full mb-13 px-4 pt-8 mt-20">
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
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Rechercher des utilisateurs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>


                    </form>
                    <div className="flex gap-2 p-2">
                        {[
                            { value: "today", label: "Aujourd'hui" },
                            { value: "week", label: "Cette semaine" },
                            { value: "year", label: "Cette année" },
                        ].map((option) => (
                            <label key={option.value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="dateFilter"
                                    value={option.value}
                                    checked={dateFilter === option.value}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="sr-only peer"
                                />
                                <div className="flex items-center justify-center h-12 px-4 rounded-xl border-2 border-gray-300 bg-gray-50 transition duration-150 hover:border-blue-400 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400">
                                    <span className="text-gray-500 peer-checked:text-blue-500">
                                        {option.label}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                    {/* Bouton pour ajouter une agence */}

                    <Button
                        onClick={handleOpenModalform}
                        icon={faPlus}
                        label="Ajouter une agence"
                        bgColor="bg-palette-greenajou"
                        hoverBgColor="hover:bg-palette-green"
                        textColor="text-white"
                    />
                </div>
                <CardTable
                    color="dark"
                    title="Utilisateurs B2B"
                    columns={columns}
                    data={filteredData.map((user) => ({
                        NonAgence: user.nameAgence,
                        Email: user.email,
                        Statut: user.status,
                        Téléphone: user.phoneNumber,
                        "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
                    }))}
                    onAccept={(user) => handleOpenModal(user, "accept")}
                    onReject={(user) => handleOpenModal(user, "reject")}
                    onViewdetail={(user) => handleViewDetails(user.NonAgence)}
                />

                <ConfirmationModal
                    isOpen={isModalOpen}
                    message={
                        modalAction === "accept"
                            ? "Etes-vous sûr de vouloir approuver cet utilisateur ?"
                            : "Etes-vous sûr de vouloir rejeter cet utilisateur ?"
                    }
                    onConfirm={handleConfirm}
                    onClose={handleCloseModal}
                    animationDirection="slideInLeft"

                />
                <ConfirmationModalSiAccepted
                    isOpen={isContractModalOpen}
                    onClose={() => setIsContractModalOpen(false)}
                    onSubmit={handleContractSubmit}
                    contractDetails={contractDetails}
                    setContractDetails={setContractDetails}
                />
                <Modal
                    isOpen={isModalOpenform}
                    onClose={handleCloseModalform}
                    title="Ajouter un nouvel Agence"
                    size="xl"
                >

                    <Alert message={alert.message} type={alert.type} />
                    {/* Form content */}
                    <form className="grid grid-cols-2 gap-4">
                        {/* Colonne de gauche */}
                        <div>
                            <InputField
                                label="Non de l'Agence"
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
                                label="Mot de passe "
                                type="password"
                                icon="fas fa-lock"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                error={errors.password}
                            />
                            <InputField
                                label="Telephone"
                                type="tel"
                                icon="fas fa-phone"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                error={errors.phoneNumber}
                            />
                        </div>

                        {/* Colonne de droite */}
                        <div>
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
                                placeholder="Adresse"
                                error={errors.address}
                            />
                            <InputField
                                label="ville"
                                type="text"
                                icon="fas fa-city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                error={errors.city}
                            />
                            <InputField
                                label="Pays"
                                type="text"
                                icon="fas fa-globe"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                placeholder="Country"
                                error={errors.country}
                            />
                        </div>

                        {/* Document en pleine largeur */}
                        <div className="col-span-2">
                            <SelectedFile
                                label="Document"
                                value={formData.documents}
                                onChange={handleChange}
                                error={errors.document}
                                name="documents"
                            />
                        </div>

                        {/* Bouton Submit en pleine largeur */}
                        <div className="col-span-2 flex justify-center">


                            <Button
                                onClick={handleSubmit}
                                icon={faPlus}
                                label="Soumettre"
                                bgColor="bg-palette-greenajou"
                                hoverBgColor="hover:bg-palette-green"
                                textColor="text-white"
                            />
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    )
}