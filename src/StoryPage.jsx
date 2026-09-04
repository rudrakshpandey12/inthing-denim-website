import { motion } from "framer-motion";

const timeline = [
  {
    label: "1958",
    title: "The beginning",
    text: "B.K. Maheshwari and Ramesh Arora came together following a chance train journey. That meeting became the beginning of a shared entrepreneurial journey."
  },
  {
    label: "OVER TIME",
    title: "From trading to integration",
    text: "They started with fabric trading, but their ambition extended beyond trading - moving towards full backward integration and bringing the journey from yarn to fabric within the manufacturing ecosystem."
  },
  {
    label: "2007",
    title: "Inthing comes to life",
    text: "The next chapter began as the family moved from being behind the success of other fashion brands towards building a successful fashion brand of its own."
  },
  {
    label: "NEXT GEN",
    title: "Akshat Bhutra joins",
    text: "With the next generation joining the business, the manufacturing network underwent strategic consolidation into stronger hubs connected to smaller manufacturing units."
  }
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

function StoryReveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function StoryPage() {
  return (
    <main className="story-page">
      <header className="story-nav">
        <a href="/" className="wordmark" aria-label="Inthing home">
          <span className="wordmark-mark">✦</span>
          <span>
            inthing<span className="dot">.</span>
          </span>
        </a>

        <a href="/" className="story-back">
          Back to home
        </a>
      </header>

      <section className="story-legacy container">
        <StoryReveal className="story-legacy-intro">
          <p className="eyebrow">02 / THE LEGACY</p>

          <h1>
            One Family
            <br />
            
            
            <em>Generations of ambitions</em>
          </h1>

          <p>
            The journey is not defined by one company or one generation. It is
            the evolution of a family enterprise - one step building on the
            foundation before it.
          </p>
        </StoryReveal>

        <div className="story-timeline">
          {timeline.map((item, index) => (
            <StoryReveal
              key={item.label}
              delay={index * 0.08}
              className="story-timeline-row"
            >
              <p className="story-timeline-label">{item.label}</p>

              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </StoryReveal>
          ))}
        </div>
      </section>

      <section className="story-origin section">
        <div className="container">
          <StoryReveal>
            <div className="section-topline">
              <span>03 / WHERE IT STARTED</span>
              <span>THE FOUNDATION</span>
            </div>
          </StoryReveal>

          <div className="origin-grid">
            <StoryReveal className="origin-card">
              <h2>
                Two people.
                <br />
                One train journey.
              </h2>
              <p>
                In 1958, two people from very different journeys in life came
                together. That meeting created the partnership from which the
                family enterprise grew.
              </p>
              <strong>58</strong>
            </StoryReveal>

            <StoryReveal delay={0.12} className="origin-card origin-card-blue">
              <h2>
                From fabric
                <br />
                to a full ecosystem.
              </h2>
              <p>
                The ambition extended beyond trading. Over time, the business
                built towards full backward integration - connecting the journey
                from yarn to fabric within its own manufacturing ecosystem.
              </p>
              <strong>01</strong>
            </StoryReveal>
          </div>

          <StoryReveal className="origin-quote">
            <p>
              “What started as a business in 1958 became the foundation for
              everything that followed.”
              <em> Three generations later, the journey continues.</em>
            </p>
          </StoryReveal>
        </div>
      </section>
    </main>
  );
}