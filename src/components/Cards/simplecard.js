import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Header */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">{title}</h6>
        </div>
      </div>
      {/* Body */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        {children}
      </div>
    </div>
  );
};

export default Card;