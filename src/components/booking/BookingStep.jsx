import { useState } from "react";

const HOURS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

export default function BookingStep({ onNext }) {
  const [guestCount, setGuestCount] = useState(1);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const canContinue = guestCount > 0 && fecha && hora;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canContinue) return;
    onNext({ guestCount, fecha, hora });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-amber-100/50 border border-amber-300 rounded-2xl p-5 text-center">
            <label className="block text-sm font-semibold text-amber-800 mb-4">
              ¿Cuántas personas?
            </label>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                type="button"
                onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                className="w-10 h-10 rounded-full bg-white text-amber-600 text-xl font-bold shadow-sm border border-amber-200 hover:bg-amber-100 transition"
              >−</button>
              <span className="text-4xl font-bold text-amber-600 w-12">{guestCount}</span>
              <button
                type="button"
                onClick={() => setGuestCount((c) => c + 1)}
                className="w-10 h-10 rounded-full bg-white text-amber-600 text-xl font-bold shadow-sm border border-amber-200 hover:bg-amber-100 transition"
              >+</button>
            </div>
            <p className="text-xs text-amber-600">{guestCount} persona{guestCount > 1 ? "s" : ""}</p>
          </div>

          <div className="bg-amber-100/50 border border-amber-300 rounded-2xl p-5">
            <label className="block text-sm font-semibold text-amber-800 mb-4">
              Fecha
            </label>
            <input
              type="date"
              min={today}
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="w-full border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
          </div>

          <div className="bg-amber-100/50 border border-amber-300 rounded-2xl p-5">
            <label className="block text-sm font-semibold text-amber-800 mb-4">
              Hora
            </label>
            <div className="grid grid-cols-2 gap-2">
              {HOURS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHora(h)}
                  className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    hora === h
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:text-amber-600"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={!canContinue}
            className={`px-10 py-3 rounded-xl font-semibold text-white transition text-lg ${
              canContinue ? "bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-200" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Ver mesas disponibles →
          </button>
        </div>
      </form>
    </div>
  );
}
