import { useMemo, useState } from "react";
import { MOCK_PROPERTIES } from "../data/mockProperties";
import PropertyCard from "../components/PropertyCard";
import "./Properties.css";

const CATEGORIES = ["Apartment", "Villa", "House", "Plot", "Commercial"];

const Properties = () => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const locations = useMemo(
    () => [...new Set(MOCK_PROPERTIES.map((p) => p.location.split(",").pop().trim()))],
    []
  );

  const filtered = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (category && p.category !== category) return false;
      if (location && !p.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (minBeds && (!p.beds || p.beds < Number(minBeds))) return false;
      if (minPrice && p.priceNumeric < Number(minPrice)) return false;
      if (maxPrice && p.priceNumeric > Number(maxPrice)) return false;
      return true;
    });
  }, [category, location, minBeds, minPrice, maxPrice]);

  const resetFilters = () => {
    setCategory("");
    setLocation("");
    setMinBeds("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasActiveFilters = category || location || minBeds || minPrice || maxPrice;

  return (
    <div className="rk-properties">
      <div className="rk-properties__header">
        <div className="rk-properties__header-inner">
          <p className="rk-properties__eyebrow">Browse the catalogue</p>
          <h1>Our Properties</h1>
        </div>
      </div>

      <div className="rk-properties__body">
        {/* Filter bar */}
        <div className="rk-pfilters">
          <div className="rk-pfilters__row">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Types</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)}>
              <option value="">Min Beds</option>
              {[1, 2, 3, 4, 5].map((b) => (
                <option key={b} value={b}>{b}+</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {hasActiveFilters && (
              <button type="button" className="rk-pfilters__reset" onClick={resetFilters}>
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <p className="rk-properties__count">
          {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
        </p>

        {filtered.length > 0 ? (
          <div className="rk-properties__grid">
            {filtered.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        ) : (
          <div className="rk-properties__empty">
            <p>No properties match your filters.</p>
            <button type="button" onClick={resetFilters}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
