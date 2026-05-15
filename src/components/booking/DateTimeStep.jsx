import { useState } from "react";

const HOURS = [
  "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
];

export default function DateTimeStep({ guestCount, onContinue, onBack }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !hora) return;
    onContinue({ fecha, hora });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Elige fecha y hora</h2>
        <p className="text-gray-500 mt-2">
          Reserva para {guestCount} persona{guestCount > 1 ? "s" : ""}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Fecha de la reserva
          </label>
          <input
            type="date"
            min={today}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Selecciona la hora
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {HOURS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHora(h)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  hora === h
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:text-red-600"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            ← Volver
          </button>

          <button
            type="submit"
            disabled={!fecha || !hora}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition ${
              fecha && hora ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continuar a elegir mesa
          </button>
        </div>
      </form>
    </div>
  );
}