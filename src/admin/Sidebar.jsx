import { Link, useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../services/authService";

export default function Sidebar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/admin");
  };

  return (
    <aside className="admin-sidebar">
      <div className="user-info">
        <p>{user?.email || "Admin"}</p>
      </div>
      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/tables">Mesas</Link>
        <Link to="/admin/reservations">Reservas</Link>
        <Link to="/admin/schedules">Horarios</Link>
      </nav>
      <button onClick={handleLogout} className="logout-btn">
        Cerrar sesión
      </button>
    </aside>
  );
}