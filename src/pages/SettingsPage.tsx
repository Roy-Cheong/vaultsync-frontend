import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [appName, setAppName] = useState("VaultSync");
  const [theme, setTheme] = useState("light");
  const [autoLogout, setAutoLogout] = useState("30");

  // Load from localStorage when page loads
  useEffect(() => {
    const savedName = localStorage.getItem("appName");
    const savedTheme = localStorage.getItem("theme");
    const savedLogout = localStorage.getItem("autoLogout");

    if (savedName) setAppName(savedName);
    if (savedTheme) setTheme(savedTheme);
    if (savedLogout) setAutoLogout(savedLogout);
  }, []);

  const handleSave = () => {
    localStorage.setItem("appName", appName);
    localStorage.setItem("theme", theme);
    localStorage.setItem("autoLogout", autoLogout);

    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Settings</h2>

      <div className="flex flex-col gap-6">
        {/* App Name */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Application Name</label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Theme Mode */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Theme Mode</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Auto-Logout Timer */}
        <div>
          <label className="block mb-1 text-sm text-gray-600">Auto-Logout Timer</label>
          <select
            value={autoLogout}
            onChange={(e) => setAutoLogout(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
