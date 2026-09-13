import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties, useProjects, usePropertySchema } from "../hooks/useRentalKingData";
import FacetSelect from "../components/FacetSelect";
import { matches, repairSelections, sortByOrder } from "../lib/facetSelections";
import { parseArea, computeSpan } from "../lib/ranges";
import { formatPrice } from "../lib/priceFormat";
import { useQuickView } from "../hooks/useQuickView";
import ReadOnlyRange from "../components/ReadOnlyRange";
import "./Home.css";

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
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

const FeaturedCard = ({ property }) => {
  const { open } = useQuickView();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => open(property)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(property)}
      className="rk-fcard"
    >
      <div className="rk-fcard__image" style={{ backgroundImage: `url(${property.coverImage})` }} />
      <div className="rk-fcard__body">
        <p className="rk-fcard__location"><PinIcon /> {property.location}</p>
        <h4>{property.name}</h4>
        <div className="rk-fcard__meta">
          <span>{formatPrice(property.priceNumeric, property.status, property.priceFrequency)}</span>
          {property.beds ? <span><BedIcon /> {property.beds} bed</span> : null}
        </div>
      </div>
    </div>
  );
};

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
  const scrollRef = useRef(null);

  // Real data — cached by React Query, no refetch on every page switch.
  const { data: properties = [], isLoading: propertiesLoading } = useProperties();
  const { data: projects = [] } = useProjects();
  const { data: schema } = usePropertySchema();

  const featured = properties.filter((p) => p.isFeatured);
  const loading = propertiesLoading;

  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [furnishing, setFurnishing] = useState([]);
  const [beds, setBeds] = useState([]);

  const selected = { location, category, status, furnishing, bhk: beds };

  const matched = useMemo(
    () => properties.filter((p) => matches(p, selected)),
    [properties, location, category, status, furnishing, beds]
  );

  const priceSpan = useMemo(
    () => computeSpan(matched, (p) => p.priceNumeric),
    [matched]
  );

  const areaSpan = useMemo(
    () => computeSpan(matched, (p) => parseArea(p.sqft)),
    [matched]
  );

  // Faceted options — each dimension shows only values available given the
  // other selections (its own excluded so it stays changeable).
  const locations = useMemo(
    () => [...new Set(properties.filter((p) => matches(p, { ...selected, location: [] })).map((p) => p.location?.split(",").pop()?.trim()).filter(Boolean))].sort(),
    [properties, location, category, status, furnishing, beds]
  );
  const categories = useMemo(
    () => sortByOrder([...new Set(properties.filter((p) => matches(p, { ...selected, category: [] })).map((p) => p.category).filter(Boolean))], schema?.categories),
    [properties, location, category, status, furnishing, beds, schema]
  );
  const statuses = useMemo(
    () => [...new Set(properties.filter((p) => matches(p, { ...selected, status: [] })).map((p) => p.status).filter(Boolean))].sort(),
    [properties, location, category, status, furnishing, beds]
  );
  const furnishingOptions = useMemo(
    () => [...new Set(properties.filter((p) => matches(p, { ...selected, furnishing: [] })).map((p) => p.furnishing).filter(Boolean))].sort(),
    [properties, location, category, status, furnishing, beds]
  );
  const bhkOptions = useMemo(
    () => [...new Set(properties.filter((p) => matches(p, { ...selected, bhk: [] })).map((p) => p.bhk).filter(Boolean))].sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10)
    ),
    [properties, location, category, status, furnishing, beds]
  );

  const toggleSelection = (dim, value) => {
    const cur = selected[dim];
    const toggled = {
      ...selected,
      [dim]: cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value],
    };
    const next = repairSelections(properties, toggled);
    setLocation(next.location);
    setCategory(next.category);
    setStatus(next.status);
    setFurnishing(next.furnishing);
    setBeds(next.bhk);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const setArr = (key, arr) => {
      if (arr.length) params.set(key, arr.join(","));
    };
    setArr("location", location);
    setArr("category", category);
    setArr("furnishing", furnishing);
    setArr("status", status);
    setArr("beds", beds);
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
              <FacetSelect
                label="Choose Location"
                selected={location}
                options={locations}
                onToggle={(v) => toggleSelection("location", v)}
              />
              <FacetSelect
                label="Property Type"
                selected={category}
                options={categories}
                onToggle={(v) => toggleSelection("category", v)}
              />
            </div>

            <div className="rk-hh__row rk-hh__row--3">
              <FacetSelect
                label="Property Status"
                selected={status}
                options={statuses}
                onToggle={(v) => toggleSelection("status", v)}
              />
              <FacetSelect
                label="Furnishing"
                selected={furnishing}
                options={furnishingOptions}
                onToggle={(v) => toggleSelection("furnishing", v)}
              />
              <FacetSelect
                label="BHK"
                selected={beds}
                options={bhkOptions}
                onToggle={(v) => toggleSelection("bhk", v)}
              />
            </div>

            <div className="rk-hh__row rk-hh__row--2 rk-hh__ranges">
              <ReadOnlyRange label="Price Range" unit="₹" {...priceSpan} />
              <ReadOnlyRange label="Area (Sq Ft)" {...areaSpan} />
            </div>

            <button type="submit" className="rk-hh__submit"><SearchIcon /> Find me my dream property!</button>
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
              <a href="/upcoming" className="rk-hh__viewall">
                View all <ArrowIcon />
              </a>
            </div>
            <div className="rk-hh__plist">
              {projects.map((p) => (
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