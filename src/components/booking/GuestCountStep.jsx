import { useState } from "react";

export default function GuestCountStep({ onNext }) {
  const [guestCount, setGuestCount] = useState(1);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
      <div className="text-5xl mb-4">👥</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">¿Cuántas personas asistirán?</h2>
      <p className="text-gray-500 text-sm mb-6">Selecciona la cantidad para ver las mesas disponibles</p>
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
          className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 text-xl font-bold hover:bg-gray-200 transition"
        >−</button>
        <span className="text-4xl font-bold text-red-600 w-12">{guestCount}</span>
        <button
          onClick={() => setGuestCount((c) => c + 1)}
          className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 text-xl font-bold hover:bg-gray-200 transition"
        >+</button>
      </div>
      <button
        onClick={() => onNext(guestCount)}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Ver mesas disponibles →
      </button>
    </div>
  );
}