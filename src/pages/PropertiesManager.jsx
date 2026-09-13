import { useEffect, useState } from "react";
import {
  getAllProperties,
  addProperty,
  editProperty,
  deleteProperty,
  getPropertySchema,
} from "../api/adminResourceApi";
import { formatPrice } from "../lib/priceFormat";
import AssetPicker from "../components/AssetPicker";
import "./AdminManager.css";

const emptySchema = {
  categories: [],
  statusesByCategory: {},
  furnishingByCategory: {},
  bhkByCategory: {},
  priceFrequencies: [],
  priceFrequencyStatuses: [],
  bedsRangeByBhk: {},
};

const baseForm = {
  name: "",
  priceNumeric: "",
  priceFrequency: "",
  location: "",
  address: "",
  category: "",
  status: "",
  furnishing: "",
  bhk: "",
  coverImage: "",
  images: [],
  beds: "",
  baths: "",
  sqft: "",
  description: "",
  isFeatured: false,
};

// Picks valid status/furnishing/bhk for a category, keeping the current
// value when it's still valid and otherwise falling back to the category's
// first option (or "" when the category doesn't use that field at all).
const repairDependentFields = (schema, category, current) => {
  const statuses = schema.statusesByCategory[category] || [];
  const furnishings = schema.furnishingByCategory[category] || [];
  const bhks = schema.bhkByCategory[category] || [];
  return {
    status: statuses.includes(current.status) ? current.status : statuses[0] || "",
    furnishing: furnishings.includes(current.furnishing) ? current.furnishing : furnishings[0] || "",
    bhk: bhks.includes(current.bhk) ? current.bhk : bhks[0] || "",
  };
};

// Price frequency only applies to statuses that bill recurringly (e.g. "For
// Rent"); everything else should have it cleared entirely.
const repairPriceFrequency = (schema, status, current) => {
  if (!schema.priceFrequencyStatuses.includes(status)) return "";
  return schema.priceFrequencies.includes(current) ? current : schema.priceFrequencies[0] || "";
};

// Beds is locked to a fixed value for most BHKs and only free-choice (with a
// floor) for "5+ BHK" - keep it valid whenever the BHK it depends on changes.
const repairBeds = (schema, bhk, current) => {
  const range = schema.bedsRangeByBhk[bhk];
  if (!range) return "";
  if (range.min === range.max) return range.min;
  const currentNum = Number(current);
  return currentNum >= range.min ? currentNum : range.min;
};

const PropertiesManager = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [schema, setSchema] = useState(emptySchema);
  const [schemaLoading, setSchemaLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(baseForm);
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getAllProperties();
      setProperties(data || []);
    } catch {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSchema = async () => {
    setSchemaLoading(true);
    try {
      const data = await getPropertySchema();
      setSchema(data);
    } catch {
      setError("Failed to load property schema.");
    } finally {
      setSchemaLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchSchema();
  }, []);


  const openAddForm = () => {
    const category = schema.categories[0] || "";
    const dependent = repairDependentFields(schema, category, { status: "", furnishing: "", bhk: "" });
    setForm({
      ...baseForm,
      category,
      ...dependent,
      priceFrequency: repairPriceFrequency(schema, dependent.status, ""),
      beds: repairBeds(schema, dependent.bhk, ""),
    });
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    const category = p.category || schema.categories[0] || "";
    const dependent = repairDependentFields(schema, category, {
      status: p.status || "",
      furnishing: p.furnishing || "",
      bhk: p.bhk || "",
    });
    setForm({
      name: p.name || "",
      priceNumeric: p.priceNumeric ?? "",
      priceFrequency: repairPriceFrequency(schema, dependent.status, p.priceFrequency || ""),
      location: p.location || "",
      address: p.address || "",
      category,
      ...dependent,
      coverImage: p.coverImage || "",
      images: p.images || [],
      beds: repairBeds(schema, dependent.bhk, p.beds ?? ""),
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
    if (name === "category") {
      setForm((f) => {
        const dependent = repairDependentFields(schema, value, f);
        return {
          ...f,
          category: value,
          ...dependent,
          priceFrequency: repairPriceFrequency(schema, dependent.status, f.priceFrequency),
          beds: repairBeds(schema, dependent.bhk, f.beds),
        };
      });
    } else if (name === "status") {
      setForm((f) => ({ ...f, status: value, priceFrequency: repairPriceFrequency(schema, value, f.priceFrequency) }));
    } else if (name === "bhk") {
      setForm((f) => ({ ...f, bhk: value, beds: repairBeds(schema, value, f.beds) }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.coverImage) {
      setError("Choose a cover image.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");

    // Explicit null (not an omitted key) tells the backend to clear a field
    // that doesn't apply to this category/status - an omitted key means
    // "don't touch this", which matters for partial updates like toggling
    // isFeatured.
    const payload = {
      ...form,
      priceNumeric: Number(form.priceNumeric),
      furnishing: form.furnishing || null,
      bhk: form.bhk || null,
      priceFrequency: form.priceFrequency || null,
      beds: form.beds ? Number(form.beds) : null,
      baths: form.baths ? Number(form.baths) : null,
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
    } catch {
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

  const bedsRange = schema.bedsRangeByBhk[form.bhk];
  const bedsLocked = !!bedsRange && bedsRange.min === bedsRange.max;
  const showBedsBaths = (schema.bhkByCategory[form.category] || []).length > 0;

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Properties</h2>
        <button className="rk-amgr__add" onClick={openAddForm} disabled={schemaLoading}>
          + Add Property
        </button>
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
                {schema.categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--3">
            <div className="rk-amgr__field">
              <label>Status</label>
              <select name="status" required value={form.status} onChange={handleChange}>
                {(schema.statusesByCategory[form.category] || []).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {(schema.furnishingByCategory[form.category] || []).length > 0 && (
              <div className="rk-amgr__field">
                <label>Furnishing</label>
                <select name="furnishing" required value={form.furnishing} onChange={handleChange}>
                  {schema.furnishingByCategory[form.category].map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            )}
            {(schema.bhkByCategory[form.category] || []).length > 0 && (
              <div className="rk-amgr__field">
                <label>BHK</label>
                <select name="bhk" required value={form.bhk} onChange={handleChange}>
                  {schema.bhkByCategory[form.category].map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Price</label>
              <div className="rk-amgr__prefixed-input">
                <span>₹</span>
                <input
                  name="priceNumeric"
                  type="number"
                  required
                  min="0"
                  value={form.priceNumeric}
                  onChange={handleChange}
                  placeholder="45000"
                />
              </div>
            </div>
            {schema.priceFrequencyStatuses.includes(form.status) && (
              <div className="rk-amgr__field">
                <label>Frequency</label>
                <select name="priceFrequency" required value={form.priceFrequency} onChange={handleChange}>
                  {schema.priceFrequencies.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            )}
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
            <label>Cover Image</label>
            <AssetPicker
              value={form.coverImage}
              onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
            />
          </div>

          <div className="rk-amgr__field">
            <label>Additional Images</label>
            <AssetPicker
              value={form.images}
              onChange={(urls) => setForm((f) => ({ ...f, images: urls }))}
              multiple
            />
          </div>

          <div className="rk-amgr__row rk-amgr__row--3">
            {showBedsBaths && (
              <>
                <div className="rk-amgr__field">
                  <label>Beds</label>
                  <input
                    name="beds"
                    type="number"
                    required
                    readOnly={bedsLocked}
                    min={bedsRange ? bedsRange.min : undefined}
                    value={form.beds}
                    onChange={handleChange}
                  />
                </div>
                <div className="rk-amgr__field">
                  <label>Baths</label>
                  <input name="baths" type="number" required min="1" value={form.baths} onChange={handleChange} />
                </div>
              </>
            )}
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
        ) : properties.length === 0 ? (
          <div className="rk-amgr__empty">No properties yet.</div>
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
              {properties.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.coverImage} alt={p.name} className="rk-amgr__thumb" /></td>
                  <td>{p.name}<br /><span className="rk-amgr__badge">{p.location}</span></td>
                  <td><span className="rk-amgr__badge">{p.category}</span></td>
                  <td>{formatPrice(p.priceNumeric, p.status, p.priceFrequency)}</td>
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
                      <button className="rk-amgr__edit" onClick={() => openEditForm(p)} disabled={schemaLoading}>Edit</button>
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