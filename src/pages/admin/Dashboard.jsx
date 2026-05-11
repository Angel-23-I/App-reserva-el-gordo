import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const goToSection = (path) => () => navigate(path);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard · Comidas Rápidas The Gordo</h1>
      <div className="quick-actions">
        <button onClick={goToSection("/admin/tables")}>Gestionar mesas</button>
        <button onClick={goToSection("/admin/reservations")}>Ver reservas</button>
        <button onClick={goToSection("/admin/schedules")}>Gestionar horarios</button>
      </div>
    </div>
  );
}