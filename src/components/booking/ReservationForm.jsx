// src/components/booking/ReservationForm.jsx
import { useState } from "react";

export default function ReservationForm({ mesas = [], onSubmit, onBack }) {
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">

      {/* Mesas seleccionadas */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
        <p className="text-red-700 font-semibold text-sm text-center mb-2">🪑 Mesas seleccionadas</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {mesas.map((m) => (
            <span key={m.id} className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
              Mesa {m.numero} · {m.capacidad} pers. · {m.ubicacion}
            </span>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-5">Completa tu reserva</h2>

      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Fecha</label>
            <input
              type="date" name="fecha" min={today}
              value={form.fecha} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Hora</label>
            <input
              type="time" name="hora"
              value={form.hora} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Nombre completo</label>
          <input
            type="text" name="nombre" placeholder="Ej: Juan Pérez"
            value={form.nombre} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Teléfono</label>
          <input
            type="tel" name="telefono" placeholder="Ej: 3001234567"
            value={form.telefono} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">Correo electrónico</label>
          <input
            type="email" name="email" placeholder="Ej: juan@email.com"
            value={form.email} onChange={handleChange} required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition mt-2"
        >
          Confirmar reserva ✓
        </button>

        <button
          type="button" onClick={onBack}
          className="w-full text-sm text-gray-400 hover:text-gray-600 underline"
        >
          ← Volver al salón
        </button>
      </form>
    </div>
  );
}