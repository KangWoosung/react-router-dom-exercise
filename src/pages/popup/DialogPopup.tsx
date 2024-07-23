import { useNavigate } from "react-router-dom";

const DialogPopup = () => {
  const navigate = useNavigate();

  const closeDialog = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-accent p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">
          This is DialogPopup component in a dialog
        </h2>
        <p className="mb-4">
          This is the content of the DialogPopup component.
        </p>
        <button
          onClick={closeDialog}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DialogPopup;
