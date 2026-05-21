import { useNavigate } from "react-router-dom";
import ReservationFlow from "../components/booking/ReservationFlow";
import logo from "../assets/logo-restaurante.png";
import hero from "../assets/hero.png";
import carta1 from "../assets/carta1.png";
import carta2 from "../assets/carta2.png";
import carta3 from "../assets/carta3.png";
import carta4 from "../assets/carta4.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-amber-50 to-white">
      <header className="bg-white/80 backdrop-blur-md text-amber-900 py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo Comidas Rápidas The Gordo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-amber-300 bg-white"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                The Gordo
              </h1>
              <p className="text-amber-600 text-xs">Reserva de Mesas</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin")}
            className="bg-amber-100 hover:bg-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded-xl transition border border-amber-200"
          >
            Admin
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-linear-to-br from-amber-300 via-amber-200 to-orange-200 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-gray-800 text-4xl md:text-5xl font-bold leading-tight">
              Sabores que <span className="text-amber-500">enamoran</span>
            </h2>
            <p className="mt-4 text-lg text-gray-800 max-w-lg mx-auto md:mx-0">
              Disfruta de la mejor comida rápida en un ambiente único. 
              Reserva tu mesa y vive una experiencia inolvidable.
            </p>
            <a
              href="#reservar"
              className="mt-6 inline-block bg-white text-amber-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-amber-50 transition"
            >
              Reserva ahora
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={hero}
              alt="Plato destacado"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
      </section>

      <main id="reservar" className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-800">Reserva tu mesa</h3>
          <p className="text-amber-600 mt-2">Elige cuándo y cuántos serán para empezar</p>
        </div>
        <ReservationFlow />
      </main>

      <section className="bg-amber-100/30 border-t border-amber-200 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-800">Nuestra Carta</h3>
            <p className="text-amber-600 mt-2">Descubre nuestros deliciosos platos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ src: carta1, alt: "Carta 1" }, { src: carta2, alt: "Carta 2" }, { src: carta3, alt: "Carta 3" }, { src: carta4, alt: "Carta 4" }].map((img, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition">
                <img src={img.src} alt={img.alt} className="w-full h-80 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-800">Encuéntranos</h3>
          <p className="text-amber-600 mt-2">Estamos ubicados en Bucaramanga</p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9166911589596!2d-73.12752730000001!3d7.135632299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6815f9bd6ac1a3%3A0xfa3953af5513841c!2sComidas%20Rapidas%20The%20Gordo!5e0!3m2!1ses!2sco!4v1779327770934!5m2!1ses!2sco"
            width="500"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación The Gordo"
          />
        </div>
      </section>

      <section className="bg-amber-100/30 border-t border-amber-200 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">Contáctanos</h3>
          <p className="text-amber-600 mb-8">Síguenos en nuestras redes sociales</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://wa.me/573004536404"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/thegordo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-linear-to-br from-pink-500 via-purple-500 to-orange-400 hover:scale-105 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com/comidasrapidasthegordo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@thegordo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition"
              title="TikTok"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/573004536404"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-lg transition hover:scale-105 z-50"
        title="Chatea con nosotros"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      <footer className="mt-auto text-center text-amber-500 text-xs py-6 border-t border-amber-200">
        © 2026 Comidas Rápidas The Gordo · Todos los derechos reservados
      </footer>
    </div>
  );
}
