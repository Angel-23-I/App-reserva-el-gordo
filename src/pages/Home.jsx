// src/pages/Home.jsx
import { useNavigate } from "react-router-dom";
import ReservationFlow from "../components/booking/ReservationFlow";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-600 text-white py-5 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">🍔 Comidas Rápidas The Gordo</h1>
            <p className="text-red-200 text-xs mt-0.5">Sistema de Reservas de Mesas</p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-xl transition border border-white/30"
          >
            🔐 Admin
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <ReservationFlow />
      </main>

      <footer className="text-center text-gray-400 text-xs py-6">
        © 2026 Comidas Rápidas The Gordo · Todos los derechos reservados
      </footer>
    </div>
  );
}