import Reveal from "../components/Reveal";
import "./TeamPreview.css";

// Real team data — swap photo URLs for actual headshots when ready.
const TEAM = [
  {
    name: "Mr. Rajesh Maheshwari",
    role: "Founder & CEO",
    blurb: "Visionary behind RentalKing",
    photo: "https://picsum.photos/seed/rk-team-1/400/400",
  },
  {
    name: "Dr. Saloni Maheshwari",
    role: "Project Head",
    blurb: "Leading projects & operations",
    photo: "https://picsum.photos/seed/rk-team-2/400/400",
  },
  {
    name: "Bhushan Thombre",
    role: "Sales Head",
    blurb: "Commercial & residential sales expert",
    photo: "https://picsum.photos/seed/rk-team-3/400/400",
  },
  {
    name: "Anjali Mandre",
    role: "HR Manager",
    blurb: "People & culture at RentalKing",
    photo: "https://picsum.photos/seed/rk-team-4/400/400",
  },
  {
    name: "Ayush Rathor",
    role: "Senior Sales Executive",
    blurb: "Premium property specialist",
    photo: "https://picsum.photos/seed/rk-team-5/400/400",
  },
  {
    name: "Parag Wadkar",
    role: "Sales Executive",
    blurb: "Residential & commercial rentals",
    photo: "https://picsum.photos/seed/rk-team-6/400/400",
  },
];

const TeamPreview = () => {
  return (
    <section className="rk-team">
      <div className="rk-team__inner">
        <Reveal>
          <p className="rk-team__eyebrow">Meet the Team</p>
          <h2 className="rk-team__heading">
            The People Behind <em>RentalKing</em>
          </h2>
          <span className="rk-team__rule" aria-hidden="true" />
        </Reveal>

        <div className="rk-team__grid">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 90} direction="up">
              <div className="rk-team__card">
                <div className="rk-team__photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                <div className="rk-team__body">
                  <h4>{member.name}</h4>
                  <p className="rk-team__role">{member.role}</p>
                  <p className="rk-team__blurb">{member.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <a href="/team" className="rk-team__viewall">
            View full team profiles
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default TeamPreview;
