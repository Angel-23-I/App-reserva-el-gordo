export const canFitPeople = (mesa, guestCount) => {
  return mesa.capacidad >= guestCount;
};

export const getMesaStatusClass = (estado) => {
  if (estado === "disponible") return "available";
  if (estado === "ocupada") return "occupied";
  return "blocked";
};