import { useState } from "react";
import { useContacts } from "../hooks/useContacts";
import { contactLinks } from "../lib/contactLinks";
import "./Contactus.css";

/* ----------------------------------------------------------------
   On submit, we just build a wa.me link with the filled-in details
   and open WhatsApp (app or web) in a new tab/window. The user
   still has to hit "Send" inside WhatsApp themselves — nothing is
   sent automatically from here, so no backend / EmailJS needed.
------------------------------------------------------------------- */

const buildWhatsappLink = (links, form) => {
  const text =
    `New Contact Form Submission\n\n` +
    `Name: ${form.name}\n` +
    (form.email ? `Email: ${form.email}\n` : "") +
    `Subject: ${form.subject}\n` +
    `Message: ${form.message}`;
  return links.waText(text);
};

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

// This page shows the WhatsApp number as the "Call Us" number too (not the
// separate site phone number), so format it the same way phone numbers are
// displayed elsewhere: "+91 XXXXX XXXXX" with a matching tel: link.
const whatsappAsPhone = (whatsapp) => {
  const digits = (whatsapp || "").replace(/\D/g, "");
  const local = digits.startsWith("91") ? digits.slice(2) : digits;
  if (local.length !== 10) return null;
  return {
    display: `+91 ${local.slice(0, 5)} ${local.slice(5)}`,
    tel: `tel:+91${local}`,
  };
};

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const CheckIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const FileTextIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4Z" />
  </svg>
);
const SmileIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);
const PencilIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const SERVICES = [
  { icon: CalendarIcon, title: "Property Visits", text: "Scheduled site visits with a team member who knows the property inside out." },
  { icon: FileTextIcon, title: "Legal Support", text: "Documentation, agreements, and legal checks handled end-to-end." },
  { icon: ShieldIcon, title: "Peaceful Possession", text: "We ensure a smooth, dispute-free handover from day one." },
  { icon: SmileIcon, title: "Hassle-Free Experience", text: "From search to move-in, we coordinate everything so you don't have to." },
  { icon: PencilIcon, title: "In-House Architect Support", text: "Get design and layout guidance from our in-house architecture team." },
];

const SUBJECTS = ["General Inquiry", "Property Enquiry", "List a Property", "Support"];

const ContactUs = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const { data: contacts } = useContacts();
  const links = contactLinks(contacts);
  const whatsappPhone = whatsappAsPhone(contacts?.whatsapp);

  const INFO_CARDS = [
    { icon: PhoneIcon, label: "Call Us", value: whatsappPhone?.display ?? null, href: whatsappPhone?.tel ?? null },
    { icon: MailIcon, label: "Email Us", value: contacts?.email ?? null, href: links?.mailto ?? null },
    { icon: PinIcon, label: "Visit Us", value: contacts?.address ?? null, href: null },
    { icon: ClockIcon, label: "Office Hours", value: "Mon – Sat, 9:00 AM – 7:00 PM", href: null },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!links?.wa) return;
    // Open WhatsApp with the message pre-filled. User still has to
    // hit Send inside WhatsApp themselves.
    window.open(buildWhatsappLink(links, form), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setForm(EMPTY_FORM);
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="rk-contact">
      <div className="rk-contact__header">
        <div className="rk-contact__roofline" aria-hidden="true">
          <svg viewBox="0 0 1200 260" preserveAspectRatio="none">
            <path
              d="M0 260V150l40-30 40 20V90l50-40 50 40v60l40-20 40 25V60l60-45 60 45v90l45-25 45 25v40l55-35 55 35v20l50-30 50 30v-60l60-40 60 40v100l40-15 40 20V90l55-45 55 45v130l45-20 45 20v40Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="rk-contact__header-inner">
          <p className="rk-contact__eyebrow">Get in touch</p>
          <h1>Our Services</h1>
          <p className="rk-contact__sub">
            We offer a variety of services built around the full life of a
            property, not just the transaction — from the first site visit
            through legal paperwork, handover, and settling in. Whatever
            stage you're at, there's a team behind you for it.
          </p>
        </div>
      </div>

      <section className="rk-services">
        <div className="rk-services__inner">
          <div className="rk-services__grid">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="rk-scard">
                  <span className="rk-scard__icon"><Icon /></span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="rk-contact__body">
        <div className="rk-contact__grid">
          {/* Left: info cards */}
          <div className="rk-contact__info">
            {INFO_CARDS.filter((c) => c.value).map((c) => {
              const Icon = c.icon;
              const content = (
                <>
                  <span className="rk-info-card__icon"><Icon /></span>
                  <div>
                    <p className="rk-info-card__label">{c.label}</p>
                    <p className="rk-info-card__value">{c.value}</p>
                  </div>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} className="rk-info-card">{content}</a>
              ) : (
                <div key={c.label} className="rk-info-card">{content}</div>
              );
            })}
          </div>

          {/* Right: form card */}
          <div className="rk-contact__form-card">
            {submitted ? (
              <div className="rk-contact__success">
                <span className="rk-contact__success-icon"><CheckIcon /></span>
                <h3>Almost done!</h3>
                <p>We opened WhatsApp with your message filled in — just hit send there.</p>
                <button type="button" onClick={handleSendAnother}>
                  Fill another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="rk-contact__form-title">Send us a message</h3>

                <div className="rk-contact__row rk-contact__row--2">
                  <div className="rk-contact__field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="rk-contact__field">
                    <label htmlFor="email">Email (optional)</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="rk-contact__field">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="" disabled>Choose one</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="rk-contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about what you need..."
                  />
                </div>

                <button type="submit" className="rk-contact__submit">
                  <SendIcon /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;