// src/components/SecretsTable.tsx
import { useState } from "react";

const mockSecrets = [
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
];

const SecretsTable = () => {
  const [revealed, setRevealed] = useState<{ [id: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!");
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-y-3">
        <thead>
          <tr className="text-left text-gray-500 text-sm">
            <th>Name</th>
            <th>Secret</th>
            <th>Expires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockSecrets.map((secret) => (
            <tr key={secret.id} className="bg-white rounded-lg shadow-sm">
              <td className="p-4 font-medium">{secret.name}</td>
              <td className="p-4">
                {revealed[secret.id] ? (
                  <code>{secret.value}</code>
                ) : (
                  <span className="text-gray-400 tracking-widest">••••••••••</span>
                )}
              </td>
              <td className="p-4 text-sm text-gray-500">{secret.expiresIn}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleToggle(secret.id)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {revealed[secret.id] ? "Hide" : "Reveal"}
                </button>
                <button
                  onClick={() => handleCopy(secret.value)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Copy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecretsTable;
