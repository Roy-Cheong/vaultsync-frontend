import { SparklesIcon } from "@heroicons/react/24/outline"; // Optional branding icon

const Topbar = () => {
  return (
    <header className="w-full h-16 bg-white shadow-sm px-6 flex items-center justify-between border-b border-gray-200">
      {/* Brand / Page Title */}
      <div className="flex items-center gap-2">
        {/* Optional Brand Icon */}
        <SparklesIcon className="w-5 h-5 text-blue-500" />
        <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
          VaultSync
        </h1>
      </div>

      {/* User Info */}
      <div className="text-sm text-gray-600">
        Logged in as{" "}
        <span className="font-medium text-gray-800">admin@vaultsync</span>
      </div>
    </header>
  );
};

export default Topbar;
