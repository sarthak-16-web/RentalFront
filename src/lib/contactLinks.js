export const contactLinks = (contacts) => {
  if (!contacts) return null;
  const phone = (contacts.phone ?? "").trim();
  const whatsapp = (contacts.whatsapp ?? "").trim();
  const email = (contacts.email ?? "").trim();
  return {
    tel: phone ? `tel:${phone.replace(/\s/g, "")}` : null,
    wa: whatsapp ? `https://wa.me/${whatsapp}` : null,
    waText: (text) =>
      whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}` : null,
    mailto: email ? `mailto:${email}` : null,
  };
};