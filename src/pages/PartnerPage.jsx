import { useEffect, useMemo, useRef, useState } from "react";
import "./PartnerPage.css";

const stats = [
  { end: 5400, suffix: "+", label: "TikTok followers", detail: "A growing healthcare-learning community" },
  { display: "3–4", label: "LIVE sessions weekly", detail: "Consistent, interactive audience engagement" },
  { end: 100, suffix: "%", label: "free access", detail: "No paywall between learners and practice" },
  { end: 23, suffix: "+", label: "years in healthcare", detail: "Built from real clinical engineering experience" },
];

const audiences = [
  ["🎓", "Students", "Learners preparing for healthcare programs, certifications, clinical experiences, and first jobs."],
  ["🩺", "Clinical Care", "Nurses, medical assistants, respiratory therapists, imaging professionals, EMS, and allied-health teams."],
  ["⚙️", "Healthcare Technology", "HTM teams and the professionals who keep medical equipment safe, reliable, and ready for patient care."],
  ["🏥", "Education & Healthcare Organizations", "Schools, colleges, workforce programs, hospitals, healthcare systems, and industry partners."],
];

const experiences = [
  ["🏥", "Clinical Engineering Academy", "Guided hospital service calls that build troubleshooting, safety, and decision-making skills."],
  ["🩺", "Medical Assistant Academy", "A clear, approachable pathway into medical assisting with practical learning experiences."],
  ["📖", "Medical Terminology Builder", "Interactive word-building practice that helps learners understand—not just memorize—medical language."],
  ["🧠", "Anatomy & clinical recognition", "Anatomy labeling, EKG, ABG, lab values, heart sounds, lung sounds, and more."],
  ["⚡", "Certification preparation", "Free CBET, CRES, RN, and TEAS practice designed to build confidence through repetition and feedback."],
  ["🎮", "Learning that feels active", "Quizzes, challenges, badges, progress, and scenarios designed for short, focused learning sessions."],
];

const partnershipOptions = [
  ["01", "Educational collaboration", "Co-create accurate, practical content that helps learners understand healthcare careers, equipment, and skills."],
  ["02", "Product education", "Demonstrate healthcare technology responsibly through tutorials, use cases, and scenario-based learning."],
  ["03", "Workforce development", "Support awareness, recruitment, and foundational preparation for hard-to-fill healthcare and HTM roles."],
  ["04", "Mission-aligned sponsorship", "Help keep MedSkillBuilder free while supporting a clearly defined educational initiative or learning pathway."],
];


const milestones = [
  ["Experience", "23+ years working in healthcare and clinical engineering"],
  ["Community", "Built an audience through practical healthcare education and 3–4 LIVE sessions each week"],
  ["Platform", "Created free interactive academies, quizzes, simulations, and study tools"],
  ["Growth", "Expanding organic search visibility and industry relationships"],
  ["Vision", "Become a trusted free destination for interactive healthcare learning"],
];

function AnimatedStat({ stat, active }) {
  const [value, setValue] = useState(active ? (stat.end || 0) : 0);

  useEffect(() => {
    if (!active || stat.display || typeof stat.end !== "number") return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setValue(stat.end);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(stat.end * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, stat]);

  const formatted = stat.display || value.toLocaleString();
  return <>{formatted}{stat.suffix || ""}</>;
}

export default function PartnerPage() {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statItems = useMemo(() => stats, []);

  useEffect(() => {
    document.title = "Partner With MedSkillBuilder | Healthcare Education Collaboration";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const node = statsRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setStatsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="partner-page">
      <section className="partner-hero" aria-labelledby="partner-title">
        <div className="partner-hero__glow partner-hero__glow--one" />
        <div className="partner-hero__glow partner-hero__glow--two" />

        <div className="partner-hero__content">
          <a className="partner-logo" href="/" aria-label="MedSkillBuilder home">
            <span className="partner-logo__mark" aria-hidden="true">✚</span>
            <span>MedSkillBuilder</span>
          </a>

          <span className="partner-kicker">PARTNER WITH MEDSKILLBUILDER</span>
          <h1 id="partner-title">Building the Future of Healthcare Education</h1>
          <p className="partner-hero__lead">
            We create free, interactive learning experiences that help current and future healthcare professionals
            practice, understand, and grow—without putting essential learning behind a paywall.
          </p>

          <div className="partner-hero__actions">
            <a
              className="partner-button partner-button--light"
              href="mailto:medskillbuilder@yahoo.com?subject=MedSkillBuilder%20Partnership%20Conversation"
            >
              Start a conversation
            </a>
            <a className="partner-button partner-button--glass" href="/">
              Explore MedSkillBuilder
            </a>
          </div>

          <div className="partner-hero__trust">
            <span>Healthcare focused</span>
            <span>Built from 23+ years of experience</span>
            <span>Free for learners</span>
          </div>
        </div>

        <aside className="partner-hero__feature" aria-label="MedSkillBuilder partnership summary">
          <span className="partner-hero__feature-icon" aria-hidden="true">🤝</span>
          <span className="partner-hero__feature-label">WHY ORGANIZATIONS PARTNER WITH US</span>
          <h2>Build meaningful impact through accessible healthcare education.</h2>
          <ul className="partner-hero__feature-list">
            <li>Reach future healthcare professionals</li>
            <li>Support workforce development</li>
            <li>Expand educational impact</li>
            <li>Help keep learning free</li>
          </ul>
        </aside>
      </section>

      <section ref={statsRef} className="partner-stats" aria-label="MedSkillBuilder by the numbers">
        {statItems.map((stat) => (
          <article key={stat.label}>
            <strong><AnimatedStat stat={stat} active={statsVisible} /></strong>
            <h2>{stat.label}</h2>
            <p>{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="partner-intro partner-panel">
        <div className="partner-intro__heading">
          <span className="partner-eyebrow">WHY MEDSKILLBUILDER EXISTS</span>
          <h2>Learning should create confidence—not just correct answers.</h2>
        </div>
        <div className="partner-intro__copy">
          <p>
            After more than 23 years in healthcare, founder Kevin Pugh saw how often learners were expected to
            memorize complex information without enough opportunity to apply it.
          </p>
          <p>
            MedSkillBuilder was created to make healthcare learning more practical, approachable, and engaging.
            Learners can explore careers, practice essential concepts, and work through realistic scenarios in short,
            focused sessions—completely free.
          </p>
          <blockquote>
            “Every partnership should help more people learn, grow, and succeed in healthcare.”
          </blockquote>
        </div>
      </section>

      <section className="partner-section partner-section--soft">
        <div className="partner-section__heading">
          <span className="partner-eyebrow">WHO WE REACH</span>
          <h2>A community connected by healthcare, learning, and career growth.</h2>
        </div>
        <div className="partner-audience-grid">
          {audiences.map(([icon, title, description]) => (
            <article key={title}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-section">
        <div className="partner-section__heading partner-section__heading--center">
          <span className="partner-eyebrow">WHAT WE&apos;RE BUILDING</span>
          <h2>Interactive healthcare education designed for how people learn today.</h2>
          <p>
            MedSkillBuilder combines practical content with active learning so visitors can do more than read—they can practice.
          </p>
        </div>
        <div className="partner-experience-grid">
          {experiences.map(([icon, title, description]) => (
            <article key={title}>
              <span className="partner-experience-grid__icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-collaboration">
        <div className="partner-collaboration__copy">
          <span className="partner-eyebrow partner-eyebrow--light">WAYS TO WORK TOGETHER</span>
          <h2>Partnerships should create real value for learners and the healthcare workforce.</h2>
          <p>
            We are not looking for logos without purpose. We are looking for organizations that want to help build
            useful, responsible, and accessible healthcare education.
          </p>
        </div>
        <div className="partner-collaboration__options">
          {partnershipOptions.map(([number, title, description]) => (
            <article key={title}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="partner-supporters">
        <div className="partner-supporters__heading">
          <span className="partner-eyebrow">ORGANIZATIONS SUPPORTING OUR MISSION</span>
          <h2>Together, we&apos;re expanding free healthcare education.</h2>
          <p>
            We are grateful for organizations that believe healthcare education should be practical, engaging,
            and accessible. Their support helps MedSkillBuilder continue creating free learning experiences.
          </p>
        </div>

        <div className="partner-supporters__grid" aria-label="Organizations supporting MedSkillBuilder">
          <article className="partner-supporters__organization">
            <span className="partner-supporters__icon" aria-hidden="true">★</span>
            <div>
              <h3>C-Arm Associates</h3>
              <p>Supporting our mission through industry visibility and shared commitment to healthcare technology education.</p>
            </div>
          </article>

          <article className="partner-supporters__open">
            <span aria-hidden="true">＋</span>
            <h3>Room to collaborate</h3>
            <p>We welcome additional organizations that want to support meaningful healthcare learning.</p>
          </article>
        </div>

        <div className="partner-supporters__cta">
          <div>
            <span className="partner-eyebrow partner-eyebrow--light">INTERESTED IN SUPPORTING OUR MISSION?</span>
            <h3>Let&apos;s explore what we can build together.</h3>
            <p>
              We welcome educational collaborations, workforce initiatives, product education, and other ideas
              that create genuine value for healthcare learners.
            </p>
          </div>
          <a
            className="partner-button partner-button--light"
            href="mailto:medskillbuilder@yahoo.com?subject=MedSkillBuilder%20Partnership%20Conversation"
          >
            Start a Partnership Conversation
          </a>
        </div>
      </section>


      <section className="partner-section partner-journey">
        <div className="partner-section__heading">
          <span className="partner-eyebrow">THE JOURNEY</span>
          <h2>Built from experience. Growing through community.</h2>
        </div>
        <div className="partner-timeline">
          {milestones.map(([label, description], index) => (
            <article key={label}>
              <div className="partner-timeline__marker">{index + 1}</div>
              <div>
                <span>{label}</span>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-founder">
        <div className="partner-founder__identity">
          <span className="partner-founder__monogram">KP</span>
          <div>
            <strong>Kevin Pugh</strong>
            <span>Founder, MedSkillBuilder</span>
            <span>Clinical Engineering Specialist III</span>
          </div>
        </div>
        <div className="partner-founder__message">
          <span className="partner-eyebrow">A NOTE FROM THE FOUNDER</span>
          <h2>I built MedSkillBuilder to give learners the kind of practical, interactive experience I wish existed earlier in my career.</h2>
          <p>
            The platform is growing, but the mission remains simple: help people understand healthcare, discover careers,
            and build confidence through free learning. The right partners can help us reach more learners and create an even greater impact.
          </p>
        </div>
      </section>

      <section className="partner-vision">
        <span>THE VISION</span>
        <h2>Building a trusted free destination for interactive healthcare learning.</h2>
        <p>
          From foundational anatomy and medical terminology to certification preparation and realistic technical scenarios,
          we are building a platform where healthcare learners can keep moving forward.
        </p>
      </section>

      <section className="partner-contact">
        <div>
          <span className="partner-eyebrow partner-eyebrow--light">LET&apos;S BUILD SOMETHING MEANINGFUL</span>
          <h2>Start a partnership conversation.</h2>
          <p>
            Interested in educational collaboration, product education, workforce development, sponsorship, or another
            mission-aligned idea? We&apos;d be glad to hear from you.
          </p>
        </div>
        <div className="partner-contact__card">
          <strong>Kevin Pugh</strong>
          <span>Founder, MedSkillBuilder</span>
          <a href="mailto:medskillbuilder@yahoo.com">medskillbuilder@yahoo.com</a>
          <a href="https://medskillbuilder.com" target="_blank" rel="noreferrer">MedSkillBuilder.com</a>
          <a
            className="partner-button partner-button--light partner-button--full"
            href="mailto:medskillbuilder@yahoo.com?subject=MedSkillBuilder%20Partnership%20Conversation"
          >
            Start a partnership conversation
          </a>
        </div>
      </section>
    </main>
  );
}
