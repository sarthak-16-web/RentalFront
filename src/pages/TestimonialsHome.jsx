import Reveal from "../components/Reveal";
import "./TestimonialsHome.css";

const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5 4C5.9 5.6 4 8.4 4 12.2c0 3 1.8 5 4.3 5 1.9 0 3.3-1.3 3.3-3.2 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.2-2.1 1.6-3.7 3.7-4.6L9.5 4Zm9 0c-3.6 1.6-5.5 4.4-5.5 8.2 0 3 1.8 5 4.3 5 1.9 0 3.3-1.3 3.3-3.2 0-1.7-1.1-2.9-2.7-2.9-.3 0-.6 0-.8.1.2-2.1 1.6-3.7 3.7-4.6L18.5 4Z" />
  </svg>
);

// TEMPORARY mock data — shape matches a typical Testimonial model
// (name, role, quote, avatar). Swap for real backend data (capped to 5
// most recent / featured) once testimonialApi.js + context are wired up.
const MOCK_TESTIMONIALS = [
  {
    _id: "t1",
    name: "Ritika Sharma",
    role: "Tenant, Vijay Nagar",
    quote: "RentalKing found me a 2BHK within a week, no hidden brokerage, no last-minute surprises.",
    avatar: "https://picsum.photos/seed/rk-review-1/100/100",
  },
  {
    _id: "t2",
    name: "Amit Verma",
    role: "Property Owner",
    quote: "They handled every viewing and paperwork step. I never had to chase anyone for updates.",
    avatar: "https://picsum.photos/seed/rk-review-2/100/100",
  },
  {
    _id: "t3",
    name: "Neha Kulkarni",
    role: "Tenant, Napier Town",
    quote: "Honestly the most transparent rental experience I've had in this city so far.",
    avatar: "https://picsum.photos/seed/rk-review-3/100/100",
  },
  {
    _id: "t4",
    name: "Rohan Deshmukh",
    role: "Corporate Client",
    quote: "We rented office space for our team through RentalKing. Smooth from first call to move-in.",
    avatar: "https://picsum.photos/seed/rk-review-4/100/100",
  },
  {
    _id: "t5",
    name: "Priya Malhotra",
    role: "Tenant, Arera Colony",
    quote: "The team actually visited and verified the property before showing it to us. Rare these days.",
    avatar: "https://picsum.photos/seed/rk-review-5/100/100",
  },
   {
    _id: "t6",
    name: "Priya Malhotra",
    role: "Tenant, Arera Colony",
    quote: "The team actually visited and verified the property before showing it to us. Rare these days.",
    avatar: "https://picsum.photos/seed/rk-review-5/100/100",
  },
];

const TestimonialCard = ({ t }) => (
  <div className="rk-tcard">
    <p className="rk-tcard__quote">{t.quote}</p>
    <div className="rk-tcard__footer">
      <img src={t.avatar} alt={t.name} className="rk-tcard__avatar" />
      <div>
        <h5>{t.name}</h5>
        <span>{t.role}</span>
      </div>
      <span className="rk-tcard__icon"><QuoteIcon /></span>
    </div>
  </div>
);

const TestimonialsHome = () => {
  const testimonials = MOCK_TESTIMONIALS.slice(0, 6);

  return (      
    <section className="rk-testi">
      <div className="rk-testi__inner">
        <Reveal direction="left" className="rk-testi__intro">
          <p className="rk-testi__eyebrow">RentalKing</p>
          <h2 className="rk-testi__heading">
            Let's See Our
            <span>Client's Reviews</span>
          </h2>
          <p className="rk-testi__sub">
            Real feedback from tenants, owners, and businesses who found
            their space through us — no filtering, no cherry-picking.
          </p>
          <a href="/testimonials" className="rk-testi__viewall">
            View All Testimonials
          </a>
          <div className="rk-testi__trust">
  <div className="rk-testi__avatars">
    {MOCK_TESTIMONIALS.slice(0, 4).map((t) => (
      <img
        key={t._id}
        src={t.avatar}
        alt={t.name}
        className="rk-testi__avatar"
      />
    ))}
    <span className="rk-testi__avatar rk-testi__avatar--more">+500</span>
  </div>
  <div className="rk-testi__trust-text">
    <div className="rk-testi__stars">★★★★★</div>
    <p>4.9 average from 500+ happy clients</p>
  </div>
</div>
<div className="rk-testi__badges">
  <div className="rk-testi__badge">
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.19-2H12v3.8h5.9c-.25 1.3-1 2.4-2.15 3.15v2.6h3.5c2.05-1.9 3.25-4.7 3.25-7.55z"/>
      <path fill="#34A853" d="M12 23c2.9 0 5.35-.95 7.15-2.6l-3.5-2.6c-.95.65-2.2 1.05-3.65 1.05-2.8 0-5.2-1.9-6.05-4.45H2.3v2.7A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.95 14.4a6.6 6.6 0 0 1 0-4.2V7.5H2.3a11 11 0 0 0 0 9.6l3.65-2.7z"/>
      <path fill="#EA4335" d="M12 6.35c1.55 0 2.95.55 4.05 1.6l3.05-3.05C17.35 3.15 14.9 2 12 2A11 11 0 0 0 2.3 7.5l3.65 2.7C6.8 8.25 9.2 6.35 12 6.35z"/>
    </svg>
    <div>
      <span className="rk-testi__badge-stars">★★★★★</span>
      <p>4.9 on Google</p>
    </div>
  </div>

  <div className="rk-testi__badge">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#00B67A">
      <path d="M12 2l2.9 6.6L21.5 9l-5.1 4.4L18 20l-6-4-6 4 1.6-6.6L2.5 9l6.6-.4L12 2z"/>
    </svg>
    <div>
      <span className="rk-testi__badge-stars">★★★★★</span>
      <p>4.8 on Trustpilot</p>
    </div>
  </div>
</div>
<div className="rk-testi__featured rk-testi__deskonly">
  <QuoteIcon />
  <p>"{MOCK_TESTIMONIALS[0].quote}"</p>
  <div className="rk-testi__featured-author">
    <img src={MOCK_TESTIMONIALS[0].avatar} alt={MOCK_TESTIMONIALS[0].name} />
    <div>
      <h5>{MOCK_TESTIMONIALS[0].name}</h5>
      <span>{MOCK_TESTIMONIALS[0].role}</span>
    </div>
  </div>
</div>
        </Reveal>

        <div className="rk-testi__grid">
          {testimonials.map((t, i) => (
            <Reveal key={t._id} delay={i * 90} direction="up">
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsHome;
