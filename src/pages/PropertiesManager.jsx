import { useEffect, useState } from "react";
import {
  getAllProperties,
  addProperty,
  editProperty,
  deleteProperty,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const CATEGORIES = ["Apartment", "Villa", "House", "Plot", "Commercial"];

const emptyForm = {
  name: "",
  price: "",
  priceNumeric: "",
  location: "",
  address: "",
  category: "Apartment",
  coverImage: "",
  images: "",
  beds: "",
  baths: "",
  sqft: "",
  description: "",
  isFeatured: false,
};

const PropertiesManager = ({ featuredOnly }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties();
      setProperties(data || []);
    } catch (err) {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const visible = featuredOnly ? properties.filter((p) => p.isFeatured) : properties;

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setForm({
      name: p.name || "",
      price: p.price || "",
      priceNumeric: p.priceNumeric ?? "",
      location: p.location || "",
      address: p.address || "",
      category: p.category || "Apartment",
      coverImage: p.coverImage || "",
      images: (p.images || []).join(", "),
      beds: p.beds ?? "",
      baths: p.baths ?? "",
      sqft: p.sqft || "",
      description: p.description || "",
      isFeatured: !!p.isFeatured,
    });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      priceNumeric: Number(form.priceNumeric),
      beds: form.beds ? Number(form.beds) : undefined,
      baths: form.baths ? Number(form.baths) : undefined,
      images: form.images
        ? form.images.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await editProperty(editingId, payload);
        setSuccess("Property updated successfully.");
      } else {
        await addProperty(payload);
        setSuccess("Property added successfully.");
      }
      setShowForm(false);
      fetchProperties();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this property? This cannot be undone.")) return;
    try {
      await deleteProperty(id);
      setSuccess("Property deleted.");
      fetchProperties();
    } catch (err) {
      setError("Failed to delete property.");
    }
  };

  const toggleFeatured = async (p) => {
    try {
      await editProperty(p._id, { isFeatured: !p.isFeatured });
      fetchProperties();
    } catch {
      setError("Failed to update featured status.");
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>{featuredOnly ? "Featured Properties" : "Properties"}</h2>
        {!featuredOnly && (
          <button className="rk-amgr__add" onClick={openAddForm}>+ Add Property</button>
        )}
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Property" : "Add New Property"}</h3>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Name</label>
              <input name="name" required value={form.name} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Price (display text)</label>
              <input name="price" required placeholder="₹45,000/month" value={form.price} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Price (numeric)</label>
              <input name="priceNumeric" type="number" required value={form.priceNumeric} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Location</label>
              <input name="location" required value={form.location} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Cover Image URL</label>
            <input name="coverImage" required value={form.coverImage} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Additional Images (comma-separated URLs)</label>
            <input name="images" value={form.images} onChange={handleChange} />
          </div>

          <div className="rk-amgr__row rk-amgr__row--3">
            <div className="rk-amgr__field">
              <label>Beds</label>
              <input name="beds" type="number" value={form.beds} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Baths</label>
              <input name="baths" type="number" value={form.baths} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Sqft</label>
              <input name="sqft" value={form.sqft} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Description</label>
            <textarea name="description" rows={3} required value={form.description} onChange={handleChange} />
          </div>

          <label className="rk-amgr__checkbox">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            Mark as Featured
          </label>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Property" : "Add Property"}
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
        ) : visible.length === 0 ? (
          <div className="rk-amgr__empty">
            {featuredOnly ? "No featured properties yet." : "No properties yet."}
          </div>
        ) : (
          <table className="rk-amgr__table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.coverImage} alt={p.name} className="rk-amgr__thumb" /></td>
                  <td>{p.name}<br /><span className="rk-amgr__badge">{p.location}</span></td>
                  <td><span className="rk-amgr__badge">{p.category}</span></td>
                  <td>{p.price}</td>
                  <td>
                    <button
                      className={`rk-amgr__badge ${p.isFeatured ? "rk-amgr__badge--gold" : ""}`}
                      style={{ border: "none", cursor: "pointer" }}
                      onClick={() => toggleFeatured(p)}
                    >
                      {p.isFeatured ? "Featured" : "Mark Featured"}
                    </button>
                  </td>
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

export default PropertiesManager;