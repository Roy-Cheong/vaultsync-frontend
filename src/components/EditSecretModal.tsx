import { useEffect, useState } from "react";

interface Secret {
  id: number;
  name: string;
  value: string;
  expiresIn: string;
}

interface EditSecretModalProps {
  isOpen: boolean;
  secret: Secret | null;
  onClose: () => void;
  onSave: (updated: Secret) => void;
}

const EditSecretModal = ({ isOpen, secret, onClose, onSave }: EditSecretModalProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  useEffect(() => {
    if (secret) {
      setName(secret.name);
      setValue(secret.value);
      setExpiresIn(secret.expiresIn);
    }
  }, [secret]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !secret) return null;

  const handleSave = () => {
    if (!name || !value) return alert("Name and value are required.");
    onSave({ ...secret, name, value, expiresIn });
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Secret</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Secret name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Secret value"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value)}
            placeholder="Expires in (e.g. 7 days)"
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
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSecretModal;
