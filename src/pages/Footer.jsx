import { Link } from "react-router-dom";
import "./Footer.css";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const EXPLORE_LINKS = [
  { label: "Properties", to: "/properties" },
  { label: "Upcoming Projects", to: "/upcoming" },
  { label: "Testimonials", to: "/testimonials" },
];

const COMPANY_LINKS = [
  { label: "Meet the Team", to: "/team" },
  { label: "Collaboration", to: "/collaboration" },
  { label: "Contact & Support", to: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms", to: "/legal" },
  { label: "Privacy Policy", to: "/legal" },
  { label: "Cookies", to: "/legal" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="rk-footer">
      <div className="rk-footer__inner">
        <div className="rk-footer__top">
          <div className="rk-footer__brand">
            <Link to="/" className="rk-footer__logo">
             
               <img
  src={"logo.jpeg"}
  alt="RentalKing"
  className="rk-logo__img"
/>
              RentalKing
            </Link>
            <p className="rk-footer__tagline">
              Verified rentals and sales, curated by a team that actually
              visits every listing.
            </p>
            <div className="rk-footer__socials">
              <a href="https://www.facebook.com/share/1D11o5YmR5/?mibextid=wwXIfr" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://www.instagram.com/rentalkingindore?igsh=MTRtcmdrZ2RlY2dwaA==" aria-label="Instagram"><InstagramIcon /></a>
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