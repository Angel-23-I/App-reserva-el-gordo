import { useEffect, useState } from "react";
import { getHorarios, updateHorario } from "../../services/horariosService";

const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const DIAS_EMOJIS = {
  lunes: "📅", martes: "📅", miércoles: "📅", jueves: "📅",
  viernes: "🎉", sábado: "🎉", domingo: "🎉",
};

export default function SchedulesPage() {
  const [horarios, setHorarios] = useState([]);
  const [saved, setSaved] = useState(null);

  const load = async () => { const { data } = await getHorarios(); setHorarios(data || []); };
  useEffect(() => { load(); }, []);

  const handleChange = (id, field, value) => {
    setHorarios((prev) => prev.map((h) => h.id === id ? { ...h, [field]: value } : h));
  };

  const handleSave = async (horario) => {
    await updateHorario(horario.id, {
      habilitado: horario.habilitado,
      hora_inicio: horario.hora_inicio,
      hora_fin: horario.hora_fin,
    });
    setSaved(horario.id);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Horarios</h1>
        <p className="text-gray-400 text-sm">Configura los días y rangos de atención del restaurante</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {horarios.length === 0 ? (
          <div className="col-span-3 bg-white rounded-2xl shadow p-10 text-center text-gray-400">
            No hay horarios configurados aún.
          </div>
        ) : (
          horarios.map((h) => (
            <div
              key={h.id}
              className={`bg-white rounded-2xl shadow p-5 flex flex-col gap-4 border-2 transition ${
                h.habilitado ? "border-green-200" : "border-gray-100 opacity-70"
              }`}
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{DIAS_EMOJIS[h.dia_semana] || "📅"}</span>
                  <span className="font-semibold text-gray-800 capitalize">{h.dia_semana}</span>
                </div>
                {/* Toggle activo/inactivo */}
                <button
                  onClick={() => handleChange(h.id, "habilitado", !h.habilitado)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    h.habilitado ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      h.habilitado ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Horas */}
              <div className={`grid grid-cols-2 gap-3 ${!h.habilitado ? "opacity-40 pointer-events-none" : ""}`}>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Apertura</label>
                  <input
                    type="time"
                    value={h.hora_inicio}
                    onChange={(e) => handleChange(h.id, "hora_inicio", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Cierre</label>
                  <input
                    type="time"
                    value={h.hora_fin}
                    onChange={(e) => handleChange(h.id, "hora_fin", e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              {/* Botón guardar */}
              <button
                onClick={() => handleSave(h)}
                className={`w-full py-2 rounded-xl text-sm font-semibold transition ${
                  saved === h.id
                    ? "bg-green-500 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {saved === h.id ? "✓ Guardado" : "Guardar"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}