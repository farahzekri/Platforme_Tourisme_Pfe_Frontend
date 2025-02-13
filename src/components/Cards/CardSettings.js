import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateAdmin } from "views/hooks/admin";

// components

export default function CardSettings() {
  const { mutate: updateAdmin, isLoading } = useUpdateAdmin();
  const email = useSelector((state) => state.auth.email);
  const name = useSelector((state) => state.auth.name);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    newUsername: name || "",
    newEmail: email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdmin(formData, {
      onSuccess: () => {
        setIsEditing(false); 
      },
    });
  };
  return (
    <>
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 mt-20 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Mon compte</h6>
          {!isEditing && (
            <button
              className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
          )}
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations utilisateur
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="newUsername"
                    value={formData.newUsername}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                ) : (
                  <p className="text-blueGray-700 text-sm">{name}</p>
                )}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Email address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="newEmail"
                    value={formData.newEmail}
                    onChange={handleChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                ) : (
                  <p className="text-blueGray-700 text-sm">{email}</p>
                )}
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white font-bold px-4 py-2 rounded mr-3"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-green-500 bg-blue-500 text-white font-bold px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Mise à jour..." : "Enregistrer"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
}
