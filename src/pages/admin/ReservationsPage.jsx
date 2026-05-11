import { useEffect, useState } from "react";
import { getReservas, cancelReserva } from "../../services/reservasService";

export default function ReservationsPage() {
  const [reservas, setReservas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroFecha, setFiltroFecha] = useState("");

  const load = async () => { const { data } = await getReservas(); setReservas(data || []); };
  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    if (!confirm("¿Cancelar esta reserva?")) return;
    await cancelReserva(id);
    load();
  };

  const filtradas = reservas.filter((r) => {
    const porEstado = filtroEstado === "todas" || r.estado === filtroEstado;
    const porFecha = !filtroFecha || r.fecha === filtroFecha;
    return porEstado && porFecha;
  });

  const estadoColor = {
    activa: "bg-green-100 text-green-700",
    cancelada: "bg-red-100 text-red-600",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reservas</h1>
        <p className="text-gray-400 text-sm">Gestiona y monitorea todas las reservas</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap gap-3 items-center">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="todas">Todos los estados</option>
          <option value="activa">Activa</option>
          <option value="cancelada">Cancelada</option>
        </select>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={() => { setFiltroEstado("todas"); setFiltroFecha(""); }}
          className="text-sm text-gray-400 hover:text-gray-600 underline"
        >
          Limpiar filtros
        </button>
        <span className="ml-auto text-xs text-gray-400">{filtradas.length} resultado(s)</span>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              {["Cliente", "Teléfono", "Correo", "Fecha", "Hora", "Personas", "Estado", "Acciones"].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtradas.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800 whitespace-nowrap">{r.cliente_nombre}</td>
                <td className="px-5 py-3 text-gray-500">{r.cliente_tel}</td>
                <td className="px-5 py-3 text-gray-500">{r.cliente_email}</td>
                <td className="px-5 py-3 whitespace-nowrap">{r.fecha}</td>
                <td className="px-5 py-3 whitespace-nowrap">{r.hora?.slice(0, 5)}</td>
                <td className="px-5 py-3 text-center">{r.num_personas}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoColor[r.estado] || "bg-gray-100 text-gray-500"}`}>
                    {r.estado}
                  </span>
                </td>
                <td className="px-5 py-3">
                  {r.estado === "activa" && (
                    <button
                      onClick={() => handleCancel(r.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-xs font-medium transition"
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtradas.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-12">
                  No hay reservas para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}