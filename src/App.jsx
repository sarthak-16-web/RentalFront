import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles/variable.css";
import TeamPreview from "./pages/TeamPreview";
import PartnersMarquee from "./pages/Partnersmarquee";
import TestimonialsHome from "./pages/TestimonialsHome";
import PropertiesHome from "./pages/PropertiesHome";
import Navbar from "./pages/Navbar";
import Fotter from "./pages/Fotter";
import Testimonials from "./pages/Testimonials";
import Home from "./pages/Home";
import Properties from "./pages/Properties"; // Create this page
import PropertyDetails from "./pages/PropertyDetails";
import ContactUs from "./pages/Contactus";
 import ScrollToTop from "./components/Scrolltop";
 import Collaboration from "./pages/Collaboration";
 import TeamMemberDetails from "./pages/Teammemberdetails";
 import UpcomingProjects from "./pages/Upcomingprojects";
 import FeaturedProperties from "./pages/FeaturedProperties";
function App() {
  return (
  
    <BrowserRouter>
     <ScrollToTop></ScrollToTop>
      <Navbar />

      <Routes>
         
        <Route
          path="/"
          element={
            <>
              <Home />
              <PropertiesHome />
              <TeamPreview />
              <PartnersMarquee />
              <TestimonialsHome />
            </>
          }
        />
     
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/team" element={<TeamMemberDetails />} />
        <Route path="/upcoming" element={<UpcomingProjects />} />
        <Route path="/featured" element={<FeaturedProperties />} />
        
      </Routes>

      <Fotter />
    </BrowserRouter>
  );
}

export default App;