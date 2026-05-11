// src/components/booking/ReservationFlow.jsx
import { useState, useEffect } from "react";
import GuestCountStep from "./GuestCountStep";
import SalonMap from "./SalonMap";
import ReservationForm from "./ReservationForm";
import ReservationSuccess from "./ReservationSuccess";
import { getMesas } from "../../services/mesasService";
import { createReserva } from "../../services/reservasService";

export default function ReservationFlow() {
  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [mesas, setMesas] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    getMesas().then(({ data }) => setMesas(data || []));
  }, []);

  const handleGuestCount = (count) => { setGuestCount(count); setStep(2); };
  const handleSelectTable = (mesa) => { setSelectedTable(mesa); setStep(3); };

  const handleSubmitReservation = async (form) => {
    const payload = {
      mesa_id: selectedTable.id,
      cliente_nombre: form.nombre,
      cliente_tel: form.telefono,
      cliente_email: form.email,
      fecha: form.fecha,
      hora: form.hora,
      num_personas: guestCount,
      estado: "activa",
    };
    const { error } = await createReserva(payload);
    if (error) { alert("Error al guardar la reserva: " + error.message); return; }
    setReservation({ mesaNumero: selectedTable.numero, ...form });
    setStep(4);
  };

  const resetFlow = () => { setStep(1); setGuestCount(1); setSelectedTable(null); setReservation(null); };

  return (
    <div>
      {step === 1 && <GuestCountStep onNext={handleGuestCount} />}
      {step === 2 && (
        <SalonMap
          mesas={mesas}
          guestCount={guestCount}
          selectedTable={selectedTable}
          onSelectTable={handleSelectTable}
          onBack={() => setStep(1)}         
        />
      )}
      {step === 3 && (
        <ReservationForm
          mesa={selectedTable}
          onSubmit={handleSubmitReservation}
          onBack={() => setStep(2)}          
        />
      )}
      {step === 4 && <ReservationSuccess reservation={reservation} onReset={resetFlow} />}
    </div>
  );
}