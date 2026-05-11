import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}