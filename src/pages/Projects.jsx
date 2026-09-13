import { useState } from "react";
import Reveal from "../components/Reveal";
import "./Projects.css";
import { useProjects } from "../hooks/useRentalKingData";
import { useContacts } from "../hooks/useContacts";
import { contactLinks } from "../lib/contactLinks";
import { Link } from "react-router-dom";
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const WhatsappIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.52 0 .2 5.31.2 11.85c0 2.09.55 4.14 1.59 5.94L0 24l6.38-1.67a11.83 11.83 0 0 0 5.67 1.45h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.16-1.23-6.13-3.39-8.45z" />
  </svg>
);
const CallIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L9.1 10.9a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ProjectRow = ({ project, index }) => {
  const reversed = index % 2 === 1;
  const [activeImage, setActiveImage] = useState(0);
  const { data: contacts } = useContacts();
  const links = contactLinks(contacts);
  const gallery = project.images?.length
    ? project.images
    : ["https://placehold.co/1200x700?text=No+Image"];

  return (
    <div className={`rk-upc__row${reversed ? " rk-upc__row--rev" : ""}`}>
      <div className="rk-upc__rail">
        <span className="rk-upc__dot" />
        <span className="rk-upc__railline" aria-hidden="true" />
      </div>

      <Reveal direction="up" className="rk-upc__media">
        <div className="rk-upc__imgwrap">
          <img
            src={gallery[activeImage]}
            alt={project.name}
            loading="lazy"
          />
          {project.categories?.length > 0 && (
            <div className="rk-upc__cats">
              {project.categories.map((c) => (
                <span key={c} className="rk-upc__cat">{c}</span>
              ))}
            </div>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="rk-upc__thumbs">
            {gallery.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={`rk-upc__thumb ${i === activeImage ? "is-active" : ""}`}
                onClick={() => setActiveImage(i)}
              >
                <img src={src} alt={`${project.name} photo ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal direction="up" delay={80} className="rk-upc__content">
        <h3 className="rk-upc__name">{project.name}</h3>

        <p className="rk-upc__desc">
          {project.description}
        </p>

        <div className="rk-upc__actions">
          <Link to="/contact" className="rk-upc__cta">
            Enquire Now
            <ArrowIcon />
          </Link>

          {links && (
            <>
              <a
                href={links.waText(`Hi RentalKing,\n\nI'm interested in this project.\n\nProject: ${project.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rk-upc__cta rk-upc__cta--whatsapp"
              >
                <WhatsappIcon />
                WhatsApp
              </a>

              <a href={links.tel} className="rk-upc__cta rk-upc__cta--call">
                <CallIcon />
                Call
              </a>
            </>
          )}
        </div>
      </Reveal>
    </div>
  );
};

const Projects = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useProjects();

  return (
    <section className="rk-upc">
      <div className="rk-upc__inner">

        <div className="rk-upc__head">
          <Reveal direction="up">
            <span className="rk-upc__eyebrow">
              On The Horizon
            </span>
          </Reveal>

          <Reveal direction="up" delay={60}>
            <h2 className="rk-upc__heading">
              Projects
            </h2>
          </Reveal>

          <Reveal direction="up" delay={120}>
            <p className="rk-upc__intro">
              Whether you're investing for returns or looking for a place
              to call home, we partner with the best in the industry to
              get you there.
            </p>
          </Reveal>
        </div>

        <div className="rk-upc__list">

          {isLoading && (
            <div className="rk-upc__loading">
              Loading projects...
            </div>
          )}

          {isError && (
            <div className="rk-upc__loading">
              Failed to load projects.
            </div>
          )}

          {!isLoading &&
            !isError &&
            projects.map((project, index) => (
              <ProjectRow
                key={project._id}
                project={project}
                index={index}
              />
            ))}

        </div>

      </div>
    </section>
  );
};

export default Projects;
