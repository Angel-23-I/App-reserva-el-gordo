export default function ReservationSuccess({ reservation, onReset }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">✅</div>
      <h2 className="text-2xl font-bold text-green-700 mb-1">¡Reserva confirmada!</h2>
      <p className="text-gray-500 text-sm mb-6">Tu mesa ha sido reservada exitosamente</p>
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left space-y-2 mb-6">
        <p className="text-sm"><span className="font-semibold text-gray-600">Mesa:</span> #{reservation.mesaNumero}</p>
        <p className="text-sm"><span className="font-semibold text-gray-600">Fecha:</span> {reservation.fecha}</p>
        <p className="text-sm"><span className="font-semibold text-gray-600">Hora:</span> {reservation.hora}</p>
        <p className="text-sm"><span className="font-semibold text-gray-600">Nombre:</span> {reservation.nombre}</p>
        <p className="text-sm"><span className="font-semibold text-gray-600">Teléfono:</span> {reservation.telefono}</p>
        <p className="text-sm"><span className="font-semibold text-gray-600">Correo:</span> {reservation.email}</p>
      </div>
      <button
        onClick={onReset}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Hacer otra reserva
      </button>
    </div>
  );
}