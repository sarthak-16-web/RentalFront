export const parseArea = (s) => {
  const m = String(s || "").match(/\d[\d,]*/);
  return m ? Number(m[0].replace(/,/g, "")) : null;
};

export const computeSpan = (list, pick) => {
  const values = list
    .map(pick)
    .filter((v) => typeof v === "number" && Number.isFinite(v));
  if (!values.length) return { min: null, max: null };
  return { min: Math.min(...values), max: Math.max(...values) };
};