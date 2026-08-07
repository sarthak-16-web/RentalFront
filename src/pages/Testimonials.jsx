import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTestimonials } from "../hooks/useRentalKingData";
import apiClient from "../lib/apiClient";
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

// Fields mirror the Testimonial model: name, property, rating, text.
const initialForm = {
  name: "",
  property: "",
  rating: 0,
  text: "",
};

const Testimonials = () => {
  // Mock mode: new reviews live in local state, merged on top of
  // MOCK_TESTIMONIALS. Once the API is ready, fetch the real list with
  // getAllTestimonials on mount instead, and POST to /add on submit.
  const queryClient = useQueryClient();
const { data: allReviews = [] } = useTestimonials();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRatingClick = (value) =>
    setForm((prev) => ({ ...prev, rating: value }));

  const closeForm = () => {
    setIsFormOpen(false);
    setForm(initialForm);
    setHoverRating(0);
    setError("");
  };

  
  const addReviewMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post("/api/testimonial/add", payload);
      return data.testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      closeForm();
    },
  });

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

    try {
      await addReviewMutation.mutateAsync({
        ...form,
        rating: Number(form.rating),
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rk-treviews">
      <div className="rk-treviews__header">
        <div className="rk-treviews__header-inner">
          <div className="rk-treviews__header-text">
            <p className="rk-treviews__eyebrow">What people say</p>
            <h1>All Testimonials</h1>
            <p className="rk-treviews__sub">
              {allReviews.length} reviews from tenants, owners, and
              businesses who worked with RentalKing.
            </p>
          </div>
          <button
            type="button"
            className="rk-treviews__writebtn"
            onClick={() => setIsFormOpen(true)}
          >
            Write a Review
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="rk-rform__overlay" onClick={closeForm}>
          <div
            className="rk-rform"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rk-rform-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="rk-rform__close"
              onClick={closeForm}
              aria-label="Close"
            >
              &times;
            </button>

            <p className="rk-rform__eyebrow">Share your experience</p>
            <h2 id="rk-rform-title" className="rk-rform__title">
              Write a Review
            </h2>

            <form className="rk-rform__form" onSubmit={handleSubmit}>
              <div className="rk-rform__field">
                <label htmlFor="rk-rating">Your rating</label>
                <div
                  className="rk-rform__rating"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="rk-rform__star"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => handleRatingClick(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <StarIcon filled={star <= (hoverRating || form.rating)} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="rk-rform__field">
                <label htmlFor="rk-name">Full name</label>
                <input
                  id="rk-name"
                  type="text"
                  placeholder="e.g. Ayesha Kapoor"
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </div>

              <div className="rk-rform__field">
                <label htmlFor="rk-property">Property / Relation</label>
                <input
                  id="rk-property"
                  type="text"
                  placeholder="e.g. Owner, Sunrise Apartments"
                  value={form.property}
                  onChange={handleChange("property")}
                />
              </div>

              <div className="rk-rform__field">
                <label htmlFor="rk-text">Your review</label>
                <textarea
                  id="rk-text"
                  rows={4}
                  placeholder="Tell us about your experience..."
                  value={form.text}
                  onChange={handleChange("text")}
                />
              </div>

              {error && <p className="rk-rform__error">{error}</p>}

              <div className="rk-rform__actions">
                <button
                  type="button"
                  className="rk-rform__cancel"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rk-rform__submit"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="rk-treviews__body">
        <div className="rk-treviews__grid">
          {allReviews.map((r) => (
            <ReviewCard key={r._id} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;