import DashboardLayout from "./layout/DashboardLayout";
import SecretsTable from "./components/SecretsTable";

function App() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Secrets</h1>
      <SecretsTable />
    </DashboardLayout>
  );
}

export default App;
