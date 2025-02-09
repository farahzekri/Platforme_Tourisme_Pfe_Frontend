import React from "react";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  if (!isOpen) return null;

  // Classes pour les différentes tailles de modal
  const modalSizeClasses = {
    md: "max-w-md",  // Taille moyenne
    lg: "max-w-lg",  // Taille large
    xl: "max-w-xl",  // Taille extra large
    xxl: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-hidden="true"
    >
      <div
        className={`relative w-full ${modalSizeClasses[size]} p-6 bg-white rounded-xl shadow-xl dark:bg-gray-800`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-300 dark:border-gray-600">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 p-2 rounded-lg transition-all ease-in-out duration-300 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
