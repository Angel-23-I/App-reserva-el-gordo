// src/pages/admin/TablesPage.jsx
import { useEffect, useState } from "react";
import { getMesas, createMesa, updateMesa } from "../../services/mesasService";

const EMPTY_FORM = { numero: "", capacidad: "", ubicacion: "", estado: "disponible" };

export default function TablesPage() {
  const [mesas, setMesas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);

  const loadMesas = async () => {
    const { data } = await getMesas();
    setMesas(data || []);
  };

  useEffect(() => { loadMesas(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateMesa(editId, {
        capacidad: Number(form.capacidad),
        ubicacion: form.ubicacion,
        estado: form.estado,
      });
    } else {
      await createMesa({
        numero: Number(form.numero),
        capacidad: Number(form.capacidad),
        ubicacion: form.ubicacion,
        estado: "disponible",
      });
    }
    setShowModal(false);
    setForm(EMPTY_FORM);
    setEditId(null);
    loadMesas();
  };

  const handleEdit = (mesa) => {
    setForm({
      numero: mesa.numero,
      capacidad: mesa.capacidad,
      ubicacion: mesa.ubicacion,
      estado: mesa.estado,
    });
    setEditId(mesa.id);
    setShowModal(true);
  };

  const handleToggleBlock = async (mesa) => {
    const nuevoEstado = mesa.estado === "bloqueada" ? "disponible" : "bloqueada";
    await updateMesa(mesa.id, { estado: nuevoEstado });
    loadMesas();
  };

  return (
    <div className="admin-page">
      <h1>Gestión de mesas</h1>
      <button className="btn-primary" onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowModal(true); }}>
        + Agregar mesa
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Capacidad</th>
            <th>Ubicación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id}>
              <td>{mesa.numero}</td>
              <td>{mesa.capacidad} pers.</td>
              <td>{mesa.ubicacion}</td>
              <td>{mesa.estado}</td>
              <td style={{ display: "flex", gap: "8px" }}>
                <button className="btn-warning btn-sm" onClick={() => handleEdit(mesa)}>Editar</button>
                <button
                  className={`btn-sm ${mesa.estado === "bloqueada" ? "btn-success" : "btn-gray"}`}
                  onClick={() => handleToggleBlock(mesa)}
                >
                  {mesa.estado === "bloqueada" ? "Desbloquear" : "Bloquear"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <form className="modal" onSubmit={handleSubmit}>
            <h2>{editId ? "Editar mesa" : "Nueva mesa"}</h2>
            {!editId && (
              <input name="numero" type="number" placeholder="Número de mesa" value={form.numero} onChange={handleChange} required />
            )}
            <input name="capacidad" type="number" placeholder="Capacidad (personas)" value={form.capacidad} onChange={handleChange} required />
            <input name="ubicacion" placeholder="Ubicación (ej: Zona ventana)" value={form.ubicacion} onChange={handleChange} required />
            {editId && (
              <select name="estado" value={form.estado} onChange={handleChange}>
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="bloqueada">Bloqueada</option>
              </select>
            )}
            <button type="submit">{editId ? "Guardar cambios" : "Crear mesa"}</button>
            <button type="button" className="btn-gray" onClick={() => setShowModal(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}