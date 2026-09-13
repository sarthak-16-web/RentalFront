import { useEffect, useState } from "react";
import { getAllAssets } from "../api/adminResourceApi";
import "./AssetPicker.css";

// Single mode: value is a URL string (or "").
// Multiple mode: value is an array of URL strings.
const AssetPicker = ({ value, onChange, multiple = false }) => {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    getAllAssets()
      .then((data) => setAssets(data || []))
      .catch(() => setError("Failed to load assets."))
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const selectedUrls = multiple ? value || [] : value ? [value] : [];

  const pick = (asset) => {
    if (multiple) {
      const already = selectedUrls.includes(asset.url);
      onChange(
        already
          ? selectedUrls.filter((u) => u !== asset.url)
          : [...selectedUrls, asset.url]
      );
    } else {
      onChange(asset.url);
      setOpen(false);
    }
  };

  const removeAt = (url) => onChange(selectedUrls.filter((u) => u !== url));

  return (
    <div className="rk-apicker">
      <div className="rk-apicker__selected">
        {selectedUrls.length === 0 ? (
          <span className="rk-apicker__empty">No image selected</span>
        ) : (
          selectedUrls.map((url) => (
            <div key={url} className="rk-apicker__thumb">
              <img src={url} alt="" />
              {multiple && (
                <button type="button" onClick={() => removeAt(url)} aria-label="Remove">×</button>
              )}
            </div>
          ))
        )}
      </div>

      <button type="button" className="rk-apicker__trigger" onClick={() => setOpen(true)}>
        {selectedUrls.length > 0 ? "Change" : "Choose"} from Assets
      </button>

      {open && (
        <div className="rk-apicker__backdrop" onClick={() => setOpen(false)}>
          <div className="rk-apicker__modal" onClick={(e) => e.stopPropagation()}>
            <div className="rk-apicker__modal-head">
              <h3>Choose {multiple ? "Images" : "an Image"}</h3>
              <button type="button" className="rk-apicker__close" onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>

            {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}

            {loading ? (
              <div className="rk-amgr__empty">Loading...</div>
            ) : assets.length === 0 ? (
              <div className="rk-amgr__empty">No assets uploaded yet. Add some from the Assets tab.</div>
            ) : (
              <div className="rk-apicker__grid">
                {assets.map((a) => {
                  const selected = selectedUrls.includes(a.url);
                  return (
                    <button
                      type="button"
                      key={a._id}
                      className={`rk-apicker__tile${selected ? " is-selected" : ""}`}
                      onClick={() => pick(a)}
                    >
                      <img src={a.url} alt={a.name} />
                      <p>{a.name}</p>
                      {selected && <span className="rk-apicker__check">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {multiple && (
              <div className="rk-amgr__actions">
                <button type="button" className="rk-amgr__save" onClick={() => setOpen(false)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetPicker;
