import "./ReadOnlyRange.css";

const ReadOnlyRange = ({ label, unit = "", min, max, action }) => {
  if (min == null || max == null) return null;
  return (
    <div className="rk-range-ro">
      <div className="rk-range-ro__head">
        <span className="rk-range-ro__labels">{label}</span>
        {action}
      </div>
      <div className="rk-range-ro__values">
        <span>{unit}{min.toLocaleString("en-IN")}</span>
        <span>{unit}{max.toLocaleString("en-IN")}</span>
      </div>
      <div className="rk-range-ro__track-wrap">
        <div className="rk-range-ro__track" />
        <div className="rk-range-ro__fill" />
      </div>
    </div>
  );
};

export default ReadOnlyRange;