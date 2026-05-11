import ReservationFlow from "../components/booking/ReservationFlow";

export default function Home() {
  return (
    <div className="home-page">
      <header>
        <h1>Comidas Rápidas The Gordo</h1>
        <p>Sistema de Reservas de Mesas</p>
      </header>
      <main>
        <ReservationFlow />
      </main>
      <footer>
        <p>Contacto: comidasrapidasthegordo@example.com</p>
      </footer>
    </div>
  );
}