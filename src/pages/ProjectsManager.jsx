import { useEffect, useState } from "react";
import {
  getAllProjects,
  addProject,
  editProject,
  deleteProject,
  getProjectSchema,
} from "../api/adminResourceApi";
import AssetPicker from "../components/AssetPicker";
import "./AdminManager.css";

const emptyForm = { name: "", categories: [], images: [], description: "" };

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getAllProjects();
      setProjects(data || []);
    } catch {
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    getProjectSchema()
      .then((data) => setCategoryOptions(data.categories || []))
      .catch(() => {});
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setForm({
      name: p.name || "",
      categories: p.categories || [],
      images: p.images || [],
      description: p.description || "",
    });
    setEditingId(p._id);
    setShowForm(true);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleCategory = (category) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(category)
        ? f.categories.filter((c) => c !== category)
        : [...f.categories, category],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.categories.length === 0) {
      setError("Select at least one category.");
      return;
    }
    if (form.images.length === 0) {
      setError("Choose at least one image.");
      return;
    }
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        await editProject(editingId, form);
        setSuccess("Project updated successfully.");
      } else {
        await addProject(form);
        setSuccess("Project added successfully.");
      }
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project? This cannot be undone.")) return;
    try {
      await deleteProject(id);
      setSuccess("Project deleted.");
      fetchProjects();
    } catch {
      setError("Failed to delete project.");
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Projects</h2>
        <button className="rk-amgr__add" onClick={openAddForm}>+ Add Project</button>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>

          <div className="rk-amgr__field">
            <label>Name</label>
            <input name="name" required value={form.name} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Categories</label>
            <div className="rk-amgr__checkbox-group">
              {categoryOptions.map((c) => (
                <label className="rk-amgr__checkbox" key={c}>
                  <input
                    type="checkbox"
                    checked={form.categories.includes(c)}
                    onChange={() => toggleCategory(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Images</label>
            <AssetPicker
              value={form.images}
              onChange={(urls) => setForm((f) => ({ ...f, images: urls }))}
              multiple
            />
          </div>

          <div className="rk-amgr__field">
            <label>Description</label>
            <textarea name="description" rows={5} required value={form.description} onChange={handleChange} />
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Project" : "Add Project"}
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
        ) : projects.length === 0 ? (
          <div className="rk-amgr__empty">No upcoming projects yet.</div>
        ) : (
          <table className="rk-amgr__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Categories</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.images?.[0]} alt={p.name} className="rk-amgr__thumb" /></td>
                  <td>{p.name}</td>
                  <td>
                    <div className="rk-amgr__badge-group">
                      {(p.categories || []).map((c) => (
                        <span key={c} className="rk-amgr__badge rk-amgr__badge--gold">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="rk-amgr__td-truncate">{p.description}</td>
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

export default ProjectsManager;