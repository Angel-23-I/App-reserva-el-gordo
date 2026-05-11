import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import TablesPage from "./pages/admin/TablesPage";
import ReservationsPage from "./pages/admin/ReservationsPage";
import SchedulesPage from "./pages/admin/SchedulesPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tables"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TablesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ReservationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/schedules"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <SchedulesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}