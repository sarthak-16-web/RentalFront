import { Link } from "react-router-dom";
import "./PropertyCard.css";

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9v10M2 12h20v7M2 12V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5M22 12v-2a2 2 0 0 0-2-2h-6" />
  </svg>
);
const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.6 1V9M4 12h18v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 19v2M18 19v2" />
  </svg>
);
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/properties/${property._id}`} className="rk-pcard">
      <div className="rk-pcard__image" style={{ backgroundImage: `url(${property.coverImage})` }}>
        <span className="rk-pcard__badge">{property.category}</span>
      </div>
      <div className="rk-pcard__body">
        <p className="rk-pcard__location"><PinIcon /> {property.location}</p>
        <h4>{property.name}</h4>
        <div className="rk-pcard__meta">
          <span className="rk-pcard__price">{property.price}</span>
          <span className="rk-pcard__specs">
            {property.beds ? <span><BedIcon /> {property.beds}</span> : null}
            {property.baths ? <span><BathIcon /> {property.baths}</span> : null}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
