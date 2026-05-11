import { useState } from "react";

export default function GuestCountStep({ onNext }) {
  const [guestCount, setGuestCount] = useState(1);

  return (
    <div className="step-card">
      <h2>¿Cuántas personas asistirán?</h2>
      <input
        type="number"
        min="1"
        value={guestCount}
        onChange={(e) => setGuestCount(Number(e.target.value))}
      />
      <button onClick={() => onNext(guestCount)}>Continuar</button>
    </div>
  );
}