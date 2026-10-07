import { lazy, Suspense, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { ChurchPhotoStream } from "../hero/ChurchPhotoStream";
import { ScrollReveal } from "../ui/ScrollReveal";
import welcomePhoto from "../../assets/Young Adult Ministry/719789654_956689864036342_2095763987152963926_n.webp";
import attirePhoto from "../../assets/Young Adult Ministry/719532750_956690060702989_7373299191000118107_n.webp";
import childrenPhoto from "../../assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.webp";
import worshipPhoto from "../../assets/Junior Adult Minitry/626386732_906329712047578_6172969032115822277_n.webp";
import mealPhoto from "../../assets/Junior Adult Minitry/724019843_1322877753302746_8993175069316953491_n.webp";

// Draft history stays in the local preview until confirmed milestones are supplied.
const ChurchMilestones = import.meta.env.DEV ? lazy(() => import("../history/ChurchMilestones")) : null;

const questions = [
  {
    title: "A warm welcome, from the moment you arrive",
    image: welcomePhoto,
    imageAlt: "Church members smiling together at a welcoming gathering",
    imagePosition: "50% 65%",
    photoLabel: "THERE’S A SEAT FOR YOU",
    photoHeading: "New here?",
    photoMessage: "You’re already welcome.",
    body: "Our greeters will help you find your way around and settle in. On-site parking is available in Purok 2, Cobangbang. Arrive around 9:30 AM for our 10:00 AM main worship, or at 8:00 AM for Bible study and Sunday school.",
  },
  {
    title: "Come as you are",
    image: attirePhoto,
    imageAlt: "Church members in dresses, shirts, and casual clothes enjoying an activity together",
    imagePosition: "45% center",
    photoLabel: "COME AS YOU ARE",
    photoHeading: "A familiar face.",
    photoMessage: "A place to belong.",
    body: "Please wear neat, casual clothing suitable for going out, such as a shirt with pants or a dress. Choose something comfortable for worship, and avoid sleepwear or clothes meant only for lounging at home.",
  },
  {
    title: "A place for your little ones, too",
    image: childrenPhoto,
    imageAlt: "Kinder Ministry children and their teachers gathered for a church activity",
    imagePosition: "50% 65%",
    photoLabel: "LITTLE HEARTS. BIG WELCOME.",
    photoHeading: "Room to learn.",
    photoMessage: "Room to grow.",
    body: "Our Kinder and Elementary ministries offer Bible stories, songs, and crafts from 8:00 to 9:30 AM, followed by supervised activities during main worship. Our teachers can help you with check-in when you arrive.",
  },
  {
    title: "Worship rooted in God’s Word",
    image: worshipPhoto,
    imageAlt: "Junior Adult Ministry singing special praise before the congregation",
    imagePosition: "50% 60%",
    photoLabel: "TOGETHER IN WORSHIP",
    photoHeading: "One church family.",
    photoMessage: "Lifting our voices.",
    body: "Expect Christ-centered praise, historic hymns, contemporary songs, prayer, and verse-by-verse preaching from Scripture. Our main Sunday service runs from 10:00 to 11:30 AM.",
  },
  {
    title: "Stay a little longer. Share a meal.",
    image: mealPhoto,
    imageAlt: "Church members sharing food and conversation around a table",
    imagePosition: "50% center",
    photoLabel: "FELLOWSHIP AROUND THE TABLE",
    photoHeading: "Share a meal.",
    photoMessage: "Make a friend.",
    body: "After Sunday worship, join our church family for agape fellowship lunch. It’s a relaxed opportunity to meet new friends and our pastoral team. Lunch is on us for first-time guests.",
  },
];

export const WhatToExpectSection = ({
  onPlanVisitClick,
}: {
  onPlanVisitClick: () => void;
}) => {
  const [selection, setSelection] = useState({ index: 0, expanded: true });
  const active = selection.expanded ? selection.index : null;
  const selectedPhoto = questions[selection.index];
  return (
    <>
      <section id="about" className="about-section">
        {ChurchMilestones && <Suspense fallback={null}><ChurchMilestones /></Suspense>}
        <ScrollReveal className="page-container about-grid">
          <h2>
            Different stories.
            <br />
            <em>One family in Christ.</em>
          </h2>
          <div className="about-description">
            <p>
              We’re a Reformed Presbyterian church rooted in Biblical truth and
              God’s grace. Since 2007, we’ve gathered in Daet to worship Jesus,
              care for one another, and share His love with our ministry.
            </p>
            <a className="text-link" href="#ministries">
              Find your Ministry <ArrowRight size={16} />
            </a>
          </div>
        </ScrollReveal>
        <ChurchPhotoStream />
      </section>
      <section id="what-to-expect" className="visitor-section">
        <ScrollReveal className="page-container visitor-grid" effect="reveal">
          <ScrollReveal className="visitor-photo" effect="morph">
            {questions.map((question, index) => (
              <img
                key={question.title}
                className={selection.index === index ? "is-active" : ""}
                src={question.image}
                alt={selection.index === index ? question.imageAlt : ""}
                aria-hidden={selection.index !== index}
                style={{ objectPosition: question.imagePosition }}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ))}
            <div className="visitor-photo-note">
              <span>{selectedPhoto.photoLabel}</span>
              <p>
                {selectedPhoto.photoHeading}
                <br />
                {selectedPhoto.photoMessage}
              </p>
            </div>
          </ScrollReveal>
          <div className="visitor-copy">
            <p className="eyebrow">YOUR FIRST SUNDAY</p>
            <h2>
              A little less unknown.
              <br />
              <em>A lot more welcome.</em>
            </h2>
            <p className="section-description">
              Visiting a new church can feel like a big step. Here’s what you
              can look forward to with us.
            </p>
            <div className="visitor-accordion">
              {questions.map((question, index) => (
                <div className="accordion-item" key={question.title}>
                  <h3>
                    <button
                      id={`visitor-question-${index}`}
                      aria-expanded={active === index}
                      aria-controls={`visitor-answer-${index}`}
                      onClick={() =>
                        setSelection((current) => ({
                          index,
                          expanded: current.index !== index || !current.expanded,
                        }))
                      }
                    >
                      <span className="accordion-number">0{index + 1}</span>
                      <span>{question.title}</span>
                      {active === index ? (
                        <Minus size={17} />
                      ) : (
                        <Plus size={17} />
                      )}
                    </button>
                  </h3>
                  <div
                    id={`visitor-answer-${index}`}
                    role="region"
                    aria-labelledby={`visitor-question-${index}`}
                    aria-hidden={active !== index}
                    className={"visitor-answer" + (active === index ? " is-open" : "")}
                  >
                    <div className="visitor-answer-clip"><p>{question.body}</p></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="button button-navy" onClick={onPlanVisitClick}>
              Plan your first visit <ArrowRight size={16} />
            </button>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};
