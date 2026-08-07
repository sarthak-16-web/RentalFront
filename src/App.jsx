import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/variable.css";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AppPreloader from "./components/AppPreloader";
// Components
import Navbar from "./pages/Navbar";
import Fotter from "./pages/Fotter";
import ScrollToTop from "./components/Scrolltop";

// Public Pages
import Home from "./pages/Home";
import PropertiesHome from "./pages/PropertiesHome";
import TeamPreview from "./pages/TeamPreview";
import PartnersMarquee from "./pages/Partnersmarquee";
import TestimonialsHome from "./pages/TestimonialsHome";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Testimonials from "./pages/Testimonials";
import ContactUs from "./pages/Contactus";
import Collaboration from "./pages/Collaboration";
import TeamMemberDetails from "./pages/Teammemberdetails";
import UpcomingProjects from "./pages/Upcomingprojects";
import FeaturedProperties from "./pages/FeaturedProperties";
import Legalpage from "./pages/Legalpage";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <AppPreloader />
      <AdminAuthProvider>
        <ScrollToTop />

        <Routes>
          {/* ================= PUBLIC WEBSITE ================= */}

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <PropertiesHome />
                <TeamPreview />
                <PartnersMarquee />
                <TestimonialsHome />
                <Fotter />
              </>
            }
          />

          <Route
            path="/properties"
            element={
              <>
                <Navbar />
                <Properties />
                <Fotter />
              </>
            }
          />

          <Route
            path="/properties/:id"
            element={
              <>
                <Navbar />
                <PropertyDetails />
                <Fotter />
              </>
            }
          />

          <Route
            path="/testimonials"
            element={
              <>
                <Navbar />
                <Testimonials />
                <Fotter />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <ContactUs />
                <Fotter />
              </>
            }
          />

          <Route
            path="/collaboration"
            element={
              <>
                <Navbar />
                <Collaboration />
                <Fotter />
              </>
            }
          />

          <Route
            path="/team"
            element={
              <>
                <Navbar />
                <TeamMemberDetails />
                <Fotter />
              </>
            }
          />

          <Route
            path="/upcoming"
            element={
              <>
                <Navbar />
                <UpcomingProjects />
                <Fotter />
              </>
            }
          />

          <Route
            path="/featured"
            element={
              <>
                <Navbar />
                <FeaturedProperties />
                <Fotter />
              </>
            }
          />

          <Route
            path="/legal"
            element={
              <>
                <Navbar />
                <Legalpage />
                <Fotter />
              </>
            }
          />

          {/* ================= ADMIN ================= */}

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;