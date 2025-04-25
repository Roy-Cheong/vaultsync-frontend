import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Secret {
  id: number;
  name: string;
  value: string;
  expiresIn: string;
}

interface Props {
  secrets: Secret[];
  onEdit: (secret: Secret) => void;
  onDelete: (id: number) => void;
}

const SecretsTable = ({ secrets, onEdit, onDelete }: Props) => {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!");
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md p-6">
      <table className="min-w-full table-auto border-separate border-spacing-y-2">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="px-4 py-3 text-center">Name</th>
            <th className="px-4 py-3 text-center">Secret</th>
            <th className="px-4 py-3 text-center">Expires</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {secrets.map((secret) => (
            <tr key={secret.id} className="border-b hover:bg-gray-50 transition text-sm">
              <td className="px-4 py-3 text-center font-medium">{secret.name}</td>
              <td className="px-4 py-3 text-center">
                {revealed[secret.id] ? (
                  <code>{secret.value}</code>
                ) : (
                  <span className="text-gray-400 tracking-widest">••••••••••</span>
                )}
              </td>
              <td
                className={`px-4 py-3 text-center text-sm ${
                  secret.expiresIn.toLowerCase() === "expired"
                    ? "text-[red] font-bold"
                    : "text-gray-500"
                }`}
              >
                {secret.expiresIn}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2 flex-wrap items-center">
                  <button
                    onClick={() => toggleReveal(secret.id)}
                    className="min-w-[72px] px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {revealed[secret.id] ? "Hide" : "Reveal"}
                  </button>
                  <button
                    onClick={() => copyToClipboard(secret.value)}
                    className="min-w-[72px] px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => onEdit(secret)}
                    title="Edit"
                    className="min-w-[72px] px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(secret.id)}
                    title="Delete"
                    className="min-w-[72px] px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SecretsTable;
