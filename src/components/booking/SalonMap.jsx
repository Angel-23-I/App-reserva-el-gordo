// src/components/booking/SalonMap.jsx
import TableCard from "./TableCard";

export default function SalonMap({ mesas, guestCount, selectedTable, onSelectTable }) {
  const filtered = mesas.filter((mesa) => mesa.capacidad >= guestCount);

  return (
    <div className="salon-map">
      <h2>Selecciona tu mesa</h2>
      <div className="legend">
        <span><div className="dot green"></div> Disponible</span>
        <span><div className="dot red"></div> Ocupada</span>
        <span><div className="dot gray"></div> Bloqueada</span>
      </div>
      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          No hay mesas disponibles para {guestCount} personas.
        </p>
      ) : (
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
      )}
    </div>
  );
}