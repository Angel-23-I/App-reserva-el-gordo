// src/pages/admin/ReservationsPage.jsx
import { useEffect, useState } from "react";
import { getReservas, cancelReserva } from "../../services/reservasService";

export default function ReservationsPage() {
  const [reservas, setReservas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroFecha, setFiltroFecha] = useState("");

  const loadReservas = async () => {
    const { data } = await getReservas();
    setReservas(data || []);
  };

  useEffect(() => { loadReservas(); }, []);

  const handleCancel = async (id) => {
    if (!confirm("¿Cancelar esta reserva?")) return;
    await cancelReserva(id);
    loadReservas();
  };

  const filtradas = reservas.filter((r) => {
    const porEstado = filtroEstado === "todas" || r.estado === filtroEstado;
    const porFecha = !filtroFecha || r.fecha === filtroFecha;
    return porEstado && porFecha;
  });

  return (
    <div className="admin-page">
      <h1>Gestión de reservas</h1>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} style={{ width: "auto" }}>
          <option value="todas">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          style={{ width: "auto" }}
        />
        <button className="btn-gray" onClick={() => { setFiltroEstado("todas"); setFiltroFecha(""); }}>
          Limpiar filtros
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Personas</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((r) => (
            <tr key={r.id}>
              <td>{r.cliente_nombre}</td>
              <td>{r.cliente_tel}</td>
              <td>{r.cliente_email}</td>
              <td>{r.fecha}</td>
              <td>{r.hora}</td>
              <td>{r.num_personas}</td>
              <td>{r.estado}</td>
              <td>
                {r.estado === "activa" && (
                  <button className="btn-danger btn-sm" onClick={() => handleCancel(r.id)}>
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
          {filtradas.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#888", padding: "20px" }}>
                No hay reservas para mostrar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}