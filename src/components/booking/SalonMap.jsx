import TableCard from "./TableCard";

export default function SalonMap({ mesas, guestCount, selectedTable, onSelectTable, onBack }) {
  const filtered = mesas.filter((m) => m.capacidad >= guestCount);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Elige tu mesa</h2>
      <p className="text-gray-500 text-sm text-center mb-4">
        Mostrando mesas para <strong>{guestCount} persona{guestCount > 1 ? "s" : ""}</strong>
      </p>

      {/* Leyenda */}
      <div className="flex justify-center gap-6 text-xs mb-6">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span> Disponible</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span> Ocupada</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block"></span> Bloqueada</span>
      </div>

      {/* Área del restaurante */}
      <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-6 min-h-48">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            No hay mesas disponibles para {guestCount} personas.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {filtered.map((mesa) => (
              <TableCard
                key={mesa.id}
                mesa={mesa}
                selected={selectedTable?.id === mesa.id}
                onSelect={onSelectTable}
                disabled={mesa.estado !== "disponible"}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline block mx-auto"
      >
        ← Cambiar número de personas
      </button>
    </div>
  );
}