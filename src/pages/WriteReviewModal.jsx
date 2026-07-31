import { useState } from "react";
import "./WritereviewModal.css";

const StarIcon = ({ filled }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  </svg>
);

// Fields mirror the Testimonial model: name, property, rating, text.
// Swap handleSubmit's mock push for a POST to /add once the API is wired up.
const initialForm = {
  name: "",
  property: "",
  rating: 0,
  text: "",
};

const WriteReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRatingClick = (value) =>
    setForm((prev) => ({ ...prev, rating: value }));

  const resetAndClose = () => {
    setForm(initialForm);
    setHoverRating(0);
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.property.trim() || !form.text.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (form.rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);

    // --- MOCK MODE ---
    // Currently just hands the new review back up to the parent so it can
    // be added to local state. Once the API is ready, replace this block
    // with a real request, e.g.:
    //
    // const res = await fetch("/api/testimonials/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    // const data = await res.json();
    // onSubmit(data.testimonial);

    const newReview = {
      _id: `local-${Date.now()}`,
      ...form,
      rating: Number(form.rating),
    };

    onSubmit(newReview);
    setSubmitting(false);
    resetAndClose();
  };

  return (
    <div className="rk-rmodal__overlay" onClick={resetAndClose}>
      <div
        className="rk-rmodal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rk-rmodal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="rk-rmodal__close"
          onClick={resetAndClose}
          aria-label="Close"
        >
          &times;
        </button>

        <p className="rk-rmodal__eyebrow">Share your experience</p>
        <h2 id="rk-rmodal-title" className="rk-rmodal__title">
          Write a Review
        </h2>

        <form className="rk-rmodal__form" onSubmit={handleSubmit}>
          <div className="rk-rmodal__field">
            <label htmlFor="rk-rating">Your rating</label>
            <div
              className="rk-rmodal__rating"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="rk-rmodal__star"
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => handleRatingClick(star)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <StarIcon filled={star <= (hoverRating || form.rating)} />
                </button>
              ))}
            </div>
          </div>

          <div className="rk-rmodal__field">
            <label htmlFor="rk-name">Full name</label>
            <input
              id="rk-name"
              type="text"
              placeholder="e.g. Ayesha Kapoor"
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>

          <div className="rk-rmodal__field">
            <label htmlFor="rk-property">Property / Relation</label>
            <input
              id="rk-property"
              type="text"
              placeholder="e.g. Owner, Sunrise Apartments"
              value={form.property}
              onChange={handleChange("property")}
            />
          </div>

          <div className="rk-rmodal__field">
            <label htmlFor="rk-text">Your review</label>
            <textarea
              id="rk-text"
              rows={4}
              placeholder="Tell us about your experience..."
              value={form.text}
              onChange={handleChange("text")}
            />
          </div>

          {error && <p className="rk-rmodal__error">{error}</p>}

          <div className="rk-rmodal__actions">
            <button
              type="button"
              className="rk-rmodal__cancel"
              onClick={resetAndClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rk-rmodal__submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;