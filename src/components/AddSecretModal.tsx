// src/components/AddSecretModal.tsx
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
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Add New Secret</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Secret name"
            onChange={(e) => (name = e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Secret value"
            onChange={(e) => (value = e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Expires in (e.g. 7 days)"
            onChange={(e) => (expiresIn = e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSecretModal;
