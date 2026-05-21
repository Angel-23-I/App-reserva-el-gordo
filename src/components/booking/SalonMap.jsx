import TableCard from "./TableCard";

export default function SalonMap({
  mesas,
  guestCount,
  fecha,
  hora,
  occupiedTableIds = [],
  selectedTables,
  onSelectTable,
  onContinue,
  totalCapacidad,
  capacidadCompleta,
  onBack,
}) {
  const seleccionIds = new Set(selectedTables.map((m) => m.id));
  const ocupadasIds = new Set(occupiedTableIds);

  const mesasVisuales = mesas.map((mesa) => {
    let visualEstado = mesa.estado;

    if (ocupadasIds.has(mesa.id)) {
      visualEstado = "ocupada";
    }

    return { ...mesa, visualEstado };
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-amber-800">Selecciona tus mesas</h2>
          <p className="text-amber-600 mt-1">
            {fecha} · {hora} · Grupo de {guestCount} personas
          </p>
        </div>

        <div className="min-w-70 bg-amber-100/50 border border-amber-300 rounded-2xl p-4">
          <p className="text-sm font-semibold text-amber-700 mb-2">Capacidad acumulada</p>
          <div className="w-full bg-amber-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 ${capacidadCompleta ? "bg-amber-500" : "bg-orange-400"}`}
              style={{ width: `${Math.min((totalCapacidad / guestCount) * 100, 100)}%` }}
            />
          </div>
          <p className={`text-xs mt-2 ${capacidadCompleta ? "text-amber-600" : "text-orange-500"}`}>
            {capacidadCompleta
              ? "Ya cubriste la capacidad mínima."
              : "Selecciona una o más mesas para completar el grupo."}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-xs font-medium">
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-300">
          Disponible
        </span>
        <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
          Ocupada
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
          Bloqueada
        </span>
        <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-800 border border-amber-400">
          Seleccionada
        </span>
      </div>

      <div className="bg-linear-to-b from-amber-100/30 to-white rounded-3xl border border-amber-200 p-6 md:p-8 min-h-105">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {mesasVisuales.map((mesa) => {
            const selected = seleccionIds.has(mesa.id);
            const isOcupadaByTime = mesa.visualEstado === "ocupada";
            const isBlocked = mesa.visualEstado === "bloqueada";
            const disabled = isOcupadaByTime || isBlocked || (capacidadCompleta && !selected);

            return (
              <TableCard
                key={mesa.id}
                mesa={{ ...mesa, estado: mesa.visualEstado }}
                selected={selected}
                onSelect={onSelectTable}
                disabled={disabled}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <button onClick={onBack} className="text-sm text-amber-500 hover:text-amber-700 underline">
          ← Cambiar fecha y hora
        </button>

        <button
          onClick={onContinue}
          disabled={!capacidadCompleta}
          className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
            capacidadCompleta ? "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
