import { useEffect, useState } from "react";
import {
  getAllPartners,
  addPartner,
  editPartner,
  deletePartner,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyForm = { name: "", logo: "", order: "" };

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
      order: p.order ?? "",
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
    const payload = { ...form, order: form.order === "" ? 0 : Number(form.order) };

    try {
      if (editingId) {
        await editPartner(editingId, payload);
        setSuccess("Partner updated successfully.");
      } else {
        await addPartner(payload);
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

          <div className="rk-amgr__field">
            <label>Order (lower shows first)</label>
            <input name="order" type="number" value={form.order} onChange={handleChange} />
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
          <table className="rk-amgr__table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.logo} alt={p.name} className="rk-amgr__thumb" /></td>
                  <td>{p.name}</td>
                  <td>{p.order}</td>
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
        )}
      </div>
    </div>
  );
};

export default PartnersManager;
