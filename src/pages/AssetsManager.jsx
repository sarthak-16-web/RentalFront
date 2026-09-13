import { useEffect, useRef, useState } from "react";
import { getAllAssets, uploadAsset, deleteAsset } from "../api/adminResourceApi";
import "./AdminManager.css";

const AssetsManager = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const data = await getAllAssets();
      setAssets(data || []);
    } catch {
      setError("Failed to load assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const pickFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name.trim() || !file || uploading) return;

    setUploading(true);
    setError("");
    setSuccess("");
    try {
      await uploadAsset(name.trim(), file);
      setSuccess("Asset uploaded successfully.");
      setName("");
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchAssets();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset? Anything using it will show a broken image.")) return;
    try {
      await deleteAsset(id);
      setSuccess("Asset deleted.");
      fetchAssets();
    } catch {
      setError("Failed to delete asset.");
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Assets</h2>
      </div>

      <p className="rk-amgr__hint">
        Upload images here once, then pick them from the library in Properties, Projects, Team, and Partners.
      </p>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      <form className="rk-amgr__form" onSubmit={handleUpload}>
        <div className="rk-amgr__field">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. skyline-grove-cover"
            required
          />
        </div>

        <div
          className={`rk-amgr__dropzone${dragOver ? " is-dragover" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="rk-amgr__dropzone-preview" />
          ) : (
            <p>Drag an image here, or click to browse</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
        </div>

        <div className="rk-amgr__actions">
          <button type="submit" className="rk-amgr__save" disabled={!name.trim() || !file || uploading}>
            {uploading ? "Uploading..." : "Upload Asset"}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="rk-amgr__empty">Loading...</div>
      ) : assets.length === 0 ? (
        <div className="rk-amgr__empty">No assets uploaded yet.</div>
      ) : (
        <div className="rk-amgr__asset-grid">
          {assets.map((a) => (
            <div key={a._id} className="rk-amgr__asset-tile">
              <img src={a.url} alt={a.name} />
              <p title={a.name}>{a.name}</p>
              <button type="button" className="rk-amgr__delete" onClick={() => handleDelete(a._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsManager;
