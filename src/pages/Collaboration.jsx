import { useEffect, useRef, useState } from "react";
import "./Collaboration.css";

/* ----------------------------------------------------------------
   On submit, we just build a wa.me link with the filled-in details
   and open WhatsApp (app or web) in a new tab/window. The user
   still has to hit "Send" inside WhatsApp themselves — nothing is
   sent automatically from here, so no backend / EmailJS needed.
------------------------------------------------------------------- */

const WHATSAPP_NUMBER = "919300653927"; // country code + number, no + or spaces

const buildWhatsappLink = (form) => {
  const text =
    `New Partner Inquiry\n\n` +
    `Name/Company: ${form.name}\n` +
    `Type: ${form.type}\n` +
    `Phone: ${form.phone}\n` +
    `Email: ${form.email}\n` +
    `Message: ${form.message}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

/* ---------- Icons ---------- */
const HomeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" />
  </svg>
);
const CraneIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 21V9l10-6v6h7l-4 4M4 21h16M9 21v-6h4v6" />
  </svg>
);
const HandshakeIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2l-2-2M8 14l2 2a1.4 1.4 0 0 0 2-2l-3-3M6 12l2 2a1.4 1.4 0 0 0 2-2L7 9" />
    <path d="M2 11h4l4-4 5 5 3-3 4 4v6l-3 3-3-3" />
  </svg>
);
const BankIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 21h18M4 10h16M6 10V21M10 10V21M14 10V21M18 10V21M12 3 3 8h18Z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const QuoteIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5 4C5.9 5.6 4 8.4 4 12.2c0 3 1.8 5 4.3 5 1.9 0 3.3-1.3 3.3-3.2 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.2-2.1 1.6-3.7 3.7-4.6L9.5 4Zm9 0c-3.6 1.6-5.5 4.4-5.5 8.2 0 3 1.8 5 4.3 5 1.9 0 3.3-1.3 3.3-3.2 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.2-2.1 1.6-3.7 3.7-4.6L18.5 4Z" />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
  </svg>
);

/* ---------- Data ---------- */
const CATEGORIES = [
  {
    icon: HomeIcon,
    title: "Property Owners",
    text: "List your property with us and we handle tenants, viewings, and agreements end-to-end.",
  },
  {
    icon: CraneIcon,
    title: "Builders & Developers",
    text: "Market your upcoming projects to our active buyer and tenant base ahead of launch.",
  },
  {
    icon: HandshakeIcon,
    title: "Real Estate Agents",
    text: "Co-broker deals with us on a transparent, shared-commission basis.",
  },
  {
    icon: BankIcon,
    title: "Financial Partners",
    text: "Offer home loans and financing directly to our verified property seekers.",
  },
];

const BENEFITS = [
  "Verified leads, not cold inquiries",
  "No upfront listing fees",
  "Dedicated relationship manager",
  "Marketing & visibility support",
  "Transparent commission structure",
  "End-to-end paperwork assistance",
];

const STEPS = [
  { n: "01", title: "Reach Out", text: "Fill the partner form below or call our team directly." },
  { n: "02", title: "Verification Call", text: "We understand your business and confirm the fit." },
  { n: "03", title: "Onboarding", text: "Sign a simple partnership agreement, no hidden clauses." },
  { n: "04", title: "Go Live", text: "Start listing, referring, or receiving leads right away." },
];

const STATS = [
  { value: 12, suffix: "+", label: "Builder Partners" },
  { value: 300, suffix: "+", label: "Successful Referrals" },
  { value: 25, suffix: "+", label: "Financial Partners" },
  { value: 98, suffix: "%", label: "Partner Satisfaction" },
];

const COLLAB_TYPES = ["Property Owner", "Builder / Developer", "Real Estate Agent", "Financial Partner"];

/* ---------- Count-up stat ---------- */
const useCountUp = (target, active) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);
  return value;
};

const StatItem = ({ value, suffix, label, active }) => {
  const count = useCountUp(value, active);
  return (
    <div className="rk-cstat">
      <div className="rk-cstat__number">{count.toLocaleString()}<span>{suffix}</span></div>
      <p>{label}</p>
    </div>
  );
};

const Collaboration = () => {
  const statsRef = useRef(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const EMPTY_FORM = { name: "", type: "", phone: "", email: "", message: "" };
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open WhatsApp with the message pre-filled. User still has to
    // hit Send inside WhatsApp themselves.
    window.open(buildWhatsappLink(form), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="rk-collab">
      {/* Header */}
      <div className="rk-collab__header">
        <p className="rk-collab__eyebrow">Partner With Us</p>
        <h1>Let's Grow Together</h1>
        <p className="rk-collab__sub">
          Whether you own property, build it, sell it, or finance it — RentalKing
          gives you direct access to a verified, active audience across the region.
        </p>
      </div>

      {/* Categories */}
      <section className="rk-collab__section">
        <h2>Who Can Collaborate</h2>
        <div className="rk-collab__categories">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rk-ccard">
                <span className="rk-ccard__icon"><Icon /></span>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits + Steps */}
      <section className="rk-collab__section rk-collab__section--split">
        <div>
          <h2>Why Partner With Us</h2>
          <ul className="rk-collab__benefits">
            {BENEFITS.map((b) => (
              <li key={b}>
                <span className="rk-collab__check"><CheckIcon /></span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>How It Works</h2>
          <div className="rk-collab__steps">
            {STEPS.map((s) => (
              <div key={s.n} className="rk-cstep">
                <span className="rk-cstep__num">{s.n}</span>
                <div>
                  <h5>{s.title}</h5>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder message */}
      <section className="rk-founder">
        <div className="rk-founder__inner">
          <div className="rk-founder__photo">
            <img src="Rajesh.jpeg" alt="Founder of RentalKing" />
          </div>
          <div className="rk-founder__content">
            <span className="rk-founder__quote-icon"><QuoteIcon /></span>
            <p className="rk-founder__quote">
              We built RentalKing on trust — with clients, and with the partners
              who make our work possible. If you're a builder, owner, agent, or
              financier who believes in doing this the right way, I'd genuinely
              like to hear from you.
            </p>
            <h5>Mr. Rajesh Maheshwari</h5>
            <span>Founder &amp; CEO, RentalKing</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="rk-cstats" ref={statsRef}>
        <div className="rk-cstats__inner">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={statsActive} />
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="rk-collab__section">
        <div className="rk-collab__form-wrap">
          {submitted ? (
            <div className="rk-collab__success">
              <span><CheckIcon /></span>
              <h3>Almost done!</h3>
              <p>We opened WhatsApp with your details filled in — just hit send there.</p>
              <button type="button" onClick={() => setSubmitted(false)}>Submit another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Become a Partner</h3>
              <div className="rk-collab__row">
                <div className="rk-collab__field">
                  <label htmlFor="name">Name / Company</label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name or company" />
                </div>
                <div className="rk-collab__field">
                  <label htmlFor="type">Collaboration Type</label>
                  <select id="type" name="type" required value={form.type} onChange={handleChange}>
                    <option value="" disabled>Choose one</option>
                    {COLLAB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="rk-collab__row">
                <div className="rk-collab__field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000" />
                </div>
                <div className="rk-collab__field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
              </div>
              <div className="rk-collab__field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={4} required value={form.message} onChange={handleChange} placeholder="Tell us about your business..." />
              </div>
              <button type="submit" className="rk-collab__submit">
                <SendIcon /> Submit via WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Collaboration;