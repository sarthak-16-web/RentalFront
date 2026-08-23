import { useEffect, useState } from "react";
import { useContacts, useUpdateContacts } from "../hooks/useContacts";
import "./AdminManager.css";

const emptyForm = { phone: "", whatsapp: "", email: "", address: "" };

const ContactSettings = () => {
  const { data: contacts, isLoading } = useContacts();
  const updateContacts = useUpdateContacts();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (contacts) {
      setForm({
        phone: contacts.phone || "",
        whatsapp: contacts.whatsapp || "",
        email: contacts.email || "",
        address: contacts.address || "",
      });
    }
  }, [contacts]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await updateContacts.mutateAsync(form);
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
              <label>Phone (display format)</label>
              <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 93006 53927" />
            </div>
            <div className="rk-amgr__field">
              <label>WhatsApp (digits only, with country code)</label>
              <input name="whatsapp" required value={form.whatsapp} onChange={handleChange} placeholder="919584484496" />
            </div>
          </div>

          <div className="rk-amgr__row rk-amgr__row--2">
            <div className="rk-amgr__field">
              <label>Email</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="rentalking101@gmail.com" />
            </div>
            <div className="rk-amgr__field">
              <label>Address (optional)</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="211, NRK BIZ PARK, PU 4, Behind C21 mall, Indore" />
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