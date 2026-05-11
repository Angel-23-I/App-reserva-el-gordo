import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInAdmin } from "../services/authService";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signInAdmin(email, password);
    if (error) {
      alert("Error de autenticación: " + error.message);
      return;
    }
    navigate("/admin/dashboard");
  };

  return (
    <div className="login-page">
      <h2>Panel de Administración · Comidas Rápidas The Gordo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo del administrador"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}