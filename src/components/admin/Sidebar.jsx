import { NavLink, useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../services/authService";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/tables", label: "Mesas", icon: "🪑" },
  { to: "/admin/reservations", label: "Reservas", icon: "📋" },
  { to: "/admin/schedules", label: "Horarios", icon: "🕐" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/admin");
  };

  return (
    <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col py-6 px-3">
      <div className="text-center mb-8 px-2">
        <div className="text-3xl">🍔</div>
        <p className="text-xs text-gray-400 mt-1">The Gordo · Admin</p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive ? "bg-red-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 transition"
      >
        🚪 Cerrar sesión
      </button>
    </aside>
  );
}