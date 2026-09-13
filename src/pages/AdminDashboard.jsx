import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import PropertiesManager from "./PropertiesManager";
import ProjectsManager from "./ProjectsManager";
import TestimonialsManager from "./TestimonialsManager";
import ContactSettings from "./ContactSettings";
import TeamManager from "./TeamManager";
import PartnersManager from "./PartnersManager";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const TABS = [
  { key: "properties", label: "Properties" },
  { key: "projects", label: "Upcoming Projects" },
  { key: "testimonials", label: "Testimonials" },
  { key: "contacts", label: "Contact Details" },
  { key: "team", label: "Team" },
  { key: "partners", label: "Channel Partners" },
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
          <p>{admin?.username}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      <main className="rk-adash__content">
        {activeTab === "properties" && <PropertiesManager />}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "testimonials" && <TestimonialsManager />}
        {activeTab === "contacts" && <ContactSettings />}
        {activeTab === "team" && <TeamManager />}
        {activeTab === "partners" && <PartnersManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;