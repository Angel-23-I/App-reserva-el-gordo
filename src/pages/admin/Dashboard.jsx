import { useNavigate } from "react-router-dom";

const cards = [
  { label: "Gestionar mesas", icon: "🪑", path: "/admin/tables", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "Ver reservas", icon: "📋", path: "/admin/reservations", color: "bg-green-50 border-green-200 text-green-700" },
  { label: "Gestionar horarios", icon: "🕐", path: "/admin/schedules", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Panel de administración · Comidas Rápidas The Gordo</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <button
            key={c.path}
            onClick={() => navigate(c.path)}
            className={`border-2 rounded-2xl p-6 text-left hover:shadow-md transition ${c.color}`}
          >
            <div className="text-4xl mb-3">{c.icon}</div>
            <p className="font-semibold text-base">{c.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}