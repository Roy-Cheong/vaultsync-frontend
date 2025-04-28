import { Link, useLocation } from "react-router-dom";
import { LockClosedIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="h-full w-60 bg-white shadow-md p-4 flex flex-col">
      <div className="text-lg font-bold mb-8 text-blue-600 flex items-center gap-2">
        <LockClosedIcon className="h-6 w-6" />
        VaultSync
      </div>

      <nav className="flex flex-col gap-2">
        <Link
          to="/"
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            location.pathname === "/" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <LockClosedIcon className="h-5 w-5" />
          Secrets
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-2 px-3 py-2 rounded ${
            location.pathname === "/settings" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Cog6ToothIcon className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
