import { useState, useEffect } from "react";
import GuestCountStep from "./GuestCountStep";
import SalonMap from "./SalonMap";
import ReservationForm from "./ReservationForm";
import ReservationSuccess from "./ReservationSuccess";
import { getMesas } from "../../services/mesasService";
import { createReserva } from "../../services/reservasService";

export default function ReservationFlow() {
  const [step, setStep] = useState(1); // 1 = count, 2 = mapa, 3 = form, 4 = success
  const [guestCount, setGuestCount] = useState(1);
  const [mesas, setMesas] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const loadMesas = async () => {
      const { data } = await getMesas();
      setMesas(data || []);
    };
    loadMesas();
  }, []);

  const handleGuestCount = (count) => {
    setGuestCount(count);
    setStep(2);
  };

  const handleSelectTable = (mesa) => {
    setSelectedTable(mesa);
    setStep(3);
  };

const handleSubmitReservation = async (form) => {
  // ← AGREGA ESTAS LÍNEAS TEMPORALES
  console.log("selectedTable completo:", selectedTable);
  console.log("mesa_id que se va a enviar:", selectedTable?.id);

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

  console.log("Payload completo:", payload);

  const { data, error } = await createReserva(payload);

  //console.log("Respuesta Supabase data:", data);
  //console.log("Respuesta Supabase error:", error);

  if (error) {
    alert("Error al guardar la reserva: " + error.message);
    return;
  }

  setReservation({ mesaNumero: selectedTable.numero, ...form });
  setStep(4);
};

  const resetFlow = () => {
    setStep(1);
    setGuestCount(1);
    setSelectedTable(null);
    setReservation(null);
  };

  return (
    <div className="reservation-flow">
      {step === 1 && (
        <GuestCountStep onNext={handleGuestCount} />
      )}
      {step === 2 && (
        <SalonMap
          mesas={mesas}
          guestCount={guestCount}
          selectedTable={selectedTable}
          onSelectTable={handleSelectTable}
        />
      )}
      {step === 3 && selectedTable && (
        <ReservationForm
          mesa={selectedTable}
          onSubmit={handleSubmitReservation}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && reservation && (
        <ReservationSuccess
          reservation={reservation}
          onReset={resetFlow}
        />
      )}
    </div>
  );
}