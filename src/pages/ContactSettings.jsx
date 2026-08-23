import { useEffect, useState } from "react";
import { useContacts, useUpdateContacts } from "../hooks/useContacts";
import "./AdminManager.css";

const emptyForm = { phone: "", whatsapp: "", email: "", address: "" };

// Both phone and whatsapp are stored with a leading "91" country code; the
// admin only ever types the 10-digit local number, so strip it back off for
// editing and re-add it (in the right shape) on save.
const last10Digits = (value) => (value || "").replace(/\D/g, "").slice(-10);

const formatPhone = (digits10) =>
  digits10.length === 10 ? `+91 ${digits10.slice(0, 5)} ${digits10.slice(5)}` : "";

const formatWhatsapp = (digits10) => (digits10.length === 10 ? `91${digits10}` : "");

const ContactSettings = () => {
  const { data: contacts, isLoading } = useContacts();
  const updateContacts = useUpdateContacts();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (contacts) {
      setForm({
        phone: last10Digits(contacts.phone),
        whatsapp: last10Digits(contacts.whatsapp),
        email: contacts.email || "",
        address: contacts.address || "",
      });
    }
  }, [contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "whatsapp") {
      setForm({ ...form, [name]: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.phone.length !== 10) return setError("Phone must be a 10-digit number.");
    if (form.whatsapp.length !== 10) return setError("WhatsApp must be a 10-digit number.");

    try {
      await updateContacts.mutateAsync({
        ...form,
        phone: formatPhone(form.phone),
        whatsapp: formatWhatsapp(form.whatsapp),
      });
      setSuccess("Contact details saved. They are live across the site.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div className="rk-amgr__head">
        <h2>Contact Details</h2>
      </div>

      {error && <div className="rk-amgr__msg rk-amgr__msg--error">{error}</div>}
      {success && <div className="rk-amgr__msg rk-amgr__msg--success">{success}</div>}

      {isLoading && !contacts ? (
        <div className="rk-amgr__empty">Loading...</div>
      ) : (
        <form className="rk-amgr__form" onSubmit={handleSubmit}>
          <h3>Site-wide contact info</h3>
          <p className="rk-amgr__hint">
            These appear in the navbar, footer, contact page, property pages and legal pages.
          </p>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Phone</label>
              <div className="rk-amgr__prefixed-input">
                <span>+91</span>
                <input
                  name="phone"
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9300653927"
                />
              </div>
            </div>
            <div className="rk-amgr__field">
              <label>WhatsApp</label>
              <div className="rk-amgr__prefixed-input">
                <span>+91</span>
                <input
                  name="whatsapp"
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="9584484496"
                />
              </div>
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="rentalking101@gmail.com" />
            </div>
            <div className="rk-amgr__field">
              <label>Address</label>
              <input name="address" required value={form.address} onChange={handleChange} placeholder="211, NRK BIZ PARK, PU 4, Behind C21 mall, Indore" />
            </div>
          </div>

          <div className="rk-amgr__actions">
            <button type="submit" className="rk-amgr__save" disabled={updateContacts.isPending}>
              {updateContacts.isPending ? "Saving..." : "Save Contact Details"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactSettings;