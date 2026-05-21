import { useState } from "react";

export default function ReservationForm({ mesas = [], guestCount, fecha, hora, onSubmit, onBack }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 w-full max-w-3xl mx-auto">
      <div className="bg-amber-100/50 border border-amber-300 rounded-2xl p-4 mb-6">
        <p className="text-amber-700 font-semibold text-sm text-center mb-2">
          Resumen de reserva
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {mesas.map((m) => (
            <span key={m.id} className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium">
              Mesa {m.numero} · {m.capacidad} pers.
            </span>
          ))}
        </div>
        <p className="text-sm text-center text-amber-600">
          {fecha} · {hora} · {guestCount} personas
        </p>
      </div>

      <h2 className="text-2xl font-bold text-amber-800 mb-6">Datos del cliente</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="grid grid-cols-1 gap-4"
      >
        <div>
          <label className="text-xs font-semibold text-amber-700 mb-1 block">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full border border-amber-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-amber-700 mb-1 block">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
            className="w-full border border-amber-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-amber-700 mb-1 block">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-amber-200 rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-amber-200"
          >
            Confirmar reserva
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 sm:flex-none px-6 text-sm text-amber-500 hover:text-amber-700 underline"
          >
            ← Volver a mesas
          </button>
        </div>
      </form>
    </div>
  );
}
