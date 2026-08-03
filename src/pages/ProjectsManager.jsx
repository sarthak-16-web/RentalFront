import { useEffect, useState } from "react";
import {
  getAllProjects,
  addProject,
  editProject,
  deleteProject,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyForm = { name: "", location: "", completion: "", units: "", image: "", description: "" };

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
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
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (p) => {
    setForm({
      name: p.name || "",
      location: p.location || "",
      completion: p.completion || "",
      units: p.units ?? "",
      image: p.image || "",
      description: p.description || "",
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
    const payload = { ...form, units: Number(form.units) };

    try {
      if (editingId) {
        await editProject(editingId, payload);
        setSuccess("Project updated successfully.");
      } else {
        await addProject(payload);
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
        <h2>Upcoming Projects</h2>
        <button className="rk-amgr__add" onClick={openAddForm}>+ Add Project</button>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Name</label>
              <input name="name" required value={form.name} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Location</label>
              <input name="location" required value={form.location} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Completion (e.g. "Q3 2026")</label>
              <input name="completion" required value={form.completion} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Units</label>
              <input name="units" type="number" required value={form.units} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Image URL</label>
            <input name="image" required value={form.image} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Description</label>
            <textarea name="description" rows={3} required value={form.description} onChange={handleChange} />
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
                <th>Location</th>
                <th>Completion</th>
                <th>Units</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td><img src={p.image} alt={p.name} className="rk-amgr__thumb" /></td>
                  <td>{p.name}</td>
                  <td>{p.location}</td>
                  <td><span className="rk-amgr__badge rk-amgr__badge--gold">{p.completion}</span></td>
                  <td>{p.units}</td>
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