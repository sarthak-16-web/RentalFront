import { Link } from "react-router-dom";
import "./Fotter.css";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 5.9c-.7.32-1.46.53-2.25.63a3.9 3.9 0 0 0 1.72-2.16 7.9 7.9 0 0 1-2.5.95 3.9 3.9 0 0 0-6.66 3.57A11.1 11.1 0 0 1 3.9 4.9a3.9 3.9 0 0 0 1.21 5.22 3.9 3.9 0 0 1-1.77-.49v.05a3.9 3.9 0 0 0 3.13 3.83 3.9 3.9 0 0 1-1.76.07 3.9 3.9 0 0 0 3.65 2.72A7.86 7.86 0 0 1 2 18.4a11.1 11.1 0 0 0 6 1.76c7.2 0 11.13-5.96 11.13-11.13l-.01-.5A7.9 7.9 0 0 0 22 5.9Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.15 0h3.35v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-6.32c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33V21H9.35V8.75Z" />
  </svg>
);

const EXPLORE_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "Featured", to: "/featured" },
  { label: "Upcoming Projects", to: "/upcoming" },
  { label: "Testimonials", to: "/testimonials" },
];

const COMPANY_LINKS = [
  { label: "Meet the Team", to: "/team" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact & Support", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Cookies", to: "/cookies" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="rk-footer">
      <div className="rk-footer__inner">
        <div className="rk-footer__top">
          <div className="rk-footer__brand">
            <Link to="/" className="rk-footer__logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12 12 4l9 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 11v9h12v-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Rental<em>King</em>
            </Link>
            <p className="rk-footer__tagline">
              Verified rentals and sales, curated by a team that actually
              visits every listing.
            </p>
            <div className="rk-footer__socials">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            </div>
          </div>

          <div className="rk-footer__col">
            <h4>Explore</h4>
            {EXPLORE_LINKS.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>

          <div className="rk-footer__col">
            <h4>Company</h4>
            {COMPANY_LINKS.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>

          <div className="rk-footer__col">
            <h4>Legal</h4>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="rk-footer__divider" />

        <div className="rk-footer__bottom">
          <p>© {year} All rights reserved by RentalKing.</p>
          <div className="rk-footer__legal">
            {LEGAL_LINKS.map((l, i) => (
              <span key={l.to}>
                <Link to={l.to}>{l.label}</Link>
                {i < LEGAL_LINKS.length - 1 && <span aria-hidden="true"> · </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;