import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/variable.css";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import { QuickViewProvider } from "./context/QuickViewContext";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AppPreloader from "./components/AppPreloader";
import PropertyQuickView from "./components/PropertyQuickView";
// Components
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import ScrollToTop from "./components/Scrolltop";

// Public Pages
import Home from "./pages/Home";
import PropertiesHome from "./pages/PropertiesHome";
import PartnersMarquee from "./pages/Partnersmarquee";
import TestimonialsHome from "./pages/TestimonialsHome";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Testimonials from "./pages/Testimonials";
import ContactUs from "./pages/Contactus";
import Collaboration from "./pages/Collaboration";
import TeamMemberDetails from "./pages/Teammemberdetails";
import UpcomingProjects from "./pages/Upcomingprojects";
import Legalpage from "./pages/Legalpage";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <AppPreloader />
      <AdminAuthProvider>
      <QuickViewProvider>
        <ScrollToTop />
        <PropertyQuickView />

        <Routes>
          {/* ================= PUBLIC WEBSITE ================= */}

          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <PropertiesHome />
                <PartnersMarquee />
                <TestimonialsHome />
                <Footer />
              </>
            }
          />

          <Route
            path="/properties"
            element={
              <>
                <Navbar />
                <Properties />
                <Footer />
              </>
            }
          />

          <Route
            path="/properties/:id"
            element={
              <>
                <Navbar />
                <PropertyDetails />
                <Footer />
              </>
            }
          />

          <Route
            path="/testimonials"
            element={
              <>
                <Navbar />
                <Testimonials />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <ContactUs />
                <Footer />
              </>
            }
          />

          <Route
            path="/collaboration"
            element={
              <>
                <Navbar />
                <Collaboration />
                <Footer />
              </>
            }
          />

          <Route
            path="/team"
            element={
              <>
                <Navbar />
                <TeamMemberDetails />
                <Footer />
              </>
            }
          />

          <Route
            path="/upcoming"
            element={
              <>
                <Navbar />
                <UpcomingProjects />
                <Footer />
              </>
            }
          />

          <Route
            path="/legal"
            element={
              <>
                <Navbar />
                <Legalpage />
                <Footer />
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
      </QuickViewProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;