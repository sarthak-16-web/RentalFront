export const FACET_DIMS = ["location", "category", "status", "furnishing", "bhk"];

export const cityOf = (p) => p.location?.split(",").pop()?.trim();

export const matches = (p, sel) => {
  if (sel.location.length && !sel.location.includes(cityOf(p))) return false;
  if (sel.category.length && !sel.category.includes(p.category)) return false;
  if (sel.status.length && !sel.status.includes(p.status)) return false;
  if (sel.furnishing.length && !sel.furnishing.includes(p.furnishing)) return false;
  if (sel.bhk.length && !sel.bhk.includes(p.bhk)) return false;
  return true;
};

// After any selection change, drop selected values that no longer match any
// listing given the other selections (e.g. status "Co Working" kills a
// selected "Plot" category, since plots are For Sale only).
export const repairSelections = (properties, selections) => {
  let next = { ...selections };
  for (const dim of FACET_DIMS) {
    const sel = next[dim];
    if (!sel || !sel.length) continue;
    const viable = sel.filter((v) =>
      properties.some((p) => matches(p, { ...next, [dim]: [v] }))
    );
    if (viable.length !== sel.length) next = { ...next, [dim]: viable };
  }
  return next;
};