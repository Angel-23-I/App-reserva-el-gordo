function TableIllustration({ selected, disabled, occupied, blocked }) {
  const tableFill = selected
    ? "#F87171"
    : occupied
    ? "#FCA5A5"
    : blocked
    ? "#D1D5DB"
    : "#86EFAC";

  const chairFill = selected
    ? "#DC2626"
    : occupied
    ? "#EF4444"
    : blocked
    ? "#9CA3AF"
    : "#22C55E";

  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-28 md:h-28">
      <rect x="35" y="35" width="50" height="50" rx="12" fill={tableFill} />
      <rect x="44" y="10" width="32" height="16" rx="8" fill={chairFill} />
      <rect x="44" y="94" width="32" height="16" rx="8" fill={chairFill} />
      <rect x="10" y="44" width="16" height="32" rx="8" fill={chairFill} />
      <rect x="94" y="44" width="16" height="32" rx="8" fill={chairFill} />
      <text x="60" y="64" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111827">
        {selected ? "✓" : "T"}
      </text>
    </svg>
  );
}

export default function TableCard({ mesa, selected, onSelect, disabled }) {
  const occupied = mesa.estado === "ocupada";
  const blocked = mesa.estado === "bloqueada";

  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(mesa)}
      disabled={disabled}
      className={`rounded-2xl border p-4 flex flex-col items-center justify-center transition w-36 md:w-40
        ${selected ? "border-red-500 bg-red-50 shadow-lg scale-[1.02]" : "border-gray-200 bg-white hover:shadow-md"}
        ${disabled ? "opacity-70 cursor-not-allowed" : ""}
      `}
      title={`Mesa ${mesa.numero} · ${mesa.capacidad} personas`}
    >
      <TableIllustration
        selected={selected}
        disabled={disabled}
        occupied={occupied}
        blocked={blocked}
      />
      <span className="mt-2 text-sm font-semibold text-gray-800">Mesa {mesa.numero}</span>
      <span className="text-xs text-gray-500">{mesa.capacidad} personas</span>
      <span className="text-xs mt-1 capitalize text-gray-400">{mesa.ubicacion}</span>
    </button>
  );
}