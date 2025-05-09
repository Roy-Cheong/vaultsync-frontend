import { useEffect } from "react";

interface AddSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, value: string, expiresIn: string) => void;
}

const AddSecretModal = ({ isOpen, onClose, onAdd }: AddSecretModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  let name = "";
  let value = "";
  let expiresIn = "";

  const handleSubmit = () => {
    if (!name || !value) return alert("Name and value are required");
    onAdd(name, value, expiresIn || "N/A");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Secret
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Secret name"
            onChange={(e) => (name = e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Secret value"
            onChange={(e) => (value = e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Expires in (e.g. 7 days)"
            onChange={(e) => (expiresIn = e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSecretModal;
