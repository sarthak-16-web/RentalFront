import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const WhatsappIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.05 2C6.5 2 2 6.475 2 11.987c0 1.98.575 3.83 1.567 5.396L2 22l4.75-1.523a10.02 10.02 0 0 0 5.3 1.51h.004c5.55 0 10.05-4.475 10.05-9.987C22.104 6.487 17.6 2 12.05 2zm0 18.163h-.003a8.5 8.5 0 0 1-4.339-1.19l-.312-.185-3.226 1.034 1.055-3.146-.204-.323a8.36 8.36 0 0 1-1.309-4.522c0-4.641 3.79-8.417 8.443-8.417 2.256 0 4.375.877 5.97 2.468a8.363 8.363 0 0 1 2.472 5.955c0 4.641-3.79 8.326-8.547 8.326z" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Featured", to: "/featured" },
  { label: "Upcoming", to: "/upcoming" },
  { label: "Testimonials", to: "/testimonials" },
];

const COMPANY_LINKS = [
  { label: "Meet the Team", to: "/team" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact & Support", to: "/contact" },
];

const WHATSAPP_NUMBER = "911234567890"; // update with your actual WhatsApp number (no + or spaces)

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`rk-navbar ${scrolled ? "is-scrolled" : ""}`}>
      {/* Top utility bar */}
      <div className="rk-topbar">
        <div className="rk-topbar__inner">
          <div className="rk-topbar__contact">
            <a href="tel:+911234567890">
              <PhoneIcon /> <span>+91 12345 67890</span>
            </a>
            <a href="mailto:hello@rentalking.com">
              <MailIcon /> <span>hello@rentalking.com</span>
            </a>
          </div>
          <p className="rk-topbar__tagline">Homes and spaces, matched right.</p>
        </div>
      </div>

      {/* Main nav */}
      <div className="rk-nav">
        <div className="rk-nav__inner">
          <Link to="/" className="rk-logo" onClick={() => setMobileOpen(false)}>
            <span className="rk-logo__mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 12 12 4l9 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11v9h12v-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="rk-logo__text">
              Rental<em>King</em>
            </span>
          </Link>

          <nav className="rk-links">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `rk-link ${isActive ? "is-active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}

            <div
              className="rk-dropdown"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button className="rk-link rk-dropdown__trigger" onClick={() => setCompanyOpen((v) => !v)}>
                Company <ChevronIcon open={companyOpen} />
              </button>
              {companyOpen && (
                <div className="rk-dropdown__menu">
                  {COMPANY_LINKS.map((link) => (
                    <Link key={link.to} to={link.to} className="rk-dropdown__item">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="rk-nav__actions">
            <Link to="/contact" className="rk-cta">
              Enquire Now
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rk-whatsapp"
              aria-label="Chat on WhatsApp"
            >
              <WhatsappIcon />
            </a>
          </div>

          <button
            className="rk-burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="rk-mobile">
          {[...NAV_LINKS, ...COMPANY_LINKS].map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="rk-mobile__link">
              {link.label}
            </Link>
          ))}
          <div className="rk-mobile__actions">
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="rk-cta rk-cta--block">
              Enquire Now
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rk-whatsapp rk-whatsapp--block"
              aria-label="Chat on WhatsApp"
            >
              <WhatsappIcon />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;