import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MOCK_PROPERTIES } from "../data/mockProperties";
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
  const property = MOCK_PROPERTIES.find((p) => p._id === id);
  const [activeImage, setActiveImage] = useState(0);

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

  const gallery = property.images?.length ? property.images : [property.coverImage];

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
            <Link to="/contact" className="rk-pd__cta">Enquire Now</Link>
            <a href="tel:+911234567890" className="rk-pd__cta rk-pd__cta--ghost">Call Us</a>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
