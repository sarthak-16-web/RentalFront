import { useState } from "react";
import "./Legalpage.css";
import AccordionSection from "./Accordionsection";

const LAST_UPDATED = "August 1, 2026";

const GROUPS = [
  {
    id: "privacy",
    label: "Privacy Policy",
    sections: [
      {
        id: "privacy-overview",
        heading: "Overview",
        body: (
          <p>
            RentalKing ("we," "us," "our") helps property owners, tenants,
            buyers, builders, and partner agents connect for rentals, sales,
            and related services. This section explains what personal
            information we collect when you use our website or contact us,
            why we collect it, and the choices you have.
          </p>
        ),
      },
      {
        id: "privacy-info-collected",
        heading: "Information We Collect",
        body: (
          <>
            <p>We collect information in the following ways:</p>
            <ul>
              <li>
                <strong>Information you provide directly</strong> — your
                name, phone number, email address, and any message content
                when you fill out a form (Contact Us, Partner/Collaboration
                inquiry, property listing request, or similar).
              </li>
              <li>
                <strong>Property-related details</strong> — if you list a
                property with us, information about that property (location,
                rent/price, photos, ownership documents where applicable).
              </li>
              <li>
                <strong>Usage information</strong> — pages visited, browser
                type, device type, and general location (city/region)
                collected automatically to help us understand how the site
                is used.
              </li>
              <li>
                <strong>Cookies</strong> — see the{" "}
                <a href="#cookies-what">Cookie Policy</a> section below.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "privacy-how-used",
        heading: "How We Use Your Information",
        body: (
          <ul>
            <li>To respond to inquiries submitted through our Contact or Partner forms.</li>
            <li>To connect property owners, tenants, buyers, and partners with each other.</li>
            <li>To send updates about your inquiry, listing, or partnership status.</li>
            <li>To improve our website, services, and the accuracy of listings.</li>
            <li>To meet legal, regulatory, or contractual obligations.</li>
          </ul>
        ),
      },
      {
        id: "privacy-sharing",
        heading: "How We Share Information",
        body: (
          <>
            <p>
              We do not sell your personal information. We may share it in
              limited circumstances:
            </p>
            <ul>
              <li>
                With relevant counterparties necessary to complete a
                transaction — for example, sharing a tenant's contact details
                with a property owner they've expressed interest in, or vice versa.
              </li>
              <li>
                With service providers who help us operate the website (e.g.
                email delivery, hosting) under confidentiality obligations.
              </li>
              <li>Where required by law, regulation, or a valid legal request.</li>
            </ul>
          </>
        ),
      },
      {
        id: "privacy-retention",
        heading: "Data Retention & Security",
        body: (
          <p>
            We keep inquiry and listing information for as long as needed to
            provide our services and meet legal requirements, and use
            reasonable technical and organizational measures to protect it.
            No method of transmission or storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
        ),
      },
      {
        id: "privacy-rights",
        heading: "Your Choices & Rights",
        body: (
          <ul>
            <li>Request a copy of the personal information we hold about you.</li>
            <li>Ask us to correct inaccurate information.</li>
            <li>Ask us to delete your information, subject to legal or contractual limits.</li>
            <li>Opt out of non-essential email communication at any time.</li>
          </ul>
        ),
      },
      {
        id: "privacy-children",
        heading: "Children's Privacy",
        body: (
          <p>
            Our services are intended for individuals aged 18 and older. We do
            not knowingly collect information from minors.
          </p>
        ),
      },
    ],
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    sections: [
      {
        id: "terms-acceptance",
        heading: "Acceptance of Terms",
        body: (
          <p>
            By accessing or using the RentalKing website ("Site") or its
            services, you agree to be bound by these Terms & Conditions. If
            you do not agree, please do not use the Site.
          </p>
        ),
      },
      {
        id: "terms-who-we-are",
        heading: "About RentalKing",
        body: (
          <p>
            RentalKing is a platform that connects property owners, builders
            and developers, tenants, buyers, real estate agents, and
            financial partners. We facilitate introductions and provide
            listing, marketing, and support services — we are not a party to
            the rental, sale, or financing agreement itself unless explicitly
            stated in a separate written contract.
          </p>
        ),
      },
      {
        id: "terms-eligibility",
        heading: "Eligibility",
        body: (
          <p>
            You must be at least 18 years old and legally capable of
            entering into binding contracts to use our services. By
            submitting a form on this Site, you confirm the information
            provided is accurate and that you have the authority to provide
            it (e.g. as the property owner, an authorized agent, or an
            interested tenant/buyer).
          </p>
        ),
      },
      {
        id: "terms-listings",
        heading: "Property Listings & Accuracy",
        body: (
          <ul>
            <li>
              Property owners and builders are responsible for the accuracy
              of information they submit — including price, availability,
              and ownership status.
            </li>
            <li>
              RentalKing does not independently verify every listing detail
              and is not liable for inaccuracies, delays, or
              misrepresentations made by a listing party.
            </li>
            <li>
              We reserve the right to remove any listing that appears
              fraudulent, misleading, or in violation of these terms.
            </li>
          </ul>
        ),
      },
      {
        id: "terms-partners",
        heading: "Partner & Collaboration Terms",
        body: (
          <p>
            Builders, agents, and financial partners who submit a
            partnership inquiry agree that any resulting collaboration is
            subject to a separate written partnership agreement, which will
            detail commission structure, responsibilities, and duration.
            Submitting an inquiry form does not by itself create a binding
            partnership.
          </p>
        ),
      },
      {
        id: "terms-fees",
        heading: "Fees & Commissions",
        body: (
          <p>
            Any listing fees, commissions, or charges applicable to a
            specific transaction will be communicated clearly and in writing
            before you are asked to pay. We do not charge upfront listing
            fees for standard property listings unless otherwise agreed.
          </p>
        ),
      },
      {
        id: "terms-conduct",
        heading: "Acceptable Use",
        body: (
          <ul>
            <li>Do not submit false, misleading, or fraudulent information.</li>
            <li>Do not use the Site to harass, spam, or defraud other users.</li>
            <li>Do not attempt to interfere with the Site's security or normal operation.</li>
          </ul>
        ),
      },
      {
        id: "terms-liability",
        heading: "Limitation of Liability",
        body: (
          <p>
            RentalKing acts as a facilitator between parties and is not
            responsible for disputes, losses, or damages arising from
            transactions, agreements, or communications between users. To
            the extent permitted by law, our liability for any claim related
            to the Site or our services is limited to the amount (if any)
            you paid us directly for the specific service in question.
          </p>
        ),
      },
      {
        id: "terms-ip",
        heading: "Intellectual Property",
        body: (
          <p>
            All content on this Site — including text, graphics, and the
            RentalKing name and logo — belongs to RentalKing or its
            licensors and may not be copied or reused without permission,
            except for property photos and details submitted by listing
            owners, which remain their property.
          </p>
        ),
      },
      {
        id: "terms-governing-law",
        heading: "Termination & Governing Law",
        body: (
          <p>
            We may suspend or terminate access to our services for any user
            who violates these terms, without prior notice. These terms are
            governed by the laws of India, and any disputes will be subject
            to the jurisdiction of the courts in Indore, Madhya Pradesh.
          </p>
        ),
      },
    ],
  },
  {
    id: "cookies",
    label: "Cookie Policy",
    sections: [
      {
        id: "cookies-what",
        heading: "What Are Cookies",
        body: (
          <p>
            Cookies are small text files stored on your device when you
            visit a website. They help the site remember information about
            your visit, which can make it easier to use and can help us
            understand how visitors use the Site.
          </p>
        ),
      },
      {
        id: "cookies-how-used",
        heading: "How RentalKing Uses Cookies",
        body: (
          <table className="rk-legal__table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Purpose</th>
                <th>Can you disable it?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Essential</td>
                <td>Required for basic site functionality, like remembering form inputs during a session.</td>
                <td>No — needed for the Site to work correctly.</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Helps us understand which pages are visited and how, so we can improve the Site.</td>
                <td>Yes — via your browser or cookie preference settings.</td>
              </tr>
              <tr>
                <td>Functional</td>
                <td>Remembers preferences such as previously viewed properties or filters.</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        id: "cookies-third-party",
        heading: "Third-Party Cookies",
        body: (
          <p>
            Some features on our Site — such as embedded maps or analytics
            tools — may set their own cookies. We don't control these
            third-party cookies directly; please refer to the respective
            provider's own cookie policy for details.
          </p>
        ),
      },
      {
        id: "cookies-managing",
        heading: "Managing Cookies",
        body: (
          <>
            <p>Most browsers let you control cookies through their settings. You can typically:</p>
            <ul>
              <li>View which cookies are stored and delete them individually.</li>
              <li>Block third-party cookies.</li>
              <li>Block all cookies from all sites.</li>
              <li>Delete all cookies when you close your browser.</li>
            </ul>
            <p>
              Note that blocking essential cookies may affect how parts of
              the Site function, such as form submissions.
            </p>
          </>
        ),
      },
    ],
  },
];

// First section open by default so the page doesn't look empty on load.
const DEFAULT_OPEN_IDS = ["privacy-overview"];

const LegalPage = () => {
  const [openIds, setOpenIds] = useState(() => new Set(DEFAULT_OPEN_IDS));

  const toggleSection = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // TOC click: make sure the target section is open before the browser's
  // native hash-scroll runs, so you don't jump to a collapsed panel.
  const handleTocClick = (id) => {
    setOpenIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="rk-legal">
      <div className="rk-legal__header">
        <p className="rk-legal__eyebrow">Legal</p>
        <h1>Privacy, Terms &amp; Cookies</h1>
        <p className="rk-legal__intro">
          Everything about how RentalKing handles your data, the rules for
          using our site, and how we use cookies — all in one place.
        </p>
        <p className="rk-legal__updated">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="rk-legal__body">
        <aside className="rk-legal__sidebar">
          <nav className="rk-legal__toc" aria-label="On this page">
            {GROUPS.map((g) => (
              <div key={g.id} className="rk-legal__toc-group">
                <a href={`#${g.id}`} className="rk-legal__toc-group-label">
                  {g.label}
                </a>
                {g.sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => handleTocClick(s.id)}
                  >
                    {s.heading}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <div className="rk-legal__content">
          {GROUPS.map((g) => (
            <div key={g.id} className="rk-legal__group">
              <h2 id={g.id} className="rk-legal__group-title">{g.label}</h2>
              {g.sections.map((s) => (
                <AccordionSection
                  key={s.id}
                  id={s.id}
                  title={s.heading}
                  open={openIds.has(s.id)}
                  onToggle={() => toggleSection(s.id)}
                >
                  {s.body}
                </AccordionSection>
              ))}
            </div>
          ))}

          <div className="rk-legal__contact-box">
            <h3>Questions about any of this?</h3>
            <p>Reach our team any time — we usually reply within one business day.</p>
            <div className="rk-legal__contact-links">
              <a href="mailto:rentalking101@gmail.com">rentalking101@gmail.com</a>
              <a href="tel:+919300653927">+91 93006 53927</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;