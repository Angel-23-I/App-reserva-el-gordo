import { useNavigate } from "react-router-dom";
import ReservationFlow from "../components/booking/ReservationFlow";
import logo from "../assets/logo-restaurante.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-orange-500 text-white py-5 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo Comidas Rápidas The Gordo"
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/40 bg-white"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Comidas Rápidas The Gordo
              </h1>
              <p className="text-red-100 text-sm">Sistema de Reservas de Mesas</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition border border-white/30"
          >
            Admin
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-10">
        <ReservationFlow />
      </main>

      <footer className="mt-auto text-center text-gray-400 text-xs py-6">
        © 2026 Comidas Rápidas The Gordo · Todos los derechos reservados
      </footer>
    </div>
  );
}