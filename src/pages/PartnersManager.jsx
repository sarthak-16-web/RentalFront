import { useEffect, useState } from "react";
import {
  getAllPartners,
  addPartner,
  editPartner,
  deletePartner,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyForm = { name: "", logo: "" };

const PartnersManager = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await getAllPartners();
      setPartners(data || []);
    } catch {
      setError("Failed to load partners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setForm({
      name: p.name || "",
      logo: p.logo || "",
    });
    setEditingId(p._id);
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
        await editPartner(editingId, form);
        setSuccess("Partner updated successfully.");
      } else {
        // New partners go to the end of the order; reorder by dragging.
        await addPartner({ ...form, order: partners.length });
        setSuccess("Partner added successfully.");
      }
      setShowForm(false);
      fetchPartners();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this partner? This cannot be undone.")) return;
    try {
      await deletePartner(id);
      setSuccess("Partner deleted.");
      fetchPartners();
    } catch {
      setError("Failed to delete partner.");
    }
  };

  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (index) => (e) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index)); // needed for Firefox
  };

  const handleDragOver = (index) => (e) => {
    e.preventDefault();
    if (index !== dragOverIndex) setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index) => async (e) => {
    e.preventDefault();
    handleDragEnd();
    if (dragIndex === null || dragIndex === index) return;

    const reordered = [...partners];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setPartners(reordered); // optimistic - reflect the new order immediately

    setError("");
    try {
      await Promise.all(
        reordered.map((p, i) => (p.order === i ? null : editPartner(p._id, { order: i })))
      );
    } catch {
      setError("Failed to save the new order.");
      fetchPartners(); // resync with the server's actual state
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Channel Partners</h2>
        <button className="rk-amgr__add" onClick={openAddForm}>+ Add Partner</button>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Partner" : "Add Partner"}</h3>

          <div className="rk-amgr__field">
            <label>Name</label>
            <input name="name" required value={form.name} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Logo URL</label>
            <input name="logo" required value={form.logo} onChange={handleChange} />
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Partner" : "Add Partner"}
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
        ) : partners.length === 0 ? (
          <div className="rk-amgr__empty">No partners yet.</div>
        ) : (
          <>
            <p className="rk-amgr__hint">Drag rows by the handle to reorder.</p>
            <table className="rk-amgr__table">
              <thead>
                <tr>
                  <th />
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p, i) => (
                  <tr
                    key={p._id}
                    draggable
                    onDragStart={handleDragStart(i)}
                    onDragOver={handleDragOver(i)}
                    onDrop={handleDrop(i)}
                    onDragEnd={handleDragEnd}
                    className={
                      (dragIndex === i ? "rk-amgr__row--dragging " : "") +
                      (dragOverIndex === i && dragIndex !== i ? "rk-amgr__row--drag-over" : "")
                    }
                  >
                    <td className="rk-amgr__drag-handle" aria-label="Drag to reorder">⠿</td>
                    <td><img src={p.logo} alt={p.name} className="rk-amgr__thumb" /></td>
                    <td>{p.name}</td>
                    <td>
                      <div className="rk-amgr__row-actions">
                        <button className="rk-amgr__edit" onClick={() => openEditForm(p)}>Edit</button>
                        <button className="rk-amgr__delete" onClick={() => handleDelete(p._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default PartnersManager;
