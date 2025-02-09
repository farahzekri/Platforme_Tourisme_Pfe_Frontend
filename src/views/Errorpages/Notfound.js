import React from "react";
import notfoundimg from "../../assets/img/202012_07.jpg"
const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img src={notfoundimg} alt="Page not found" /> 
        </div>
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-6xl text-red-800 font-dark font-extrabold mb-9"> Oups,Voilà qui n'est pas prévu!</div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-9">
             Désolé, nous n'avons pas pu trouver la page que vous recherchez.
          </p>
          <p className="text-lg md:text-2xl font-light leading-normal mb-8">Code d'erreur:404</p>
          <button
            onClick={goBack}
            className="px-5 py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-800 active:bg-red-300 hover:bg-red-600"
          >
            Returné
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;