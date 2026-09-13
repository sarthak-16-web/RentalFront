import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuickView } from "../hooks/useQuickView";
import { useContacts } from "../hooks/useContacts";
import { contactLinks } from "../lib/contactLinks";
import { formatPrice } from "../lib/priceFormat";
import "./PropertyQuickView.css";

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9v10M2 12h20v7M2 12V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5M22 12v-2a2 2 0 0 0-2-2h-6" />
  </svg>
);
const BathIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.6 1V9M4 12h18v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 19v2M18 19v2" />
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const WhatsappIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.52 0 .2 5.31.2 11.85c0 2.09.55 4.14 1.59 5.94L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.45h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.16-1.23-6.13-3.39-8.45z" />
  </svg>
);
const CallIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z" />
  </svg>
);

const PropertyQuickView = () => {
  const { property, close } = useQuickView();
  const { data: contacts } = useContacts();
  const links = contactLinks(contacts);

  useEffect(() => {
    if (!property) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [property, close]);

  if (!property) return null;

  const image =
    property.image ||
    property.coverImage ||
    property.images?.[0] ||
    "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="rk-qv__backdrop" onClick={close}>
      <div className="rk-qv" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="rk-qv__close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="rk-qv__image" style={{ backgroundImage: `url(${image})` }}>
          <span className="rk-qv__badge">{property.category}</span>
        </div>

        <div className="rk-qv__body">
          <p className="rk-qv__location">
            <PinIcon /> {property.location}
          </p>
          <h3>{property.name}</h3>

          {property.description && (
            <p className="rk-qv__description">{property.description}</p>
          )}

          <div className="rk-qv__meta">
            <span className="rk-qv__price">
              {formatPrice(property.priceNumeric, property.status, property.priceFrequency)}
            </span>
            <span className="rk-qv__specs">
              {property.beds ? (
                <span>
                  <BedIcon /> {property.beds}
                </span>
              ) : null}
              {property.baths ? (
                <span>
                  <BathIcon /> {property.baths}
                </span>
              ) : null}
            </span>
          </div>

          <div className="rk-qv__actions">
            <Link to="/contact" className="rk-qv__cta rk-qv__cta--gold" onClick={close}>
              Enquire Now
            </Link>

            {links && (
              <>
                <a
                  href={links.waText(
                    `Hi RentalKing,\n\nI'm interested in this property.\n\nProperty: ${property.name}\nLocation: ${property.location}\nPrice: ${formatPrice(property.priceNumeric, property.status, property.priceFrequency)}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rk-qv__cta rk-qv__cta--whatsapp"
                >
                  <WhatsappIcon /> WhatsApp
                </a>

                <a href={links.tel} className="rk-qv__cta rk-qv__cta--call">
                  <CallIcon /> Call
                </a>
              </>
            )}
          </div>

          <Link to={`/properties/${property._id}`} className="rk-qv__more" onClick={close}>
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyQuickView;
