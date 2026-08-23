import { useEffect, useMemo, useRef, useState } from "react";
import MarqueeModule from "react-fast-marquee";
import Reveal from "../components/Reveal";
 import heroBuilding from "/imagecopy.png";
import "./PropertiesHome.css";
import { Link } from "react-router-dom";
import { useProperties, usePropertySchema } from "../hooks/useRentalKingData";
import { useContacts } from "../hooks/useContacts";
import { contactLinks } from "../lib/contactLinks";
import { formatPrice } from "../lib/priceFormat";

// This build's CJS->ESM interop doesn't unwrap the `default` export.
const Marquee = MarqueeModule.default ?? MarqueeModule;
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// TEMPORARY mock data — matches propertyModel.js. Swap for /api/properties.
// const MOCK_PROPERTIES = [
//   {
//     _id: "p1",
//     name: "The Aravalli Residence",
//     price: "₹2.4 Cr",
//     location: "Napier Town, Jabalpur",
//     category: "Villa",
//     coverImage: "https://picsum.photos/seed/rk-prop-1/1600/800",
//   },
//   {
//     _id: "p2",
//     name: "Vijay Nagar Heights",
//     price: "₹68 L",
//     location: "Vijay Nagar, Jabalpur",
//     category: "Apartment",
//     coverImage: "https://picsum.photos/seed/rk-prop-2/800/900",
//   },
//   {
//     _id: "p3",
//     name: "Arera Studio",
//     price: "₹42 L",
//     location: "Arera Colony, Jabalpur",
//     category: "Apartment",
//     coverImage: "https://picsum.photos/seed/rk-prop-3/500/900",
//   },
//   {
//     _id: "p4",
//     name: "Central Commerce Plot",
//     price: "₹95 L",
//     location: "Wright Town, Jabalpur",
//     category: "Commercial",
//     coverImage: "https://picsum.photos/seed/rk-prop-4/800/900",
//   },
//   {
//     _id: "p5",
//     name: "Ridge View Bungalow",
//     price: "₹1.6 Cr",
//     location: "Sadar, Jabalpur",
//     category: "House",
//     coverImage: "https://picsum.photos/seed/rk-prop-5/1600/800",
//   },
//   {
//     _id: "p6",
//     name: "Ridge View 1 Bungalow",
//     price: "₹1.6 Cr",
//     location: "Sadar, Jabalpur",
//     category: "House",
//     coverImage: "https://picsum.photos/seed/rk-prop-5/1600/800",
//   },
// ];

const PropertyTile = ({ p }) => (
  <Link to={`/properties/${p._id}`} className="rk-ptile">
    <div className="rk-ptile__media">
      <span className="heart">♡</span>
      <img
  src={p.coverImage || "https://placehold.co/600x400?text=No+Image"}
  alt={p.name}
  loading="lazy"
/>
    </div>
    <div className="rk-ptile__caption">
      <div>
        <h4>{p.name}</h4>
        <span>{p.location}</span>
      </div>
      <strong>{formatPrice(p.priceNumeric, p.status, p.priceFrequency)}</strong>
    </div>
  </Link>
);

const PropertiesHome = () => {
  const [activeTag, setActiveTag] = useState("All");
  const { data: contacts } = useContacts();
  const links = contactLinks(contacts);
  const { data: schema } = usePropertySchema();
  const categoryTags = ["All", ...(schema?.categories || [])];
const {
  data: properties = [],
  isLoading,
  isError,
} = useProperties();
  const visibleProperties = useMemo(() => {
  let filtered = properties.filter((p) => p.isFeatured);

  if (activeTag !== "All") {
    filtered = filtered.filter((p) => p.category === activeTag);
  }

  return filtered;
}, [properties, activeTag]);

  // Only scroll the marquee if the row's real content is wider than the
  // space available - otherwise autoFill just pads it out with repeats of
  // the same one or two cards, which reads as one photo looping in place.
  const marqueeWrapRef = useRef(null);
  const marqueeProbeRef = useRef(null);
  const [needsMarquee, setNeedsMarquee] = useState(false);

  useEffect(() => {
    const wrap = marqueeWrapRef.current;
    const probe = marqueeProbeRef.current;
    if (!wrap || !probe) return;

    const check = () => setNeedsMarquee(probe.scrollWidth > wrap.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [visibleProperties]);

if (isLoading) {
  return (
    <section className="rk-prop">
      <div className="rk-prop__inner">
        <h2>Loading properties...</h2>
      </div>
    </section>
  );
}

if (isError) {
  return (
    <section className="rk-prop">
      <div className="rk-prop__inner">
        <h2>Unable to load properties.</h2>
      </div>
    </section>
  );
}
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="rk-hero" id="rk-hero">
        <img
          className="rk-hero__img"
          src={heroBuilding}
          alt="RK Estates flagship commercial tower at dusk"
        />
        <div className="rk-hero__scrim" />

        <div className="rk-hero__inner">
          <Reveal direction="up">
            <span className="rk-hero__eyebrow">Indore , Madhya Pradesh</span>
          </Reveal>

          <Reveal direction="up" delay={80}>
            <h1 className="rk-hero__heading">
              Live, Work &amp; Invest<br />Above The Ordinary
            </h1>
          </Reveal>

          <Reveal direction="up" delay={140}>
            <p className="rk-hero__desc">
              Curated villas, apartments and commercial addresses across the
              city — verified, vetted and ready to view.
            </p>
          </Reveal>

          <Reveal direction="up" delay={200}>
            <div className="rk-hero__actions">
             <Link to="/properties" className="rk-prop__cta">
  Explore Properties <ArrowIcon />
</Link>
     {links && (
     <a
  href={links.waText("Hi RK Estate, I'm interested in your properties. Please contact me.")}
  target="_blank"
  rel="noopener noreferrer"
  className="rk-hero__cta-ghost"
>
  Talk To An Advisor
</a>
)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= LISTINGS ================= */}
      <section className="rk-prop" id="rk-listings">
        <div className="rk-prop__inner">
          <div className="rk-prop__head">
            <Reveal direction="up">
              <h2 className="rk-prop__heading">Featured Properties</h2>
            </Reveal>

            <Reveal direction="up" delay={80}>
              <p className="rk-prop__desc">
                A handpicked selection of homes and commercial spaces,
                updated weekly. Tap any listing for the full tour.
              </p>
            </Reveal>

            <Reveal direction="up" delay={140}>
              <div className="rk-prop__tags">
                {categoryTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`rk-prop__tag${activeTag === tag ? " is-active" : ""}`}
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="up" delay={90}>
            <div ref={marqueeWrapRef} className="rk-prop__marquee">
              {/* Hidden probe: measures the row's real width so we only
                  animate when there's more content than fits. */}
              <div ref={marqueeProbeRef} className="rk-prop__marquee-probe" aria-hidden="true">
                {visibleProperties.map((p) => (
                  <div className="rk-prop__track-item" key={p._id}>
                    <PropertyTile p={p} />
                  </div>
                ))}
              </div>

              {needsMarquee ? (
                <Marquee pauseOnHover autoFill speed={60}>
                  {visibleProperties.map((p) => (
                    <div className="rk-prop__track-item" key={p._id}>
                      <PropertyTile p={p} />
                    </div>
                  ))}
                </Marquee>
              ) : (
                <div className="rk-prop__static-row">
                  {visibleProperties.map((p) => (
                    <div className="rk-prop__track-item" key={p._id}>
                      <PropertyTile p={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal direction="up" delay={120}>
            <div className="rk-prop__more">
              <Link
  to="/featured"
  className="rk-hero__cta-ghost rk-prop__more-btn"
>
  View All Properties <ArrowIcon />
</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default PropertiesHome;
  