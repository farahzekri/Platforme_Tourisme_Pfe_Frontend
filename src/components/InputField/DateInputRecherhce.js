import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css"; // Import du CSS
import { French } from "flatpickr/dist/l10n/fr.js"; // Import de la localisation française

const DateInput = ({ label, value, onChange, placeholder, minDate }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            flatpickr(inputRef.current, {
                dateFormat: "Y-m-d", // Format pour le backend
                altInput: true, // Active l'affichage alternatif
                altFormat: "d/m/Y", // Format affiché dans l'input
                locale: French,
                minDate: minDate, // Définit la date minimale sélectionnable
                onChange: (selectedDates, dateStr) => {
                    if (onChange) {
                        onChange(dateStr); // Retourne la date au format Y-m-d
                    }
                },
                onReady: () => {
                    // Appliquer un style personnalisé pour la date actuelle
                    const today = document.querySelector('.flatpickr-day.today');
                    if (today) {
                        today.style.backgroundColor = '#84E1BC'; // Changer la couleur de fond
                        today.style.color = '#fff'; // Changer la couleur du texte (si besoin)
                        today.style.borderColor = '#84E1BC'; // Ajouter une bordure avec la couleur personnalisée
                    }
                    document.querySelector('.flatpickr-calendar').style.fontSize = '18px';
                    document.querySelectorAll('.flatpickr-day').forEach((el) => {
                        el.style.width = '50px';
                        el.style.height = '50px';
                        el.style.lineHeight = '50px';
                    });
                },
            });
        }
    }, [onChange, minDate]);

    return (
        <div className="relative max-w-sm">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative max-w-sm">
                {/* Icône de calendrier */}
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-orange-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>
                {/* Input texte avec le datepicker */}
                <input
                    ref={inputRef}
                    type="text"
                    className=" w-[450px] border border-primary h-20 p-3 pl-5 text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-orange-500 block  ps-10 "
                    placeholder={placeholder}
                    defaultValue={value} // Utiliser defaultValue pour éviter l'erreur de mise à jour
                />
            </div>
        </div>
    );
};

export default DateInput;
