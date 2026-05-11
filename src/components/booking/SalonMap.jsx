// src/components/booking/SalonMap.jsx
import TableCard from "./TableCard";

export default function SalonMap({
  mesas, guestCount, selectedTables, onSelectTable,
  onContinue, totalCapacidad, necesitaVariasMesas, onBack
}) {
  const disponibles = mesas.filter((m) => m.estado === "disponible");
  const capacidadOk = totalCapacidad >= guestCount;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Elige tu mesa</h2>
      <p className="text-gray-500 text-sm text-center mb-4">
        Reserva para <strong>{guestCount} persona{guestCount > 1 ? "s" : ""}</strong>
      </p>

      {/* Aviso si necesita varias mesas */}
      {necesitaVariasMesas && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4 text-sm text-yellow-800 text-center">
          ⚠️ No hay una sola mesa con capacidad para {guestCount} personas.
          <strong> Selecciona varias mesas</strong> para completar el grupo.
        </div>
      )}

      {/* Barra de capacidad acumulada */}
      {selectedTables.length > 0 && (
        <div className="mb-4 bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
            <span>Capacidad acumulada</span>
            <span className={capacidadOk ? "text-green-600" : "text-red-500"}>
              {totalCapacidad} / {guestCount} personas
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${capacidadOk ? "bg-green-500" : "bg-red-400"}`}
              style={{ width: `${Math.min((totalCapacidad / guestCount) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Leyenda */}
      <div className="flex justify-center gap-6 text-xs mb-4">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Disponible</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Ocupada</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block" /> Bloqueada</span>
      </div>

      {/* Grid de mesas */}
      <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 min-h-48">
        {disponibles.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No hay mesas disponibles.</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {mesas.map((mesa) => (
              <TableCard
                key={mesa.id}
                mesa={mesa}
                selected={selectedTables.some((m) => m.id === mesa.id)}
                onSelect={onSelectTable}
                disabled={mesa.estado !== "disponible"}
              />
            ))}
          </div>
        )}
      </div>

      {/* Botón continuar */}
      <button
        onClick={onContinue}
        disabled={!capacidadOk || selectedTables.length === 0}
        className={`mt-5 w-full py-3 rounded-xl font-semibold text-white transition ${
          capacidadOk && selectedTables.length > 0
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {capacidadOk
          ? `Continuar con ${selectedTables.length} mesa${selectedTables.length > 1 ? "s" : ""} →`
          : `Selecciona mesas (${totalCapacidad}/${guestCount} personas)`}
      </button>

      <button onClick={onBack} className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline block mx-auto">
        ← Cambiar número de personas
      </button>
    </div>
  );
}