const RECURRING_STATUSES = ["For Rent", "Co Working"];

const trimmed = (n) => {
  const rounded = Math.round(n * 100) / 100;
  return String(rounded);
};

// Builds the same "₹25,000/month" / "₹85 Lakh" / "₹2.1 Crore" style strings
// that used to be admin-typed free text, from priceNumeric + status +
// priceFrequency alone.
export const formatPrice = (priceNumeric, status, priceFrequency) => {
  if (priceNumeric == null || priceNumeric === "") return "";
  const numeric = Number(priceNumeric);
  if (Number.isNaN(numeric)) return "";

  if (RECURRING_STATUSES.includes(status)) {
    const suffix = priceFrequency === "Annual" ? "/year" : "/month";
    return `₹${numeric.toLocaleString("en-IN")}${suffix}`;
  }

  if (numeric >= 10000000) return `₹${trimmed(numeric / 10000000)} Crore`;
  if (numeric >= 100000) return `₹${trimmed(numeric / 100000)} Lakh`;
  return `₹${numeric.toLocaleString("en-IN")}`;
};
