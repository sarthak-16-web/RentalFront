import { MOCK_TESTIMONIALS } from "../data/mockTestimonials";
import "./Testimonials.css";

const StarIcon = ({ filled }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="rk-treview__stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} filled={i <= rating} />
    ))}
  </div>
);

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ReviewCard = ({ review }) => (
  <div className="rk-treview">
    <StarRating rating={review.rating} />
    <p className="rk-treview__text">{review.text}</p>
    <div className="rk-treview__footer">
      <span className="rk-treview__avatar">{initials(review.name)}</span>
      <div>
        <h5>{review.name}</h5>
        <span>{review.property}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <div className="rk-treviews">
      <div className="rk-treviews__header">
        <div className="rk-treviews__header-inner">
          <p className="rk-treviews__eyebrow">What people say</p>
          <h1>All Testimonials</h1>
          <p className="rk-treviews__sub">
            {MOCK_TESTIMONIALS.length} reviews from tenants, owners, and
            businesses who worked with RentalKing.
          </p>
        </div>
      </div>

      <div className="rk-treviews__body">
        <div className="rk-treviews__grid">
          {MOCK_TESTIMONIALS.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
