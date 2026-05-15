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
          <h2 className="text-3xl font-bold text-gray-800">Selecciona tus mesas</h2>
          <p className="text-gray-500 mt-1">
            {fecha} · {hora} · Grupo de {guestCount} personas
          </p>
        </div>

        <div className="min-w-70 bg-gray-50 border border-gray-200 rounded-2xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Capacidad acumulada</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 ${capacidadCompleta ? "bg-green-500" : "bg-red-400"}`}
              style={{ width: `${Math.min((totalCapacidad / guestCount) * 100, 100)}%` }}
            />
          </div>
          <p className={`text-xs mt-2 ${capacidadCompleta ? "text-green-600" : "text-red-500"}`}>
            {capacidadCompleta
              ? "Ya cubriste la capacidad mínima."
              : "Selecciona una o más mesas para completar el grupo."}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 text-xs font-medium">
        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
          Disponible
        </span>
        <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
          Ocupada
        </span>
        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
          Bloqueada
        </span>
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
          Seleccionada
        </span>
      </div>

      <div className="bg-linear-to-b from-gray-50 to-white rounded-3xl border border-gray-200 p-6 md:p-8 min-h-105">
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
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700 underline">
          ← Cambiar fecha y hora
        </button>

        <button
          onClick={onContinue}
          disabled={!capacidadCompleta}
          className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
            capacidadCompleta ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}