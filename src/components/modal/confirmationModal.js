import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message,
  confirmText = "Oui",
  cancelText = "Non",
  animationDirection = '', // Add animation direction prop
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn"
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full max-w-md p-8 animate-${animationDirection}`}
      >
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          {title}
        </h3>
        <p className="mt-3 text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="py-2 px-6 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            {cancelText}
          </button>
          <button
            className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            onClick={onConfirm}
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
