import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contactus.css";

/* ---------- Notification config ----------
   1) Sign up at https://www.emailjs.com (free tier: 200 emails/month)
   2) Add an Email Service (e.g. Gmail) connected to rentalking101@gmail.com
   3) Create an Email Template with variables: name, email, phone, subject, message
   4) Paste your Service ID / Template ID / Public Key below
------------------------------------------------ */
const EMAILJS_SERVICE_ID = "service_08siof8";
const EMAILJS_TEMPLATE_ID = "template_3xcu01a";
const EMAILJS_PUBLIC_KEY = "RnRTEMKPRfdCOwYG";

const WHATSAPP_NUMBER = "919300653927"; // country code + number, no + or spaces

const buildWhatsappLink = (form) => {
  const text = `New Contact Form Submission%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ASubject: ${form.subject}%0AMessage: ${form.message}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

const EMPTY_FORM = { name: "", email: "", phone: "", subject: "", message: "" };

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

const INFO_CARDS = [
  { icon: PhoneIcon, label: "Call Us", value: "+91 93006 53927", href: "tel:+919300653927" },
  { icon: MailIcon, label: "Email Us", value: "rentalking101@gmail.com", href: "rentalking101.com" },
  { icon: PinIcon, label: "Visit Us", value: "211,NRK BIZ PARK,PU 4, Behind C21 mall, Indore", href: null },
  { icon: ClockIcon, label: "Office Hours", value: "Mon – Sat, 9:00 AM – 7:00 PM", href: null },
];

const SUBJECTS = ["General Inquiry", "Property Enquiry", "List a Property", "Support"];

const ContactUs = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      console.log("EmailJS success:", response.status, response.text);
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error("EmailJS failed:", err);
      setError("Couldn't send automatically — tap 'Message us on WhatsApp' below instead.");
    } finally {
      setSending(false);
    }
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
          <h1>Contact &amp; Support</h1>
          <p className="rk-contact__sub">
            Have a question, a property to list, or need help with a rental?
            Our team usually responds within one business day.
          </p>
        </div>
      </div>

      <div className="rk-contact__body">
        <div className="rk-contact__grid">
          {/* Left: info cards */}
          <div className="rk-contact__info">
            {INFO_CARDS.map((c) => {
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
                <h3>Message Sent</h3>
                <p>Thanks for reaching out — our team will get back to you shortly.</p>
                <button type="button" onClick={handleSendAnother}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="rk-contact__form-title">Send us a message</h3>
                {error && <p className="rk-contact__error">{error}</p>}

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
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div className="rk-contact__row rk-contact__row--2">
                  <div className="rk-contact__field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
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

                <button type="submit" className="rk-contact__submit" disabled={sending}>
                  <SendIcon /> {sending ? "Sending..." : "Send Message"}
                </button>

                <a
                  href={buildWhatsappLink(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rk-contact__whatsapp"
                >
                  Message us on WhatsApp instead
                </a>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;