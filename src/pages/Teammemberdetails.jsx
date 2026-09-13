import { useTeam } from "../hooks/useRentalKingData";
import { useDirectorMessage } from "../hooks/useDirectorMessage";
import Reveal from "../components/Reveal";
import "./Teammemberdetails.css";

const TeamCard = ({ member, delay }) => (
  <Reveal direction="up" delay={delay}>
    <div className="rk-tmd__card">
      <div className="rk-tmd__card-photo">
        <img src={member.photo} alt={member.name} />
      </div>
      <div className="rk-tmd__card-body">
        <h4>{member.name}</h4>
        <p className="rk-tmd__card-role">{member.role}</p>
        <p className="rk-tmd__card-blurb">{member.blurb}</p>
      </div>
    </div>
  </Reveal>
);

const TeamMemberDetails = () => {
  const { data: members = [] } = useTeam();
  const { data: director } = useDirectorMessage();

  return (
    <div className="rk-tmd">
      <div className="rk-tmd__header">
        <Reveal direction="up">
          <p className="rk-tmd__eyebrow">Meet the Team</p>
          <h1>
            The People Behind <em>RentalKing</em>
          </h1>
          <p className="rk-tmd__sub">
            Every listing, every deal, every conversation goes through real
            people — here's who you'll actually be working with.
          </p>
        </Reveal>
      </div>

      {director && (
        <div className="rk-tmd__director">
          <Reveal direction="up" className="rk-tmd__director-photo">
            <img src={director.photo} alt={director.name} />
          </Reveal>
          <Reveal direction="up" delay={80} className="rk-tmd__director-content">
            <p className="rk-tmd__director-label">Director's Message</p>
            {director.message.split("\n\n").map((para, i) => (
              <p className="rk-tmd__director-message" key={i}>
                {para}
              </p>
            ))}
            <p className="rk-tmd__director-name">{director.name}</p>
            <p className="rk-tmd__director-role">{director.role}</p>
          </Reveal>
        </div>
      )}

      <div className="rk-tmd__grid-section">
        <Reveal direction="up">
          <h2 className="rk-tmd__grid-heading">The Rest of the Team</h2>
        </Reveal>
        <div className="rk-tmd__grid">
          {members.map((member, i) => (
            <TeamCard key={member._id} member={member} delay={i * 80} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
