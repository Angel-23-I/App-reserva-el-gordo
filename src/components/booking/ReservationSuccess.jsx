// src/components/booking/ReservationSuccess.jsx
export default function ReservationSuccess({ reservation, onReset }) {
  return (
    <div className="success-card">
      <h2>✅ Reserva confirmada</h2>
      <p><strong>Mesa:</strong> #{reservation.mesaNumero}</p>
      <p><strong>Fecha:</strong> {reservation.fecha}</p>
      <p><strong>Hora:</strong> {reservation.hora}</p>
      <p><strong>Cliente:</strong> {reservation.nombre}</p>
      <p><strong>Teléfono:</strong> {reservation.telefono}</p>
      <p><strong>Correo:</strong> {reservation.email}</p>
      <button onClick={onReset}>Volver al inicio</button>
    </div>
  );
}