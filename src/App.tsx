import { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import SecretsTable from "./components/SecretsTable";
import AddSecretModal from "./components/AddSecretModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSecret = (name: string, value: string, expiresIn: string) => {
    const newSecret: Secret = {
      id: Date.now(),
      name,
      value,
      expiresIn,
    };
    setSecrets((prev) => [...prev, newSecret]);
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Secrets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Secret
        </button>
      </div>

      <SecretsTable secrets={secrets} />
      <AddSecretModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSecret}
      />
    </DashboardLayout>
  );
}

export default App;
