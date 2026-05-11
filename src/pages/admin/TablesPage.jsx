import { useEffect, useState } from "react";
import { getMesas, createMesa, updateMesa } from "../../services/mesasService";

const EMPTY = { numero: "", capacidad: "", ubicacion: "", estado: "disponible" };

export default function TablesPage() {
  const [mesas, setMesas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);

  const load = async () => { const { data } = await getMesas(); setMesas(data || []); };
  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateMesa(editId, { capacidad: Number(form.capacidad), ubicacion: form.ubicacion, estado: form.estado });
    } else {
      await createMesa({ numero: Number(form.numero), capacidad: Number(form.capacidad), ubicacion: form.ubicacion, estado: "disponible" });
    }
    setShowModal(false); setForm(EMPTY); setEditId(null); load();
  };

  const handleEdit = (m) => { setForm({ numero: m.numero, capacidad: m.capacidad, ubicacion: m.ubicacion, estado: m.estado }); setEditId(m.id); setShowModal(true); };
  const handleToggle = async (m) => { await updateMesa(m.id, { estado: m.estado === "bloqueada" ? "disponible" : "bloqueada" }); load(); };

  const estadoColor = { disponible: "bg-green-100 text-green-700", ocupada: "bg-red-100 text-red-700", bloqueada: "bg-gray-100 text-gray-500" };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mesas</h1>
          <p className="text-gray-400 text-sm">Gestiona las mesas del restaurante</p>
        </div>
        <button onClick={() => { setForm(EMPTY); setEditId(null); setShowModal(true); }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
          + Agregar mesa
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              {["N°", "Capacidad", "Ubicación", "Estado", "Acciones"].map((h) => (
                <th key={h} className="px-6 py-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mesas.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{m.numero}</td>
                <td className="px-6 py-4">{m.capacidad} pers.</td>
                <td className="px-6 py-4">{m.ubicacion}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoColor[m.estado] || "bg-gray-100 text-gray-500"}`}>
                    {m.estado}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => handleEdit(m)} className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-lg text-xs font-medium transition">Editar</button>
                  <button onClick={() => handleToggle(m)} className={`px-3 py-1 rounded-lg text-xs font-medium transition ${m.estado === "bloqueada" ? "bg-green-100 hover:bg-green-200 text-green-700" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}>
                    {m.estado === "bloqueada" ? "Desbloquear" : "Bloquear"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-800">{editId ? "Editar mesa" : "Nueva mesa"}</h2>
            {!editId && <input name="numero" type="number" placeholder="Número de mesa" value={form.numero} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />}
            <input name="capacidad" type="number" placeholder="Capacidad (personas)" value={form.capacidad} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            <input name="ubicacion" placeholder="Ubicación (ej: Zona ventana)" value={form.ubicacion} onChange={handleChange} required className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            {editId && (
              <select name="estado" value={form.estado} onChange={handleChange} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="disponible">Disponible</option>
                <option value="ocupada">Ocupada</option>
                <option value="bloqueada">Bloqueada</option>
              </select>
            )}
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition">{editId ? "Guardar cambios" : "Crear mesa"}</button>
            <button type="button" onClick={() => setShowModal(false)} className="text-sm text-gray-400 hover:text-gray-600 underline text-center">Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}