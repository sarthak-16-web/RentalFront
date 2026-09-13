import { useEffect, useRef, useState } from "react";
import MarqueeModule from "react-fast-marquee";
import { useTestimonials, useSubmitTestimonial } from "../hooks/useRentalKingData";
import "./TestimonialsHome.css";

// This build's CJS->ESM interop doesn't unwrap the `default` export.
const Marquee = MarqueeModule.default ?? MarqueeModule;

const MAX_NAME_LENGTH = 60;
const MAX_REVIEW_LENGTH = 200;

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.19-2H12v3.8h5.9c-.25 1.3-1 2.4-2.15 3.15v2.6h3.5c2.05-1.9 3.25-4.7 3.25-7.55z"/>
    <path fill="#34A853" d="M12 23c2.9 0 5.35-.95 7.15-2.6l-3.5-2.6c-.95.65-2.2 1.05-3.65 1.05-2.8 0-5.2-1.9-6.05-4.45H2.3v2.7A11 11 0 0 0 12 23z"/>
    <path fill="#FBBC05" d="M5.95 14.4a6.6 6.6 0 0 1 0-4.2V7.5H2.3a11 11 0 0 0 0 9.6l3.65-2.7z"/>
    <path fill="#EA4335" d="M12 6.35c1.55 0 2.95.55 4.05 1.6l3.05-3.05C17.35 3.15 14.9 2 12 2A11 11 0 0 0 2.3 7.5l3.65 2.7C6.8 8.25 9.2 6.35 12 6.35z"/>
  </svg>
);

const JustdialBadge = () => <span className="rk-testi__jd-badge">JD</span>;

const PeopleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-500)" strokeWidth="2">
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M15.5 14.2c2.5.4 4.5 2.6 4.5 5.3" />
  </svg>
);

// Rounds a decimal rating to a whole-star display, e.g. 4.3 -> "★★★★☆".
const starsFor = (rating) => {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(full);
};

const TestimonialCard = ({ t }) => (
  <div className="rk-tcard">
    <p className="rk-tcard__quote">{t.review}</p>
    <div className="rk-tcard__divider" />
    <h5 className="rk-tcard__name">{t.name}</h5>
  </div>
);

const LeaveReviewModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const submitTestimonial = useSubmitTestimonial();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;
    submitTestimonial.mutate({ name: name.trim(), review: review.trim() });
  };

  return (
    <div className="rk-rform__overlay" onClick={onClose}>
      <div
        className="rk-rform"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rk-rform-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="rk-rform__close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {submitTestimonial.isSuccess ? (
          <>
            <p className="rk-rform__eyebrow">Thank you</p>
            <h2 className="rk-rform__title">Your review is in!</h2>
            <p className="rk-rform__thanks">
              We'll take a look and it'll appear on the site once approved.
            </p>
            <div className="rk-rform__actions">
              <button type="button" className="rk-rform__submit" onClick={onClose}>Close</button>
            </div>
          </>
        ) : (
          <>
            <p className="rk-rform__eyebrow">Share your experience</p>
            <h2 id="rk-rform-title" className="rk-rform__title">Leave a Review</h2>

            <form className="rk-rform__form" onSubmit={handleSubmit}>
              <div className="rk-rform__field">
                <label htmlFor="rk-tname">Full name</label>
                <input
                  id="rk-tname"
                  type="text"
                  required
                  maxLength={MAX_NAME_LENGTH}
                  placeholder="e.g. Ayesha Kapoor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="rk-rform__field">
                <label htmlFor="rk-treview">Your review</label>
                <textarea
                  id="rk-treview"
                  rows={4}
                  required
                  maxLength={MAX_REVIEW_LENGTH}
                  placeholder="Tell us about your experience..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <span className="rk-rform__counter">{review.length}/{MAX_REVIEW_LENGTH}</span>
              </div>

              {submitTestimonial.isError && (
                <p className="rk-rform__error">
                  {submitTestimonial.error?.response?.data?.message || "Failed to submit review."}
                </p>
              )}

              <div className="rk-rform__actions">
                <button type="button" className="rk-rform__cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="rk-rform__submit" disabled={submitTestimonial.isPending}>
                  {submitTestimonial.isPending ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const TestimonialsHome = () => {
  const { data: testimonials = [] } = useTestimonials();
  const [modalOpen, setModalOpen] = useState(false);

  // Only scroll if the row's real content is wider than the space available -
  // otherwise autoFill just pads a short list out with repeated cards.
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
  }, [testimonials]);

  return (
    <section className="rk-testi">
      <div className="rk-testi__inner">
        <div className="rk-testi__header">
          <div className="rk-testi__header-text">
            <p className="rk-testi__eyebrow">RentalKing</p>
            <h2 className="rk-testi__heading">
              Let's See Our
              <span>Client's Reviews</span>
            </h2>
          </div>

          <div className="rk-testi__header-actions">
            <div className="rk-testi__badges">
              <div className="rk-testi__badge">
                <GoogleIcon />
                <div>
                  <span className="rk-testi__badge-stars">{starsFor(4.8)}</span>
                  <p>4.8 on Google</p>
                </div>
              </div>

              <div className="rk-testi__badge">
                <JustdialBadge />
                <div>
                  <span className="rk-testi__badge-stars">{starsFor(4.3)}</span>
                  <p>4.3 on Justdial</p>
                </div>
              </div>

              <div className="rk-testi__badge">
                <PeopleIcon />
                <div>
                  <p>500+ Happy Clients</p>
                </div>
              </div>
            </div>

            <button type="button" className="rk-testi__leavebtn" onClick={() => setModalOpen(true)}>
              Leave a Review
            </button>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <p className="rk-testi__empty">Be the first to share your experience.</p>
        ) : (
          <div ref={wrapRef} className="rk-testi__viewport">
            <div ref={probeRef} className="rk-testi__probe" aria-hidden="true">
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} t={t} />
              ))}
            </div>

            {needsMarquee ? (
              <Marquee pauseOnHover autoFill speed={30}>
                {testimonials.map((t) => (
                  <TestimonialCard key={t._id} t={t} />
                ))}
              </Marquee>
            ) : (
              <div className="rk-testi__static-row">
                {testimonials.map((t) => (
                  <TestimonialCard key={t._id} t={t} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {modalOpen && <LeaveReviewModal onClose={() => setModalOpen(false)} />}
    </section>
  );
};

export default TestimonialsHome;
