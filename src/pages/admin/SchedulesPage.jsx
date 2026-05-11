// src/pages/admin/SchedulesPage.jsx
import { useEffect, useState } from "react";
import { getHorarios, updateHorario } from "../../services/horariosService";

export default function SchedulesPage() {
  const [horarios, setHorarios] = useState([]);

  const load = async () => {
    const { data } = await getHorarios();
    setHorarios(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (id, field, value) => {
    setHorarios((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  const handleSave = async (horario) => {
    await updateHorario(horario.id, {
      habilitado: horario.habilitado,
      hora_inicio: horario.hora_inicio,
      hora_fin: horario.hora_fin,
    });
    alert("Horario guardado");
  };

  return (
    <div className="admin-page">
      <h1>Gestión de horarios</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Activo</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.id}>
              <td style={{ textTransform: "capitalize" }}>{h.dia_semana}</td>
              <td>
                <input
                  type="checkbox"
                  checked={h.habilitado}
                  onChange={(e) => handleChange(h.id, "habilitado", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={h.hora_inicio}
                  style={{ width: "120px" }}
                  onChange={(e) => handleChange(h.id, "hora_inicio", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="time"
                  value={h.hora_fin}
                  style={{ width: "120px" }}
                  onChange={(e) => handleChange(h.id, "hora_fin", e.target.value)}
                />
              </td>
              <td>
                <button className="btn-success btn-sm" onClick={() => handleSave(h)}>Guardar</button>
              </td>
            </tr>
          ))}
          {horarios.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888", padding: "20px" }}>
                No hay horarios configurados. Créalos desde Supabase.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}