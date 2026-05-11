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
  const [selectedTables, setSelectedTables] = useState([]); // ← ahora es array
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    getMesas().then(({ data }) => setMesas(data || []));
  }, []);

  const handleGuestCount = (count) => { setGuestCount(count); setStep(2); };

  // Toggle: agrega o quita mesa del array
  const handleSelectTable = (mesa) => {
    setSelectedTables((prev) => {
      const existe = prev.find((m) => m.id === mesa.id);
      if (existe) return prev.filter((m) => m.id !== mesa.id);
      return [...prev, mesa];
    });
  };

  // Capacidad total de las mesas seleccionadas
  const totalCapacidad = selectedTables.reduce((sum, m) => sum + m.capacidad, 0);
  const necesitaVariasMesas = !mesas.some(
    (m) => m.estado === "disponible" && m.capacidad >= guestCount
  );

  const handleGoToForm = () => {
    if (selectedTables.length === 0) {
      alert("Selecciona al menos una mesa.");
      return;
    }
    if (totalCapacidad < guestCount) {
      alert(`La capacidad total (${totalCapacidad} personas) es menor al grupo (${guestCount}). Selecciona más mesas.`);
      return;
    }
    setStep(3);
  };

  const handleSubmitReservation = async (form) => {
    // Crear una reserva por cada mesa seleccionada
    const errors = [];
    for (const mesa of selectedTables) {
      const payload = {
        mesa_id: mesa.id,
        cliente_nombre: form.nombre,
        cliente_tel: form.telefono,
        cliente_email: form.email,
        fecha: form.fecha,
        hora: form.hora,
        num_personas: guestCount,
        estado: "activa",
      };
      const { error } = await createReserva(payload);
      if (error) errors.push(error.message);
    }

    if (errors.length > 0) {
      alert("Error al guardar: " + errors[0]);
      return;
    }

    setReservation({
      mesas: selectedTables,
      ...form,
    });
    setStep(4);
  };

  const resetFlow = () => {
    setStep(1);
    setGuestCount(1);
    setSelectedTables([]);
    setReservation(null);
  };

  return (
    <div>
      {step === 1 && <GuestCountStep onNext={handleGuestCount} />}
      {step === 2 && (
        <SalonMap
          mesas={mesas}
          guestCount={guestCount}
          selectedTables={selectedTables}
          onSelectTable={handleSelectTable}
          onContinue={handleGoToForm}
          totalCapacidad={totalCapacidad}
          necesitaVariasMesas={necesitaVariasMesas}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <ReservationForm
          mesas={selectedTables}
          onSubmit={handleSubmitReservation}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && <ReservationSuccess reservation={reservation} onReset={resetFlow} />}
    </div>
  );
}