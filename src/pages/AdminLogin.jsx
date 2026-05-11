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
    if (error) return alert(error.message);
    navigate("/admin/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingresar al panel</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Contraseña" />
      <button type="submit">Ingresar</button>
    </form>
  );
}