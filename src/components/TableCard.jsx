export default function TableCard({ mesa, selected, onSelect, disabled }) {
  return (
    <button
      className={`table-card ${mesa.estado} ${selected ? "selected" : ""}`}
      disabled={disabled}
      onClick={() => onSelect(mesa)}
    >
      <span>Mesa {mesa.numero}</span>
      <small>{mesa.capacidad} personas</small>
    </button>
  );
}