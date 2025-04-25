  import { useState } from "react";
  import DashboardLayout from "./layout/DashboardLayout";
  import SecretsTable from "./components/SecretsTable";
  import AddSecretModal from "./components/AddSecretModal";
  import EditSecretModal from "./components/EditSecretModal";

  interface Secret {
    id: number;
    name: string;
    value: string;
    expiresIn: string;
  }

  function App() {
    const [secrets, setSecrets] = useState<Secret[]>([
      {
        id: 1,
        name: "API Key - Stripe",
        value: "sk_live_1234567890abcdef",
        expiresIn: "3 days",
      },
      {
        id: 2,
        name: "DB Password - Prod",
        value: "p@ssW0rd!123",
        expiresIn: "Expired",
      },
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSecret, setEditingSecret] = useState<Secret | null>(null);

    const handleAddSecret = (name: string, value: string, expiresIn: string) => {
      const newSecret: Secret = {
        id: Date.now(),
        name,
        value,
        expiresIn,
      };
      setSecrets((prev) => [...prev, newSecret]);
    };

    const handleEdit = (secret: Secret) => {
      setEditingSecret(secret);
      setIsEditModalOpen(true);
    };

    const handleSaveEdit = (updated: Secret) => {
      setSecrets((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
    };

    const handleDelete = (id: number) => {
      if (confirm("Are you sure you want to delete this secret?")) {
        setSecrets((prev) => prev.filter((s) => s.id !== id));
      }
    };

    return (
    <DashboardLayout>
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
          <SecretsTable
            secrets={secrets}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
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
    </DashboardLayout>
    );
  }

  export default App;