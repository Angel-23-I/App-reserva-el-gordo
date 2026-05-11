// src/components/admin/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { signOutAdmin } from "../../services/authService";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/admin");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/tables">Mesas</Link></li>
        <li><Link to="/admin/reservations">Reservas</Link></li>
        <li><Link to="/admin/schedules">Horarios</Link></li>
      </ul>
      <button onClick={handleLogout} style={{ marginTop: "10px" }}>Cerrar sesión</button>
    </nav>
  );
}