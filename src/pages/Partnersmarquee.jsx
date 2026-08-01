import "./Partnersmarquee.css";

// TEMPORARY placeholder names — replace with real partner logos (as <img> tags)
// once you have them. Keep the list length even for a smooth seamless loop.
const PARTNERS = [
  { name: "Emerald Builders", logo: "/emerald.jfif" },
  { name: "NSR Group", logo: "/nsr.jfif" },
  { name: "Unity One Co.", logo: "/unity.jpeg" },
  { name: "Godrej Properties", logo: "/goorej.jpeg" },
  { name: "Shubhashish Homes", logo: "/shubhashish.jpeg" },
  { name: "M. Jhaveri Group", logo: "/M jhaveri.jpeg" },
];

const PartnersMarquee = () => {
  // duplicate the list once so the CSS animation can loop seamlessly at -50%
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section className="rk-partners">
      <p className="rk-partners__label">Channel Partners</p>
     <div className="rk-partners__track">
  {track.map((partner, i) => (
    <div className="rk-partners__item" key={`${partner.name}-${i}`}>
      <img
        src={partner.logo}
        alt={partner.name}
        className="rk-partners__logo"
      />
      <span>{partner.name}</span>
    </div>
  ))}
</div>
    </section>
  );
};

export default PartnersMarquee;
