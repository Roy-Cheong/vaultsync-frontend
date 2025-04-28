const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface Secret {
  id: number;
  name: string;
  value: string;
  expiresIn: string;
}

export const getSecrets = async (): Promise<Secret[]> => {
  const response = await fetch(`${API_URL}/secrets`);
  if (!response.ok) throw new Error("Failed to fetch secrets");
  return response.json();
};

export const addSecret = async (name: string, value: string, expiresIn: string): Promise<Secret> => {
  const response = await fetch(`${API_URL}/secrets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, value, expiresIn }),
  });
  if (!response.ok) throw new Error("Failed to add secret");
  return response.json();
};

export const updateSecret = async (secret: Secret): Promise<Secret> => {
  const response = await fetch(`${API_URL}/secrets/${secret.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(secret),
  });
  if (!response.ok) throw new Error("Failed to update secret");
  return response.json();
};

export const deleteSecret = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/secrets/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete secret");
};
