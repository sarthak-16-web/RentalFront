import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import PropertiesManager from "./PropertiesManager";
import ProjectsManager from "./ProjectsManager";
import TestimonialsManager from "./TestimonialsManager";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const TABS = [
  { key: "properties", label: "Properties" },
  { key: "featured", label: "Featured Properties" },
  { key: "projects", label: "Upcoming Projects" },
  { key: "testimonials", label: "Testimonials" },
];

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="rk-adash">
      <aside className="rk-adash__sidebar">
       <Link to="/" className="rk-adash__brand">
  Rental<em>King</em>
  <span>Admin</span>
</Link>

        <nav className="rk-adash__nav">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={activeTab === t.key ? "is-active" : ""}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="rk-adash__footer">
          <p>{admin?.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      <main className="rk-adash__content">
        {activeTab === "properties" && <PropertiesManager featuredOnly={false} />}
        {activeTab === "featured" && <PropertiesManager featuredOnly={true} />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "testimonials" && <TestimonialsManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;