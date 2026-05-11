import Sidebar from "../components/admin/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout({ children }) {
  const { session, loading } = useAuth();
  const user = session?.user;

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="admin-layout">
      <Sidebar user={user} />
      <main>
        {children}
      </main>
    </div>
  );
}