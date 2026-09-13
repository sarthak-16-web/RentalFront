import { useEffect, useState } from "react";
import { useDirectorMessage, useUpdateDirectorMessage } from "../hooks/useDirectorMessage";
import {
  getAllTeamMembers,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
} from "../api/adminResourceApi";
import "./AdminManager.css";

const emptyDirectorForm = { name: "", role: "", photo: "", message: "" };
const emptyMemberForm = { name: "", role: "", photo: "", blurb: "" };

const TeamManager = () => {
  const { data: directorMessage, isLoading: directorLoading } = useDirectorMessage();
  const updateDirectorMessage = useUpdateDirectorMessage();

  const [directorForm, setDirectorForm] = useState(emptyDirectorForm);
  const [directorError, setDirectorError] = useState("");
  const [directorSuccess, setDirectorSuccess] = useState("");

  useEffect(() => {
    if (directorMessage) {
      setDirectorForm({
        name: directorMessage.name || "",
        role: directorMessage.role || "",
        photo: directorMessage.photo || "",
        message: directorMessage.message || "",
      });
    }
  }, [directorMessage]);

  const handleDirectorChange = (e) =>
    setDirectorForm({ ...directorForm, [e.target.name]: e.target.value });

  const handleDirectorSubmit = async (e) => {
    e.preventDefault();
    setDirectorError("");
    setDirectorSuccess("");
    try {
      await updateDirectorMessage.mutateAsync(directorForm);
      setDirectorSuccess("Director's message saved.");
    } catch (err) {
      setDirectorError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyMemberForm);
  const [saving, setSaving] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getAllTeamMembers();
      setMembers(data || []);
    } catch {
      setError("Failed to load team members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAddForm = () => {
    setForm(emptyMemberForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (m) => {
    setForm({
      name: m.name || "",
      role: m.role || "",
      photo: m.photo || "",
      blurb: m.blurb || "",
    });
    setEditingId(m._id);
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
        await editTeamMember(editingId, form);
        setSuccess("Team member updated successfully.");
      } else {
        // New members go to the end of the order; reorder by dragging.
        await addTeamMember({ ...form, order: members.length });
        setSuccess("Team member added successfully.");
      }
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member? This cannot be undone.")) return;
    try {
      await deleteTeamMember(id);
      setSuccess("Team member deleted.");
      fetchMembers();
    } catch {
      setError("Failed to delete team member.");
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

    const reordered = [...members];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setMembers(reordered); // optimistic - reflect the new order immediately

    setError("");
    try {
      await Promise.all(
        reordered.map((m, i) => (m.order === i ? null : editTeamMember(m._id, { order: i })))
      );
    } catch {
      setError("Failed to save the new order.");
      fetchMembers(); // resync with the server's actual state
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Director's Message</h2>
      </div>

      {directorError && <div className="rk-amgr__msg rk-amgr__msg--error">{directorError}</div>}
      {directorSuccess && <div className="rk-amgr__msg rk-amgr__msg--success">{directorSuccess}</div>}

      {directorLoading && !directorMessage ? (
        <div className="rk-amgr__empty">Loading...</div>
      ) : (
        <form className="rk-amgr__form" onSubmit={handleDirectorSubmit}>
          <p className="rk-amgr__hint">
            Shown at the top of the Team page as a message from company leadership.
          </p>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Name</label>
              <input name="name" required value={directorForm.name} onChange={handleDirectorChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Role</label>
              <input name="role" required value={directorForm.role} onChange={handleDirectorChange} />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Photo URL</label>
            <input name="photo" required value={directorForm.photo} onChange={handleDirectorChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Message</label>
            <textarea
              name="message"
              rows={8}
              required
              value={directorForm.message}
              onChange={handleDirectorChange}
            />
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={updateDirectorMessage.isPending}>
              {updateDirectorMessage.isPending ? "Saving..." : "Save Director's Message"}
            </button>
          </div>
        </form>
      )}

      <div className="rk-amgr__head" style={{ marginTop: 40 }}>
        <h2>Team Members</h2>
        <button className="rk-amgr__add" onClick={openAddForm}>+ Add Team Member</button>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {showForm && (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit Team Member" : "Add Team Member"}</h3>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Name</label>
              <input name="name" required value={form.name} onChange={handleChange} />
            </div>
            <div className="rk-amgr__field">
              <label>Role</label>
              <input name="role" required value={form.role} onChange={handleChange} />
            </div>
          </div>

          <div className="rk-amgr__field">
            <label>Photo URL</label>
            <input name="photo" required value={form.photo} onChange={handleChange} />
          </div>

          <div className="rk-amgr__field">
            <label>Blurb (one line, shown on their card)</label>
            <input name="blurb" required value={form.blurb} onChange={handleChange} />
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
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
        ) : members.length === 0 ? (
          <div className="rk-amgr__empty">No team members yet.</div>
        ) : (
          <>
            <p className="rk-amgr__hint">Drag rows by the handle to reorder.</p>
            <table className="rk-amgr__table">
              <thead>
                <tr>
                  <th />
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m._id}
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
                    <td><img src={m.photo} alt={m.name} className="rk-amgr__thumb" /></td>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td>
                      <div className="rk-amgr__row-actions">
                        <button className="rk-amgr__edit" onClick={() => openEditForm(m)}>Edit</button>
                        <button className="rk-amgr__delete" onClick={() => handleDelete(m._id)}>Delete</button>
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

export default TeamManager;
