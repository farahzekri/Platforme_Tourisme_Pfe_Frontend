// components/Alert.js
import React from "react";

const Alert = ({ message, type }) => {
  if (!message) return null;

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${
        type === "success"
          ? "text-green-800 bg-green-100"
          : "text-red-800 bg-red-50"
      }`}
      role="alert"
    >
      <span className="font-medium">
        {type === "success" ? "Succès!" : "Erreur!"}
      </span>{" "}
      {message}
    </div>
  );
};

export default Alert;
