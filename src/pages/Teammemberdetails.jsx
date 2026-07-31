import { MOCK_TEAM } from "../data/MockTeam";
import Reveal from "../components/Reveal";
import "./Teammemberdetails.css";

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.15 0h3.35v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-6.32c0-1.5-.03-3.44-2.1-3.44-2.1 0-2.42 1.64-2.42 3.33V21H9.35V8.75Z" />
  </svg>
);

const MemberCard = ({ member, reversed }) => (
  <div className={`rk-tmd-row ${reversed ? "rk-tmd-row--reversed" : ""}`}>
    <div className="rk-tmd-row__photo">
      <img src={member.photo} alt={member.name} />
    </div>

    <div className="rk-tmd-row__content">
      <p className="rk-tmd-row__department">{member.department}</p>
      <h2>{member.name}</h2>
      <p className="rk-tmd-row__role">{member.role}</p>

      <div className="rk-tmd-row__stat">
        <span className="rk-tmd-row__stat-num">{member.experience}+</span>
        <span className="rk-tmd-row__stat-label">Years of Experience</span>
      </div>

      <p className="rk-tmd-row__bio">{member.bio}</p>

      <div className="rk-tmd-row__tags">
        {member.specialties.map((s) => (
          <span key={s} className="rk-tmd-row__tag">{s}</span>
        ))}
      </div>

      <div className="rk-tmd-row__contact">
        <a href={`mailto:${member.email}`}><MailIcon /> {member.email}</a>
        <a href={`tel:${member.phone.replace(/\s/g, "")}`}><PhoneIcon /> {member.phone}</a>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon /> LinkedIn
        </a>
      </div>
    </div>
  </div>
);

const TeamMemberDetails = () => {
  return (
    <div className="rk-tmd">
      <div className="rk-tmd__header">
        <p className="rk-tmd__eyebrow">Meet the Team</p>
        <h1>The People Behind <em>RentalKing</em></h1>
        <p className="rk-tmd__sub">
          Every listing, every deal, every conversation goes through real
          people — here's who you'll actually be working with.
        </p>
      </div>

      <div className="rk-tmd__list">
        {MOCK_TEAM.map((member, i) => (
          <MemberCard key={member.id} member={member} reversed={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
};

export default TeamMemberDetails;
