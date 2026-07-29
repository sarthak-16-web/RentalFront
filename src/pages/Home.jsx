import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// TEMPORARY mock data — replace with useProperty() from PropertyContext
// once the backend is wired up. Shape matches the real Property model exactly
// (name, price, location, beds, coverImage, isFeatured) so swapping later
// is a one-line change.
const MOCK_FEATURED = [
  {
    _id: "mock-1",
    name: "Sunrise Apartments",
    price: "₹45,000/month",
    location: "Vijay Nagar, Indore",
    beds: 3,
    coverImage: "https://picsum.photos/seed/rentalking1/480/320",
  },
  {
    _id: "mock-2",
    name: "Oakwood Villa",
    price: "₹1.2 Cr",
    location: "Napier Town, Jabalpur",
    beds: 4,
    coverImage: "https://picsum.photos/seed/rentalking2/480/320",
  },
  {
    _id: "mock-3",
    name: "Riverside Residency",
    price: "₹32,000/month",
    location: "Arera Colony, Bhopal",
    beds: 2,
    coverImage: "https://picsum.photos/seed/rentalking3/480/320",
  },
];

// TEMPORARY mock data — replace with real project API data once wired up
const MOCK_PROJECTS = [
  {
    _id: "proj-1",
    name: "Skyline Heights",
    location: "Bawadiya Kalan, Bhopal",
    status: "Launching Q3 2026",
    image: "https://picsum.photos/seed/rentalproj1/160/160",
  },
  {
    _id: "proj-2",
    name: "Emerald Court",
    location: "Vijay Nagar, Indore",
    status: "Bookings Open",
    image: "https://picsum.photos/seed/rentalproj2/160/160",
  },
//   {
//     _id: "proj-3",
//     name: "The Meridian",
//     location: "Wright Town, Jabalpur",
//     status: "Launching Q1 2027",
//     image: "https://picsum.photos/seed/rentalproj3/160/160",
//   },
];

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const BedIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9v10M2 12h20v7M2 12V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v5M22 12v-2a2 2 0 0 0-2-2h-6" />
  </svg>
);
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CATEGORIES = ["Apartment", "Villa", "House", "Plot", "Commercial"];
const STATUSES = ["For Rent", "For Sale"];
const BATH_OPTIONS = [1, 2, 3, 4, "5+"];
const BED_OPTIONS = [1, 2, 3, 4, "5+"];
const PRICE_MIN = 0, PRICE_MAX = 100000;
const AREA_MIN = 0, AREA_MAX = 5000;

const DualRange = ({ label, unit, min, max, step, valueMin, valueMax, onChangeMin, onChangeMax }) => {
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;
  return (
    <div className="rk-range">
      <div className="rk-range__labels"><span>{label}</span></div>
      <div className="rk-range__values">
        <span>{unit}{valueMin.toLocaleString()}</span>
        <span>{unit}{valueMax.toLocaleString()}</span>
      </div>
      <div className="rk-range__track-wrap">
        <div className="rk-range__track" />
        <div className="rk-range__fill" style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }} />
        <input type="range" min={min} max={max} step={step} value={valueMin}
          onChange={(e) => onChangeMin(Math.min(Number(e.target.value), valueMax - step))}
          className="rk-range__input" />
        <input type="range" min={min} max={max} step={step} value={valueMax}
          onChange={(e) => onChangeMax(Math.max(Number(e.target.value), valueMin + step))}
          className="rk-range__input" />
      </div>
    </div>
  );
};

const FeaturedCard = ({ property }) => (
  <div className="rk-fcard">
    <div className="rk-fcard__image" style={{ backgroundImage: `url(${property.coverImage})` }} />
    <div className="rk-fcard__body">
      <p className="rk-fcard__location"><PinIcon /> {property.location}</p>
      <h4>{property.name}</h4>
      <div className="rk-fcard__meta">
        <span>{property.price}</span>
        {property.beds ? <span><BedIcon /> {property.beds} bed</span> : null}
      </div>
    </div>
  </div>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ProjectRow = ({ project }) => (
  <div className="rk-prow">
    <div className="rk-prow__image" style={{ backgroundImage: `url(${project.image})` }} />
    <div className="rk-prow__body">
      <h5>{project.name}</h5>
      <p>{project.location}</p>
    </div>
    <span className="rk-prow__status">{project.status}</span>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const featured = MOCK_FEATURED; // swap for useProperty().featured later
  const loading = false;
  const scrollRef = useRef(null);

  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [baths, setBaths] = useState("");
  const [beds, setBeds] = useState("");
  const [features, setFeatures] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [areaMin, setAreaMin] = useState(0);
  const [areaMax, setAreaMax] = useState(AREA_MAX);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (status) params.set("status", status);
    if (baths) params.set("baths", baths);
    if (beds) params.set("beds", beds);
    if (features) params.set("features", features);
    params.set("priceMin", priceMin);
    params.set("priceMax", priceMax);
    params.set("areaMin", areaMin);
    params.set("areaMax", areaMax);
    navigate(`/properties?${params.toString()}`);
  };

  const scrollByCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 20 : 300;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="rk-hh">
      <div className="rk-hh__inner">
        {/* Left 60% — search */}
        <div className="rk-hh__left">
          <p className="rk-hh__eyebrow">Search the full catalogue</p>
          <h2 className="rk-hh__heading">Find Your Property</h2>

          <form className="rk-hh__card" onSubmit={handleSearch}>
            <div className="rk-hh__row rk-hh__row--2">
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">Choose Location</option>
                <option value="Indore">Indore</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Bhopal">Bhopal</option>
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Property Type</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="rk-hh__row rk-hh__row--3">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Property Status</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={baths} onChange={(e) => setBaths(e.target.value)}>
                <option value="">Min Baths</option>
                {BATH_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option value="">Min Beds</option>
                {BED_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <DualRange label="Price Range" unit="₹" min={PRICE_MIN} max={PRICE_MAX} step={500}
              valueMin={priceMin} valueMax={priceMax} onChangeMin={setPriceMin} onChangeMax={setPriceMax} />
            <DualRange label="Area (Sq Ft)" unit="" min={AREA_MIN} max={AREA_MAX} step={50}
              valueMin={areaMin} valueMax={areaMax} onChangeMin={setAreaMin} onChangeMax={setAreaMax} />

            <div className="rk-hh__row rk-hh__row--features">
              <div className="rk-hh__features">
                <PlusIcon />
                <input type="text" placeholder="Look for certain features"
                  value={features} onChange={(e) => setFeatures(e.target.value)} />
              </div>
              <button type="submit" className="rk-hh__submit"><SearchIcon /> Search</button>
            </div>
          </form>
        </div>

        {/* Right 40% — swipeable featured properties */}
        <div className="rk-hh__right">
          <div className="rk-hh__right-head">
            <h3>Featured Properties</h3>
            <div className="rk-hh__nav">
              <button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous"><ChevronLeft /></button>
              <button type="button" onClick={() => scrollByCard(1)} aria-label="Next"><ChevronRight /></button>
            </div>
          </div>

          <div className="rk-hh__carousel" ref={scrollRef}>
            {loading &&
              [1, 2].map((i) => <div key={i} className="rk-fcard rk-fcard--skeleton" />)}

            {!loading && featured.length === 0 && (
              <div className="rk-fcard rk-fcard--empty">
                <p>Featured listings will appear here once marked from the admin panel.</p>
              </div>
            )}

            {!loading &&
              featured.map((p) => <FeaturedCard key={p._id} property={p} />)}
          </div>

          <div className="rk-hh__upcoming">
            <div className="rk-hh__right-head rk-hh__right-head--tight">
              <h3>Upcoming Projects</h3>
              <a href="/upcoming-projects" className="rk-hh__viewall">
                View all <ArrowIcon />
              </a>
            </div>
            <div className="rk-hh__plist">
              {MOCK_PROJECTS.map((p) => (
                <ProjectRow key={p._id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
