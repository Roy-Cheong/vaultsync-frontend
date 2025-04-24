import {
  HomeIcon,
  KeyIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "Secrets", icon: KeyIcon },
  { name: "Add Secret", icon: PlusCircleIcon },
  { name: "Settings", icon: Cog6ToothIcon },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col gap-6 shadow-lg">
      <h2 className="text-2xl font-bold tracking-tight text-blue-400">VaultSync 🔐</h2>
      <nav className="flex flex-col gap-3">
        {navItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex items-center gap-3 text-left px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-blue-300 transition"
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
