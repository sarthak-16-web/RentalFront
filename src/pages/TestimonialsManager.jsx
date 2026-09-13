import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getAllTestimonials,
  addTestimonial,
  editTestimonial,
  deleteTestimonial,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyForm = { name: "", review: "" };

const TestimonialsManager = () => {
  const queryClient = useQueryClient();
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
      review: t.review || "",
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

    try {
      if (editingId) {
        await editTestimonial(editingId, form);
        setSuccess("Testimonial updated successfully.");
      } else {
        await addTestimonial(form);
        setSuccess("Testimonial added successfully.");
      }
      setShowForm(false);
      fetchTestimonials();
      queryClient.invalidateQueries({ queryKey: ["adminTestimonials"] });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await editTestimonial(id, { approved: true });
      setSuccess("Testimonial approved.");
      fetchTestimonials();
      queryClient.invalidateQueries({ queryKey: ["adminTestimonials"] });
    } catch {
      setError("Failed to approve testimonial.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial? This cannot be undone.")) return;
    try {
      await deleteTestimonial(id);
      setSuccess("Testimonial deleted.");
      fetchTestimonials();
      queryClient.invalidateQueries({ queryKey: ["adminTestimonials"] });
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

      <p className="rk-amgr__hint">
        Reviews submitted from the website land here as Pending. Approve them
        to show them on the homepage, or delete them.
      </p>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h3>

          <div className="rk-amgr__field">
            <label>Name</label>
            <input name="name" required maxLength={60} value={form.name} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Review</label>
            <textarea name="review" rows={4} required maxLength={200} value={form.review} onChange={handleChange} />
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
                <th>Review</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td style={{ maxWidth: 320 }}>{t.review}</td>
                  <td>
                    {t.approved ? (
                      <span className="rk-amgr__badge rk-amgr__badge--gold">Approved</span>
                    ) : (
                      <span className="rk-amgr__badge">Pending</span>
                    )}
                  </td>
                  <td>
                    <div className="rk-amgr__row-actions">
                      {!t.approved && (
                        <button className="rk-amgr__edit" onClick={() => handleApprove(t._id)}>Approve</button>
                      )}
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
