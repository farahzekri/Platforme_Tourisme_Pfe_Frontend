import Alert from "components/Alert/Alert";
import CardTable from "components/Cards/CardTable";
import InputField from "components/InputField/inputField";
import SelectFieldsimple from "components/InputField/selected";

import Modal from "components/modal/modalformulaire";
import { useState } from "react";
import { validateFieldRegistre } from "views/auth/validation";
import { useCreateAdmin } from "views/hooks/admin";

import { useGetAllAdmins } from "views/hooks/admin";






export default function ListAdmin() {
    const { data: admins = [], isLoading, isError } = useGetAllAdmins();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    if (isLoading) return <p>Chargement des admin...</p>;
    if (isError) return <p>Erreur lors du chargement des admin.</p>;

    const columns = ["username", "Email", "privilege", "Date d'inscription"];

    const tableData = admins.map((user) => ({
        username: user.username,
        Email: user.email,
        privilege: user.privilege,
        "Date d'inscription": new Date(user.createdAt).toLocaleDateString(),
    }));

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

                    setAlert({ message: "Please correct any errors before submitting !", type: "error" });
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
            
            setAlert({ message: "Registration failed !", type: "error" });
        }
    };

    const options = [
       
        { value: "privilege de add", label: "privilege de add" },
        { value: "provilege de supprime", label: "provilege de supprime " },

    ];
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
                                required
                            />
                        </div>
                    </form>

                    {/* Bouton pour ajouter une agence */}
                    <button
                        onClick={handleOpenModal}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                    >
                        Ajouter un admin
                    </button>

                </div>
                <CardTable
                    color="dark"
                    title="Admin"
                    columns={columns}
                    data={tableData}

                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Add New Admin"
                >
                     <Alert message={alert.message} type={alert.type} />
                    {/* Form content */}
                    <form className="space-y-4">
                        <InputField
                            label="username"
                            type="text"
                            icon="fas fa-user"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="username"
                            error={errors.username}
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
                            placeholder="password"
                           error={errors.password}
                        />
                        
                        <SelectFieldsimple
                            label="privilege"
                            options={options}
                            name="privilege"
                            value={formData.privilege}
                            onChange={handleSelectChange}
                            icon="fas fa-unlock"
                             error={formData.privilege === "" ? "Please select an privilege type." : ""}
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