import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import FacetSelect from "../components/FacetSelect";
import DualRange from "../components/DualRange";
import { repairSelections, cityOf, sortByOrder } from "../lib/facetSelections";
import { parseArea, computeSpan } from "../lib/ranges";
import "./Properties.css";
import { useProperties, usePropertySchema } from "../hooks/useRentalKingData";

const EMPTY_FILTERS = {
  location: [],
  category: [],
  status: [],
  furnishing: [],
  bhk: [],
};

const parseParams = (searchParams) => {
  const multi = (key) =>
    (searchParams.get(key) || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  const num = (key) => {
    const raw = searchParams.get(key);
    return raw ? Number(raw) : null;
  };
  return {
    location: multi("location"),
    category: multi("category"),
    status: multi("status"),
    furnishing: multi("furnishing"),
    bhk: multi("beds"),
    price: { min: num("priceMin"), max: num("priceMax") },
    area: { min: num("areaMin"), max: num("areaMax") },
  };
};

const FULL_SLIDER = { min: null, max: null };

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = useState(() => parseParams(searchParams))[0];

  const [filters, setFilters] = useState(() => parseParams(searchParams));
  const [priceSlider, setPriceSlider] = useState(initial.price);
  const [areaSlider, setAreaSlider] = useState(initial.area);

  const [sort, setSort] = useState("price-asc");

  const {
    data: properties = [],
    isLoading,
    isError,
  } = useProperties();
  const { data: schema } = usePropertySchema();

  const filterList = (list, f) => {
    return list.filter((p) => {
      if (f.location.length && !f.location.includes(cityOf(p))) return false;
      if (f.category.length && !f.category.includes(p.category)) return false;
      if (f.status.length && !f.status.includes(p.status)) return false;
      if (f.furnishing.length && !f.furnishing.includes(p.furnishing)) return false;
      if (f.bhk.length && !f.bhk.includes(p.bhk)) return false;
      return true;
    });
  };

  const distinct = (list, pick) =>
    [...new Set(list.map(pick).filter(Boolean))].sort();

  const distinctBhk = (list) =>
    [...new Set(list.map((p) => p.bhk).filter(Boolean))].sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10)
    );

  // Symmetric faceting: every dimension's options come from listings matching
  // all other selected filters (its own selection excluded so it stays changeable).
  const locationOptions = useMemo(
    () => distinct(filterList(properties, { ...filters, location: [] }), cityOf),
    [properties, filters]
  );
  const categoryOptions = useMemo(
    () => sortByOrder(distinct(filterList(properties, { ...filters, category: [] }), (p) => p.category), schema?.categories),
    [properties, filters, schema]
  );
  const statusOptions = useMemo(
    () => distinct(filterList(properties, { ...filters, status: [] }), (p) => p.status),
    [properties, filters]
  );
  const furnishingOptions = useMemo(
    () => distinct(filterList(properties, { ...filters, furnishing: [] }), (p) => p.furnishing),
    [properties, filters]
  );
  const bhkOptions = useMemo(
    () => distinctBhk(filterList(properties, { ...filters, bhk: [] })),
    [properties, filters]
  );

  const filtered = useMemo(
    () => filterList(properties, filters),
    [properties, filters]
  );

  // Track bounds track the current facet selection — the sliders reset to
  // these whenever a facet changes.
  const priceBounds = useMemo(
    () => computeSpan(filtered, (p) => p.priceNumeric),
    [filtered]
  );
  const areaBounds = useMemo(
    () => computeSpan(filtered, (p) => parseArea(p.sqft)),
    [filtered]
  );

  const effPrice = {
    min: priceSlider.min ?? priceBounds.min,
    max: priceSlider.max ?? priceBounds.max,
  };
  const effArea = {
    min: areaSlider.min ?? areaBounds.min,
    max: areaSlider.max ?? areaBounds.max,
  };

  // Sliders filter only the result cards, not the facet options.
  const results = useMemo(() => {
    const priceConstrained = priceSlider.min != null || priceSlider.max != null;
    const areaConstrained = areaSlider.min != null || areaSlider.max != null;
    return filtered.filter((p) => {
      if (priceConstrained) {
        const price = p.priceNumeric;
        if (price == null || price < effPrice.min || price > effPrice.max) return false;
      }
      if (areaConstrained) {
        const area = parseArea(p.sqft);
        if (area == null || area < effArea.min || area > effArea.max) return false;
      }
      return true;
    });
  }, [filtered, priceSlider, areaSlider, effPrice.min, effPrice.max, effArea.min, effArea.max]);

  const sortValue = (p) =>
    sort.startsWith("price") ? p.priceNumeric : parseArea(p.sqft);

  const sorted = useMemo(() => {
    const list = [...results];
    list.sort((a, b) => {
      const va = sortValue(a);
      const vb = sortValue(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      return sort.endsWith("asc") ? va - vb : vb - va;
    });
    return list;
  }, [results, sort]);

  const buildParams = (f, pr, ar) => {
    const params = new URLSearchParams();
    Object.entries(f).forEach(([key, val]) => {
      if (Array.isArray(val) && val.length) {
        params.set(key === "bhk" ? "beds" : key, val.join(","));
      }
    });
    if (pr.min != null) params.set("priceMin", pr.min);
    if (pr.max != null) params.set("priceMax", pr.max);
    if (ar.min != null) params.set("areaMin", ar.min);
    if (ar.max != null) params.set("areaMax", ar.max);
    return params;
  };

  const toggleFacet = (name, value) => {
    const toggled = {
      ...filters,
      [name]: filters[name].includes(value)
        ? filters[name].filter((v) => v !== value)
        : [...filters[name], value],
    };
    const repaired = repairSelections(properties, toggled);
    setFilters(repaired);
    // Any facet change resets both sliders to the full range.
    setPriceSlider(FULL_SLIDER);
    setAreaSlider(FULL_SLIDER);
    setSearchParams(buildParams(repaired, FULL_SLIDER, FULL_SLIDER), { replace: true });
  };

  const setPrice = (slider) => {
    setPriceSlider(slider);
    setSearchParams(buildParams(filters, slider, areaSlider), { replace: true });
  };

  const setArea = (slider) => {
    setAreaSlider(slider);
    setSearchParams(buildParams(filters, priceSlider, slider), { replace: true });
  };

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setPriceSlider(FULL_SLIDER);
    setAreaSlider(FULL_SLIDER);
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    Object.values(filters).some((v) => Array.isArray(v) && v.length > 0) ||
    priceSlider.min != null ||
    priceSlider.max != null ||
    areaSlider.min != null ||
    areaSlider.max != null;

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
          <div className="rk-pfilters__row rk-pfilters__row--2">
            <FacetSelect
              label="Locations"
              selected={filters.location}
              options={locationOptions}
              onToggle={(v) => toggleFacet("location", v)}
            />
            <FacetSelect
              label="Property Types"
              selected={filters.category}
              options={categoryOptions}
              onToggle={(v) => toggleFacet("category", v)}
            />
          </div>
          <div className="rk-pfilters__row rk-pfilters__row--3">
            <FacetSelect
              label="Statuses"
              selected={filters.status}
              options={statusOptions}
              onToggle={(v) => toggleFacet("status", v)}
            />
            <FacetSelect
              label="Furnishing"
              selected={filters.furnishing}
              options={furnishingOptions}
              onToggle={(v) => toggleFacet("furnishing", v)}
            />
            <FacetSelect
              label="BHK"
              selected={filters.bhk}
              options={bhkOptions}
              onToggle={(v) => toggleFacet("bhk", v)}
            />
          </div>
          <div className="rk-pfilters__row rk-pfilters__row--2 rk-pfilters__ranges">
            {priceBounds.min != null && priceBounds.max > priceBounds.min && (
              <DualRange
                label="Price Range"
                unit="₹"
                min={priceBounds.min}
                max={priceBounds.max}
                step={Math.max(1, Math.round((priceBounds.max - priceBounds.min) / 200))}
                valueMin={effPrice.min}
                valueMax={effPrice.max}
                onChangeMin={(v) => setPrice({ ...priceSlider, min: v })}
                onChangeMax={(v) => setPrice({ ...priceSlider, max: v })}
              />
            )}
            {areaBounds.min != null && areaBounds.max > areaBounds.min && (
              <DualRange
                label="Area (Sq Ft)"
                min={areaBounds.min}
                max={areaBounds.max}
                step={Math.max(1, Math.round((areaBounds.max - areaBounds.min) / 200))}
                valueMin={effArea.min}
                valueMax={effArea.max}
                onChangeMin={(v) => setArea({ ...areaSlider, min: v })}
                onChangeMax={(v) => setArea({ ...areaSlider, max: v })}
              />
            )}
          </div>
          {hasActiveFilters && (
            <div className="rk-pfilters__actions">
              <button type="button" className="rk-pfilters__reset" onClick={resetFilters}>
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="rk-properties__countbar">
          <p className="rk-properties__count">
            {results.length} {results.length === 1 ? "property" : "properties"} found
          </p>
          <label className="rk-properties__sort">
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="area-asc">Area (Low to High)</option>
              <option value="area-desc">Area (High to Low)</option>
            </select>
          </label>
        </div>

        {isLoading ? (
          <div className="rk-properties__empty">
            <p>Loading properties...</p>
          </div>
        ) : isError ? (
          <div className="rk-properties__empty">
            <p>Failed to load properties.</p>
          </div>
        ) : results.length > 0 ? (
          <div className="rk-properties__grid">
            {sorted.map((p) => (
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