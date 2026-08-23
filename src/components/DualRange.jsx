import "./DualRange.css";

const DualRange = ({ label, unit = "", min, max, step, valueMin, valueMax, onChangeMin, onChangeMax }) => {
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;
  return (
    <div className="rk-drange">
      <div className="rk-drange__labels"><span>{label}</span></div>
      <div className="rk-drange__values">
        <span>{unit}{valueMin.toLocaleString("en-IN")}</span>
        <span>{unit}{valueMax.toLocaleString("en-IN")}</span>
      </div>
      <div className="rk-drange__track-wrap">
        <div className="rk-drange__track" />
        <div className="rk-drange__fill" style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChangeMin(Math.min(Number(e.target.value), valueMax - step))}
          className="rk-drange__input"
          aria-label={`${label} minimum`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => onChangeMax(Math.max(Number(e.target.value), valueMin + step))}
          className="rk-drange__input"
          aria-label={`${label} maximum`}
        />
      </div>
    </div>
  );
};

export default DualRange;