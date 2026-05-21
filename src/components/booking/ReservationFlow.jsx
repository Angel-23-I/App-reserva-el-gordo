import { useEffect, useMemo, useState } from "react";
import BookingStep from "./BookingStep";
import SalonMap from "./SalonMap";
import ReservationForm from "./ReservationForm";
import ReservationSuccess from "./ReservationSuccess";
import { getMesas } from "../../services/mesasService";
import { createReserva, getReservasByDateTime } from "../../services/reservasService";

export default function ReservationFlow() {
  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [mesas, setMesas] = useState([]);
  const [occupiedTableIds, setOccupiedTableIds] = useState([]);
  const [selectedTables, setSelectedTables] = useState([]);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    getMesas().then(({ data }) => setMesas(data || []));
  }, []);

  const loadOccupiedTables = async (fechaParam, horaParam) => {
    const { data, error } = await getReservasByDateTime(fechaParam, horaParam);
    if (error) {
      alert("No se pudo cargar la disponibilidad de mesas.");
      return;
    }
    setOccupiedTableIds((data || []).map((r) => r.mesa_id));
  };

  const totalCapacidad = useMemo(
    () => selectedTables.reduce((sum, m) => sum + m.capacidad, 0),
    [selectedTables]
  );

  const capacidadCompleta = totalCapacidad >= guestCount;

  const handleBookingSubmit = ({ guestCount: count, fecha: f, hora: h }) => {
    setGuestCount(count);
    setFecha(f);
    setHora(h);
    setSelectedTables([]);
    loadOccupiedTables(f, h);
    setStep(2);
  };

  const handleSelectTable = (mesa) => {
    setSelectedTables((prev) => {
      const exists = prev.some((m) => m.id === mesa.id);
      if (exists) return prev.filter((m) => m.id !== mesa.id);

      const capacidadActual = prev.reduce((sum, m) => sum + m.capacidad, 0);
      if (capacidadActual >= guestCount) return prev;

      return [...prev, mesa];
    });
  };

  const handleGoToForm = () => {
    if (!capacidadCompleta) {
      alert("Selecciona mesas suficientes para cubrir el número de personas.");
      return;
    }
    setStep(3);
  };

  const handleSubmitReservation = async (form) => {
    const { data: ocupadas, error: disponibilidadError } = await getReservasByDateTime(fecha, hora);
    if (disponibilidadError) {
      alert("No se pudo validar la disponibilidad.");
      return;
    }

    const ocupadasIds = new Set((ocupadas || []).map((r) => r.mesa_id));
    const conflicto = selectedTables.some((m) => ocupadasIds.has(m.id));
    if (conflicto) {
      alert("Una de las mesas seleccionadas ya fue reservada para esa fecha y hora.");
      await loadOccupiedTables(fecha, hora);
      setStep(2);
      return;
    }

    for (const mesa of selectedTables) {
      const payload = {
        mesa_id: mesa.id,
        cliente_nombre: form.nombre,
        cliente_tel: form.telefono,
        cliente_email: form.email,
        fecha,
        hora,
        num_personas: guestCount,
        estado: "activa",
      };

      const { error } = await createReserva(payload);
      if (error) {
        alert("Error al guardar la reserva: " + error.message);
        return;
      }
    }

    setReservation({
      mesas: selectedTables,
      fecha,
      hora,
      ...form,
    });
    setStep(4);
  };

  const resetFlow = () => {
    setStep(1);
    setGuestCount(1);
    setFecha("");
    setHora("");
    setSelectedTables([]);
    setOccupiedTableIds([]);
    setReservation(null);
  };

  return (
    <div>
      {step === 1 && <BookingStep onNext={handleBookingSubmit} />}

      {step === 2 && (
        <SalonMap
          mesas={mesas}
          guestCount={guestCount}
          fecha={fecha}
          hora={hora}
          occupiedTableIds={occupiedTableIds}
          selectedTables={selectedTables}
          onSelectTable={handleSelectTable}
          onContinue={handleGoToForm}
          totalCapacidad={totalCapacidad}
          capacidadCompleta={capacidadCompleta}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <ReservationForm
          mesas={selectedTables}
          guestCount={guestCount}
          fecha={fecha}
          hora={hora}
          onSubmit={handleSubmitReservation}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <ReservationSuccess reservation={reservation} onReset={resetFlow} />
      )}
    </div>
  );
}
