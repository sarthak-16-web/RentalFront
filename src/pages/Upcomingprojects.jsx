import Reveal from "../components/Reveal";
import "./Upcomingprojects.css";
import { useProjects } from "../hooks/useRentalKingData";
import { Link, useLocation , useNavigate } from "react-router-dom";
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UnitsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="9" width="7" height="12" />
    <rect x="14" y="4" width="7" height="17" />
    <path
      d="M6 13h1M6 16h1M17 8h1M17 11h1M17 14h1"
      strokeLinecap="round"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path
      d="M3 10h18M8 3v4M16 3v4"
      strokeLinecap="round"
    />
  </svg>
);

const ProjectRow = ({ project, index }) => {
  const reversed = index % 2 === 1;

  return (
    <div className={`rk-upc__row${reversed ? " rk-upc__row--rev" : ""}`}>
      <div className="rk-upc__rail">
        <span className="rk-upc__dot" />
        <span className="rk-upc__railline" aria-hidden="true" />
      </div>

      <Reveal direction="up" className="rk-upc__media">
        <div className="rk-upc__imgwrap">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
          />
        </div>
      </Reveal>

      <Reveal direction="up" delay={80} className="rk-upc__content">
        <span className="rk-upc__location">{project.location}</span>

        <h3 className="rk-upc__name">{project.name}</h3>

        <p className="rk-upc__desc">
          {project.description}
        </p>

        <div className="rk-upc__meta">
          <span className="rk-upc__meta-item">
            <CalendarIcon />
            Est. Completion&nbsp;
            <strong>{project.completion}</strong>
          </span>

          <span className="rk-upc__meta-item">
            <UnitsIcon />
            <strong>{project.units}</strong>&nbsp;Units
          </span>
        </div>

        <Link to="/contact" className="rk-upc__cta">
          Connect
          <ArrowIcon />
        </Link>
      </Reveal>
    </div>
  );
};

const UpcomingProjects = () => {
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
              Upcoming Projects
            </h2>
          </Reveal>

          <Reveal direction="up" delay={120}>
            <p className="rk-upc__intro">
              Developments currently under construction across the city,
              ordered by expected handover — reserve early for the best
              pricing and unit selection.
            </p>
          </Reveal>
        </div>

        <div className="rk-upc__list">

          {isLoading && (
            <div className="rk-upc__loading">
              Loading upcoming projects...
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

export default UpcomingProjects;