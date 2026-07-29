import "./PartnersMarquee.css";

// TEMPORARY placeholder names — replace with real partner logos (as <img> tags)
// once you have them. Keep the list length even for a smooth seamless loop.
const PARTNERS = [
  "Prime Estates",
  "Bluewave Finance",
  "Skyline Builders",
  "Metro Realty Group",
  "Urban Developers Co.",
  "Northgate Properties",
  "Vantage Home Loans",
  "Crestview Realty",
];

const PartnersMarquee = () => {
  // duplicate the list once so the CSS animation can loop seamlessly at -50%
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section className="rk-partners">
      <p className="rk-partners__label">Trusted by leading names in real estate &amp; finance</p>
      <div className="rk-partners__viewport">
        <div className="rk-partners__track">
          {track.map((name, i) => (
            <span className="rk-partners__item" key={`${name}-${i}`}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
