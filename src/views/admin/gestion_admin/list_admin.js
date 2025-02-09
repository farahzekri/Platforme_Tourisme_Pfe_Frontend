import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Alert from "components/Alert/Alert";
import Button from "components/Button/button";
import CardTable from "components/Cards/CardTable";
import InputField from "components/InputField/inputField";
import SelectFieldsimple from "components/InputField/selected";
import ConfirmationModal from "components/modal/confirmationModal";

import Modal from "components/modal/modalformulaire";
import { useEffect, useState } from "react";
import { validateFieldRegistre } from "views/auth/validation";
import { useDeleteAdmin } from "views/hooks/admin";
import { useCreateAdmin } from "views/hooks/admin";
import { useGetAllAdmins } from "views/hooks/admin";
export default function ListAdmin() {
    const { data: admins = [], isLoading, isError } = useGetAllAdmins();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const deleteAdminMutation = useDeleteAdmin(selectedUser?.username);
    const [isModalOpenconfirm, setIsModalOpenconfirm] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "admin",
        privilege: "",


    });
    

    const createAdminMutation = useCreateAdmin();
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ message: "", type: "" });

    useEffect(() => {
        if (admins.length > 0) {
            setTableData(
                admins.map((user) => ({
                    id: user._id,
                    Name_Utlisateur: user.username,
                    Email: user.email,
                    privilege: user.privilege,
                    "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
                }))
            );
        }
    }, [admins]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    if (isLoading) return <p>Chargement des admin...</p>;
    if (isError) return <p>Erreur lors du chargement des admin.</p>;

    const columns = ["Name_Utlisateur", "Email", "privilege", "Date d'inscription", "Actions"];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const errorMessage = validateFieldRegistre(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));


    };
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            privilege: value,
        });
    }
    const handleSubmit = async (e) => {
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

            setAlert({ message: "Veuillez corriger les éventuelles erreurs avant de soumettre !", type: "error" });
            return;
        }

        try {

            await createAdminMutation.mutateAsync(formData);
            setFormData({
                username: "",
                email: "",
                password: "",
                role: "admin", // Réinitialiser à "admin"
                privilege: "", // Réinitialiser à "read-only"
            });
        } catch (error) {

            setAlert({ message: "Erreur d'enregistrement :!", type: "error" });
        }
    };

    const options = [

        { value: "privilege de add", label: "privilege de add" },
        { value: "provilege de supprime", label: "provilege de supprime " },

    ];
    const handleOpenModalconfrm = (user) => {
        console.log("User selected:", user);
        setSelectedUser(user);
        setIsModalOpenconfirm(true);
    };
    const handleCloseModalconfirme = () => {
        setIsModalOpenconfirm(false);
    };

    const handleConfirm = async () => {
        if (!selectedUser) return;

        console.log("Admin username to delete:", selectedUser.username); // Now using username
        try {

            await deleteAdminMutation.mutateAsync(selectedUser.username);
            setTableData((prevData) =>
                prevData.filter((user) => user.username !== selectedUser.username)
            );

            setIsModalOpenconfirm(false);
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
        }
    }
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
                                required
                            />
                        </div>
                    </form>


                    <Button
                        onClick={handleOpenModal}
                        icon={faPlus}
                        label="Ajouter un compte"
                        bgColor="bg-palette-greenajou"
                        hoverBgColor="hover:bg-palette-green"
                        textColor="text-white"
                    />
                </div>
                <CardTable
                    color="dark"
                    title="Admin"
                    columns={columns}
                    data={tableData}
                    ondelete={(user) => handleOpenModalconfrm(user)}

                />

                <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Ajouter un nouvel administrateur" size="md">
                    {/* Alert Message */}
                    {alert.message && (
                        <Alert message={alert.message} type={alert.type} />
                    )}

                    {/* Form content */}
                    <form className="space-y-6 mt-4">
                        {/* Username Input */}
                        <InputField
                            label="Non d'utlisateur"
                            type="text"
                            icon="fas fa-user"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            error={errors.username}
                        />

                        {/* Email Input */}
                        <InputField
                            label="Email"
                            type="email"
                            icon="fas fa-envelope"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            error={errors.email}
                        />

                        {/* Password Input */}
                        <InputField
                            label="Mote de passe"
                            type="password"
                            icon="fas fa-lock"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            error={errors.password}
                        />

                        {/* Privilege Select */}
                        <SelectFieldsimple
                            label="Privilege"
                            options={options}
                            name="privilege"
                            value={formData.privilege}
                            onChange={handleSelectChange}
                            icon="fas fa-unlock"
                            error={formData.privilege === "" ? "Please select a privilege." : ""}
                        />

                       
                        <div className="flex justify-between items-center  px-20 ml-12">
                        <Button
                        onClick={handleSubmit}
                        icon={faPlus}
                        label="Submit"
                        bgColor="bg-palette-greenajou"
                        hoverBgColor="hover:bg-palette-green"
                        textColor="text-white"
                    />
                    </div>
                    </form>
                </Modal>

                <ConfirmationModal
                    isOpen={isModalOpenconfirm}
                    message="Etes-vous sûr de vouloir supprimer cet utilisateur ?"
                    onConfirm={handleConfirm}
                    onClose={handleCloseModalconfirme}

                />
            </div>
        </>
    )
}