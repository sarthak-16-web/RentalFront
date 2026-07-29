import Reveal from "../components/Reveal";
import "./PropertiesHome.css";

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// TEMPORARY mock data — matches propertyModel.js. Swap for /api/properties.
const MOCK_PROPERTIES = [
  {
    _id: "p1",
    name: "The Aravalli Residence",
    price: "₹2.4 Cr",
    location: "Napier Town, Jabalpur",
    category: "Villa",
    coverImage: "https://picsum.photos/seed/rk-prop-1/1600/800",
  },
  {
    _id: "p2",
    name: "Vijay Nagar Heights",
    price: "₹68 L",
    location: "Vijay Nagar, Jabalpur",
    category: "Apartment",
    coverImage: "https://picsum.photos/seed/rk-prop-2/800/900",
  },
  {
    _id: "p3",
    name: "Arera Studio",
    price: "₹42 L",
    location: "Arera Colony, Jabalpur",
    category: "Apartment",
    coverImage: "https://picsum.photos/seed/rk-prop-3/500/900",
  },
  {
    _id: "p4",
    name: "Central Commerce Plot",
    price: "₹95 L",
    location: "Wright Town, Jabalpur",
    category: "Commercial",
    coverImage: "https://picsum.photos/seed/rk-prop-4/800/900",
  },
  {
    _id: "p5",
    name: "Ridge View Bungalow",
    price: "₹1.6 Cr",
    location: "Sadar, Jabalpur",
    category: "House",
    coverImage: "https://picsum.photos/seed/rk-prop-5/1600/800",
  },
  {
    _id: "p6",
    name: "Ridge View 1 Bungalow",
    price: "₹1.6 Cr",
    location: "Sadar, Jabalpur",
    category: "House",
    coverImage: "https://picsum.photos/seed/rk-prop-5/1600/800",
  }
];

const CATEGORY_TAGS = ["Villa", "Apartment", "House", "Commercial"];

const PropertyTile = ({ p, className = "" }) => (
  <a href={`/properties/${p._id}`} className={`rk-ptile ${className}`}>
    <div className="rk-ptile__media">
         <span className="heart">♡</span>
      <img src={p.coverImage} alt={p.name} />
    </div>
    <div className="rk-ptile__caption">
      <div>
        <h4>{p.name}</h4>
        <span>{p.location}</span>
      </div>
      <strong>{p.price}</strong>
    </div>
  </a>
);

const PropertiesHome = () => {
  const [p1, p2, p3, p4, p5] = MOCK_PROPERTIES;

  return (
    <section className="rk-prop">
         <img
    src="/luxury-house.png"
    alt=""
    className="rk-prop__bg"
  />
      <div className="rk-prop__inner">
        <div className="rk-prop__head">
          <Reveal direction="up">
           
          </Reveal>

          <Reveal direction="up" delay={80}>
           
          </Reveal>
        </div>

        <div className="rk-prop__rows">
          <Reveal direction="up">
            <PropertyTile p={p1} className="rk-ptile--wide" />
          </Reveal>

          <div className="rk-prop__triorow">
            <Reveal direction="up" delay={90}>
              <PropertyTile p={p2} className="rk-ptile--large" />
            </Reveal>
            <Reveal direction="up" delay={150}>
              <PropertyTile p={p3} className="rk-ptile--half" />
            </Reveal>
            <Reveal direction="up" delay={210}>
              <PropertyTile p={p4} className="rk-ptile--large" />
            </Reveal>
            {/* <Reveal direction="up" delay={230}>
            <PropertyTile p={p6} className="rk-ptile--wide" />
          </Reveal> */}
          </div>

          <Reveal direction="up" delay={260}>
            <PropertyTile p={p5} className="rk-ptile--wide" />
          </Reveal>
          
        </div>
      </div>
    </section>
  );
};

export default PropertiesHome;