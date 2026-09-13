import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { getAllTestimonials } from "../api/adminResourceApi";
import PropertiesManager from "./PropertiesManager";
import ProjectsManager from "./ProjectsManager";
import TestimonialsManager from "./TestimonialsManager";
import ContactSettings from "./ContactSettings";
import TeamManager from "./TeamManager";
import PartnersManager from "./PartnersManager";
import AssetsManager from "./AssetsManager";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const TABS = [
  { key: "properties", label: "Properties" },
  { key: "projects", label: "Projects" },
  { key: "testimonials", label: "Testimonials" },
  { key: "contacts", label: "Contact Details" },
  { key: "team", label: "Team" },
  { key: "partners", label: "Channel Partners" },
  { key: "assets", label: "Assets" },
];

const AdminDashboard = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("properties");

  const { data: testimonials = [] } = useQuery({
    queryKey: ["adminTestimonials"],
    queryFn: getAllTestimonials,
  });
  const pendingTestimonials = testimonials.filter((t) => !t.approved).length;

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
              {t.key === "testimonials" && pendingTestimonials > 0 && (
                <span className="rk-adash__navbadge">{pendingTestimonials}</span>
              )}
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
        {activeTab === "assets" && <AssetsManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;