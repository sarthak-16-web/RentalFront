import Reveal from "../components/Reveal";
import "./Upcomingprojects.css";

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UnitsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="9" width="7" height="12"/>
    <rect x="14" y="4" width="7" height="17"/>
    <path d="M6 13h1M6 16h1M17 8h1M17 11h1M17 14h1" strokeLinecap="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="5" width="18" height="16" rx="2"/>
    <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round"/>
  </svg>
);

// TEMPORARY mock data — mirrors projectModel.js exactly. Swap for /api/projects.
const MOCK_PROJECTS = [
  {
    _id: "up1",
    name: "The Aravalli Crest",
    location: "Napier Town, Jabalpur",
    completion: "Q4 2026",
    units: 84,
    image: "https://picsum.photos/seed/rk-upc-1/1600/1100",
    description:
      "A 14-storey residential landmark of two- and three-bedroom homes set around a private podium garden, designed for families who want the city close but never crowded.",
  },
  {
    _id: "up2",
    name: "Vijay Nagar Business Court",
    location: "Vijay Nagar, Jabalpur",
    completion: "Q2 2027",
    units: 52,
    image: "https://picsum.photos/seed/rk-upc-2/1600/1100",
    description:
      "Grade-A office suites and retail frontage on the Vijay Nagar high street, built for firms that want signage visibility and column-free floor plates.",
  },
  {
    _id: "up3",
    name: "Arera Greens Residency",
    location: "Arera Colony, Jabalpur",
    completion: "Q3 2027",
    units: 120,
    image: "https://picsum.photos/seed/rk-upc-3/1600/1100",
    description:
      "A gated low-rise community of 1, 2 and 3 BHK apartments wrapped around a central lawn, clubhouse and running track — quiet streets, five minutes from the market.",
  },
  {
    _id: "up4",
    name: "Wright Town Exchange",
    location: "Wright Town, Jabalpur",
    completion: "Q1 2028",
    units: 38,
    image: "https://picsum.photos/seed/rk-upc-4/1600/1100",
    description:
      "A mixed-use address pairing ground-floor commercial units with boutique managed offices above, positioned for businesses that trade on foot traffic.",
  },
];

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
          <img src={project.image} alt={project.name} loading="lazy" />
        </div>
      </Reveal>

      <Reveal direction="up" delay={80} className="rk-upc__content">
        <span className="rk-upc__location">{project.location}</span>
        <h3 className="rk-upc__name">{project.name}</h3>
        <p className="rk-upc__desc">{project.description}</p>

        <div className="rk-upc__meta">
          <span className="rk-upc__meta-item">
            <CalendarIcon /> Est. Completion&nbsp;<strong>{project.completion}</strong>
          </span>
          <span className="rk-upc__meta-item">
            <UnitsIcon /> <strong>{project.units}</strong>&nbsp;Units
          </span>
        </div>

        <a href="/contact "className="rk-upc__cta">
          Connect<ArrowIcon />
        </a>
      </Reveal>
    </div>
  );
};

const UpcomingProjects = () => {
  return (
    <section className="rk-upc">
      <div className="rk-upc__inner">
        <div className="rk-upc__head">
          <Reveal direction="up">
            <span className="rk-upc__eyebrow">On The Horizon</span>
          </Reveal>
          <Reveal direction="up" delay={60}>
            <h2 className="rk-upc__heading">Upcoming Projects</h2>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <p className="rk-upc__intro">
              Developments currently under construction across Jabalpur,
              ordered by expected handover — reserve early for the best
              pricing and unit selection.
            </p>
          </Reveal>
        </div>

        <div className="rk-upc__list">
          {MOCK_PROJECTS.map((project, i) => (
            <ProjectRow project={project} index={i} key={project._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjects;
