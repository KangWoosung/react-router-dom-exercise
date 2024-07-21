import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Popup: React.FC = () => {
  const navigate = useNavigate();

  const openDialog = () => {
    navigate("dialog");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">This is Dialog component</h1>
      <button
        onClick={openDialog}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Open DialogPopup
      </button>
      <Outlet />
    </div>
  );
};

export default Popup;
