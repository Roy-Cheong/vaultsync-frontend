// src/pages/SecretsPage.tsx
import { useEffect, useState } from "react";
import SecretsTable from "../components/SecretsTable";
import AddSecretModal from "../components/AddSecretModal";
import EditSecretModal from "../components/EditSecretModal";
import { getSecrets, addSecret, updateSecret, deleteSecret } from "../api";
import { toast } from "react-toastify";

interface Secret {
  id: number;
  name: string;
  value: string;
  expiresIn: string;
}

const SecretsPage = () => {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSecret, setEditingSecret] = useState<Secret | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSecrets = async () => {
      try {
        const data = await getSecrets();
        setSecrets(data);
      } catch (err) {
        console.error("Error loading secrets:", err);
        toast.error("Failed to load secrets. Try refreshing.");
      } finally {
        setIsLoading(false);
      }
    };
    loadSecrets();
  }, []);

  const handleAddSecret = async (name: string, value: string, expiresIn: string) => {
    try {
      const newSecret = await addSecret(name, value, expiresIn);
      setSecrets((prev) => [...prev, newSecret]);
      toast.success("Secret added successfully!");
    } catch (err) {
      console.error("Error adding secret:", err);
      toast.error("Failed to add secret.");
    }
  };

  const handleEdit = (secret: Secret) => {
    setEditingSecret(secret);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedSecret: Secret) => {
    try {
      const saved = await updateSecret(updatedSecret);
      setSecrets((prev) => prev.map((s) => (s.id === saved.id ? saved : s)));
      toast.success("Secret updated successfully!");
    } catch (err) {
      console.error("Error updating secret:", err);
      toast.error("Failed to update secret.");
    } finally {
      setIsEditModalOpen(false);
      setEditingSecret(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this secret?")) return;

    try {
      await deleteSecret(id);
      setSecrets((prev) => prev.filter((s) => s.id !== id));
      toast.success("Secret deleted successfully!");
    } catch (err) {
      console.error("Error deleting secret:", err);
      toast.error("Failed to delete secret.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Secrets</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Add Secret
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {isLoading ? (
          <div className="text-center py-10 text-gray-500">Loading secrets...</div>
        ) : (
          <SecretsTable
            secrets={secrets}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <AddSecretModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSecret}
      />

      <EditSecretModal
        isOpen={isEditModalOpen}
        secret={editingSecret}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingSecret(null);
        }}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default SecretsPage;
