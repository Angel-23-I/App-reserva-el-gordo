import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/tables">Mesas</Link>
        <Link to="/admin/reservations">Reservas</Link>
        <Link to="/admin/schedules">Horarios</Link>
      </nav>
    </aside>
  );
}