export default function TableCard({ mesa, selected, onSelect, disabled }) {
  const base = "flex flex-col items-center justify-center w-20 h-20 rounded-xl font-semibold text-sm transition-all border-2 cursor-pointer";
  const states = {
    disponible: "bg-green-100 border-green-400 text-green-800 hover:scale-105 hover:shadow-md",
    ocupada: "bg-red-100 border-red-400 text-red-700 cursor-not-allowed opacity-70",
    bloqueada: "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-60",
  };
  const selectedStyle = selected ? "ring-4 ring-yellow-400 scale-105 shadow-lg" : "";
  const stateStyle = states[mesa.estado] || states.bloqueada;

  return (
    <button
      className={`${base} ${stateStyle} ${selectedStyle}`}
      onClick={() => !disabled && onSelect(mesa)}
      disabled={disabled}
      title={`Mesa ${mesa.numero} · ${mesa.capacidad} personas · ${mesa.estado}`}
    >
      <span className="text-lg">🪑</span>
      <span>Mesa {mesa.numero}</span>
      <span className="text-xs font-normal">{mesa.capacidad} pers.</span>
    </button>
  );
}