import { useEffect, useRef, useState } from "react";
import MarqueeModule from "react-fast-marquee";
import { usePartners } from "../hooks/useRentalKingData";
import "./Partnersmarquee.css";

// This build's CJS->ESM interop doesn't unwrap the `default` export.
const Marquee = MarqueeModule.default ?? MarqueeModule;

const PartnerItem = ({ partner }) => (
  <div className="rk-partners__item">
    <img src={partner.logo} alt={partner.name} className="rk-partners__logo" />
    <span>{partner.name}</span>
  </div>
);

const PartnersMarquee = () => {
  const { data: partners = [] } = usePartners();

  // Only scroll if the row's real content is wider than the space available -
  // otherwise autoFill just pads a short list out with repeated logos.
  const wrapRef = useRef(null);
  const probeRef = useRef(null);
  const [needsMarquee, setNeedsMarquee] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const probe = probeRef.current;
    if (!wrap || !probe) return;

    const check = () => setNeedsMarquee(probe.scrollWidth > wrap.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [partners]);

  if (partners.length === 0) return null;

  return (
    <section className="rk-partners">
      <p className="rk-partners__label">Channel Partners</p>

      <div ref={wrapRef} className="rk-partners__viewport">
        <div ref={probeRef} className="rk-partners__probe" aria-hidden="true">
          {partners.map((partner) => (
            <PartnerItem key={partner._id} partner={partner} />
          ))}
        </div>

        {needsMarquee ? (
          <Marquee pauseOnHover autoFill speed={40}>
            {partners.map((partner) => (
              <PartnerItem key={partner._id} partner={partner} />
            ))}
          </Marquee>
        ) : (
          <div className="rk-partners__static-row">
            {partners.map((partner) => (
              <PartnerItem key={partner._id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersMarquee;
