import { useState } from "react";

export default function ReservationForm({ mesa, onSubmit, onBack }) {
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    nombre: "",
    telefono: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="step-card">
      <h2>Reservar Mesa {mesa.numero}</h2>
      <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
      <input name="hora" type="time" value={form.hora} onChange={handleChange} required />
      <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
      <button type="submit">Confirmar reserva</button>
      <button type="button" onClick={onBack}>Volver</button>
    </form>
  );
}