const Topbar = () => {
  return (
    <header className="w-full h-16 bg-white shadow-sm px-6 flex items-center justify-between border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div className="text-sm text-gray-500">
        Logged in as <span className="font-medium text-gray-700">admin@vaultsync</span>
      </div>
    </header>
  );
};

export default Topbar;
