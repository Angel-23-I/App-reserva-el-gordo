import TableCard from "./TableCard";

export default function SalonMap({ mesas, guestCount, selectedTable, onSelectTable }) {
  const filtered = mesas.filter((mesa) => mesa.capacidad >= guestCount);

  return (
    <div>
      <h2>Selecciona una mesa</h2>
      <div className="salon-grid">
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
    </div>
  );
}