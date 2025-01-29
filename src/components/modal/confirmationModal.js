import React from "react";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirmation", 
  message, 
  confirmText = "Yes", 
  cancelText = "No" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="mt-3 text-gray-500">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            className="py-2 px-4 bg-red-300 text-white rounded-lg hover:bg-blue-700"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
