import React, { useEffect, useState } from 'react';
 const Alert = ({ type, message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();  // Lorsque l'alerte disparaît, on appelle `onClose` pour la réinitialiser
      }, 3000); // Afficher pendant 1 seconde
  
      return () => clearTimeout(timer);  // Cleanup du timer
    }, [onClose]);
  
    if (!isVisible) return null; // Ne rien rendre si l'alerte ne doit pas être visible
  
    const alertStyles = type === 'success' ? 'bg-[#232531]' : 'bg-[#232531]';
    const iconColor = type === 'success' ? 'text-[#2b9875]' : 'text-[#d65563]';
  
    return (
      <div className={`fixed top-0 left-0 w-full z-40 p-4`}>
        <div className={`${alertStyles} cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg px-4`}>
          <div className="flex gap-2">
            <div className={`${iconColor} bg-white/5 backdrop-blur-xl p-1 rounded-lg`}>
              {type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path>
                </svg>
              )}
            </div>
            <div>
              <p className="text-white">{type === 'success' ? 'done successfully :)' : 'Please try again'}</p>
              <p className="text-gray-500">{message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Alert;