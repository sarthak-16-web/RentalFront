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

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Featured", to: "/featured" },
  { label: "Projects", to: "/upcoming-projects" },
  { label: "Testimonials", to: "/testimonials" },
];

const COMPANY_LINKS = [
  { label: "Meet the Team", to: "/team" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact & Support", to: "/contact" },
];

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

          <Link to="/contact" className="rk-cta">
            Enquire Now
          </Link>

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
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="rk-cta rk-cta--block">
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;