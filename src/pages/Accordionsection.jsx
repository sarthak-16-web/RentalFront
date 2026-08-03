const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Controlled accordion section — parent owns the open/closed state so
 * sidebar TOC links can jump to a section AND expand it at the same time.
 */
const AccordionSection = ({ id, title, open, onToggle, children }) => {
  const panelId = `${id}-panel`;

  return (
    <div
      className={`rk-legal__section rk-legal__section--accordion${open ? " is-open" : ""}`}
      id={id}
    >
      <button
        type="button"
        className="rk-legal__acc-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <h3>{title}</h3>
        <span className="rk-legal__acc-chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      <div className="rk-legal__acc-panel" id={panelId}>
        <div className="rk-legal__acc-panel-inner">{children}</div>
      </div>
    </div>
  );
};

export default AccordionSection;