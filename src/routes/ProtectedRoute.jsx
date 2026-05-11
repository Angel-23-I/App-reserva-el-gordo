// src/routes/ProtectedRoute.jsx
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (!session) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}