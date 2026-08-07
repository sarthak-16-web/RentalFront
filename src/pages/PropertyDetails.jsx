import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProperty } from "../hooks/useRentalKingData";
import "./PropertyDetails.css";

const BedIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9v10M2 12h20v7M2 12V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5M22 12v-2a2 2 0 0 0-2-2h-6" />
  </svg>
);
const BathIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.6 1V9M4 12h18v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 19v2M18 19v2" />
  </svg>
);
const AreaIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 21V9h12" />
  </svg>
);
const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const PropertyDetails = () => {
  const { id } = useParams();
const { data: property, isLoading, isError } = useProperty(id);
  const [activeImage, setActiveImage] = useState(0);
if (isLoading) {
  return <h2>Loading...</h2>;
}

if (isError) {
  return <h2>Something went wrong.</h2>;
}
  if (!property) {
    return (
      <div className="rk-pd-notfound">
        <h2>Property not found</h2>
        <p>This listing may have been removed or the link is incorrect.</p>
        <Link to="/properties" className="rk-pd-notfound__link">
          <ArrowLeft /> Back to Properties
        </Link>
      </div>
    );
  }

const gallery =
  property.images?.length
    ? property.images
    : [
        property.image ||
        property.coverImage ||
        "https://placehold.co/1200x700?text=No+Image",
      ];
      console.log(property.images);
      console.log(property.images);
  return (
    <div className="rk-pd">
      <div className="rk-pd__inner">
        <Link to="/properties" className="rk-pd__back">
          <ArrowLeft /> Back to Properties
        </Link>

        {/* Gallery */}
        <div className="rk-pd__gallery">
          <div className="rk-pd__main-image">
            <img src={gallery[activeImage]} alt={property.name} />
            <span className="rk-pd__badge">{property.category}</span>
          </div>
          {gallery.length > 1 && (
            <div className="rk-pd__thumbs">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className={`rk-pd__thumb ${i === activeImage ? "is-active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt={`${property.name} photo ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="rk-pd__content">
          <div className="rk-pd__main">
            <p className="rk-pd__location"><PinIcon /> {property.address || property.location}</p>
            <h1>{property.name}</h1>

            <div className="rk-pd__specs">
              {property.beds ? (
                <div className="rk-pd__spec"><BedIcon /><span>{property.beds} Beds</span></div>
              ) : null}
              {property.baths ? (
                <div className="rk-pd__spec"><BathIcon /><span>{property.baths} Baths</span></div>
              ) : null}
              {property.sqft ? (
                <div className="rk-pd__spec"><AreaIcon /><span>{property.sqft} Sq Ft</span></div>
              ) : null}
            </div>

            <h3>Description</h3>
            <p className="rk-pd__description">{property.description}</p>
          </div>
<aside className="rk-pd__sidebar">
  <span className="rk-pd__price">{property.price}</span>

  <Link to="/contact" className="rk-pd__cta rk-pd__cta--gold">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    Enquire Now
  </Link>

  <a
    href={`https://wa.me/919425959771?text=${encodeURIComponent(
      `Hi RentalKing,

I'm interested in this property.

Property: ${property.name}
Location: ${property.location}
Price: ${property.price}`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="rk-pd__cta rk-pd__cta--whatsapp"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.52 0 .2 5.31.2 11.85c0 2.09.55 4.14 1.59 5.94L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.45h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.16-1.23-6.13-3.39-8.45z"/>
    </svg>
    WhatsApp
  </a>

  <a
    href="tel:+919130065392"
    className="rk-pd__cta rk-pd__cta--call"
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z"/>
    </svg>
    Call Us
  </a>
</aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
