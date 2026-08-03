import { useEffect, useState } from "react";
import {
  getAllTestimonials,
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyForm = { name: "", property: "", rating: 5, text: "" };

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getAllTestimonials();
      setTestimonials(data || []);
    } catch {
      setError("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (t) => {
    setForm({
      name: t.name || "",
      property: t.property || "",
      rating: t.rating ?? 5,
      text: t.text || "",
    });
    setEditingId(t._id);
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const payload = { ...form, rating: Number(form.rating) };

    try {
      if (editingId) {
        await editTestimonial(editingId, payload);
        setSuccess("Testimonial updated successfully.");
      } else {
        await addTestimonial(payload);
        setSuccess("Testimonial added successfully.");
      }
      setShowForm(false);
      fetchTestimonials();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) return;
    try {
      await deleteTestimonial(id);
      setSuccess("Testimonial deleted.");
      fetchTestimonials();
    } catch {
      setError("Failed to delete testimonial.");
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Testimonials</h2>
        <button className="rk-amgr__add" onClick={openAddForm}>+ Add Testimonial</button>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h3>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Name</label>
              <input name="name" required value={form.name} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Property</label>
              <input name="property" required value={form.property} onChange={handleChange} placeholder="e.g. Sunrise Apartments, Vijay Nagar" />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Rating (1–5)</label>
            <select name="rating" value={form.rating} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="rk-amgr__field">
            <label>Review Text</label>
            <textarea name="text" rows={4} required value={form.text} onChange={handleChange} />
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>
            <button type="button" className="rk-amgr__cancel" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="rk-amgr__table-wrap">
        {loading ? (
          <div className="rk-amgr__empty">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="rk-amgr__empty">No testimonials yet.</div>
        ) : (
          <table className="rk-amgr__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>{t.property}</td>
                  <td><span className="rk-amgr__badge rk-amgr__badge--gold">{t.rating} / 5</span></td>
                  <td style={{ maxWidth: 260 }}>{t.text?.slice(0, 80)}{t.text?.length > 80 ? "..." : ""}</td>
                  <td>
                    <div className="rk-amgr__row-actions">
                      <button className="rk-amgr__edit" onClick={() => openEditForm(t)}>Edit</button>
                      <button className="rk-amgr__delete" onClick={() => handleDelete(t._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TestimonialsManager;