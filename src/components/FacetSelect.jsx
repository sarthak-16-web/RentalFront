import { useEffect, useRef, useState } from "react";
import "./FacetSelect.css";

const FacetSelect = ({ label, selected = [], options, onToggle }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  if (options.length === 0 && selected.length === 0) return null;

  return (
    <div className="rk-facet" ref={rootRef}>
      <button
        type="button"
        className={`rk-facet__btn ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="rk-facet__label">
          {selected.length > 0 ? selected.join(" + ") : label}
        </span>
        {selected.length > 0 && (
          <span className="rk-facet__count">{selected.length}</span>
        )}
      </button>
      {open && (
        <div className="rk-facet__panel">
          {options.map((o) => (
            <label key={o} className="rk-facet__opt">
              <input
                type="checkbox"
                checked={selected.includes(o)}
                onChange={() => onToggle(o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacetSelect;