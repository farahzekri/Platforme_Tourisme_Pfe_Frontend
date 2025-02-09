import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-palette-green p-8 rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-3xl text-black font-bold mb-4">Accès non autorisé</h1>
        <p className="text-lg text-black mb-6 text-center">
        Vous n'avez pas les privilèges nécessaires pour accéder à cette page.
        </p>
        <button
          onClick={handleGoBack}
          className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 focus:outline-none"
        >
          Retourner
        </button>
      </div>

     
    </div>
   
  
  );
};

export default Unauthorized;