export default function ReservationSuccess({ reservation, onReset }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-2xl font-bold text-amber-700 mb-1">¡Reserva confirmada!</h2>
      <p className="text-amber-600 text-sm mb-6">Tu mesa ha sido reservada exitosamente</p>
      <div className="bg-amber-100/50 border border-amber-300 rounded-xl p-4 text-left space-y-2 mb-6">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Mesa(s):</span>{" "}
          {reservation.mesas.map((m) => `Mesa ${m.numero}`).join(", ")}
        </p>
        <p className="text-sm text-amber-800"><span className="font-semibold">Fecha:</span> {reservation.fecha}</p>
        <p className="text-sm text-amber-800"><span className="font-semibold">Hora:</span> {reservation.hora}</p>
        <p className="text-sm text-amber-800"><span className="font-semibold">Nombre:</span> {reservation.nombre}</p>
        <p className="text-sm text-amber-800"><span className="font-semibold">Teléfono:</span> {reservation.telefono}</p>
        <p className="text-sm text-amber-800"><span className="font-semibold">Correo:</span> {reservation.email}</p>
      </div>
      <button onClick={onReset} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-amber-200">
        Volver al inicio
      </button>
    </div>
  );
}
