export default function ReservationSuccess({ reservation, onReset }) {
  return (
    <div className="step-card">
      <h2>Reserva confirmada</h2>
      <p>Mesa: {reservation.mesaNumero}</p>
      <p>Fecha: {reservation.fecha}</p>
      <p>Hora: {reservation.hora}</p>
      <p>Cliente: {reservation.nombre}</p>
      <button onClick={onReset}>Volver al inicio</button>
    </div>
  );
}