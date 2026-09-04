import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Moon,
  Sun,
} from "lucide-react";

const sustainabilitySlides = [
  {
    eyebrow: "WATER",
    title: "Rethinking the blue.",
    text:
      "A single pair of jeans can take around 3,800 litres of water to produce. We are moving towards processes that use resources more intelligently.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1800&q=85",
    stat: "3,800",
    statLabel: "litres of water",
  },
  {
    eyebrow: "3D VISUALIZATION",
    title: "Design before waste.",
    text:
      "3D visualization helps us explore silhouettes, proportions and details digitally before physical samples are created.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1800&q=85",
    stat: "3D",
    statLabel: "design-led development",
  },
  {
    eyebrow: "LASER FADING",
    title: "Precision without excess.",
    text:
      "Laser technology allows denim effects to be created with greater precision while reducing dependence on traditional chemical-heavy processes.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1800&q=85",
    stat: "01",
    statLabel: "precision-first approach",
  },
  {
    eyebrow: "OZONE WASHING",
    title: "A cleaner way to finish.",
    text:
      "Ozone washing is part of our move towards more responsible denim finishing, helping us rethink conventional washing processes.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85",
    stat: "LOWER",
    statLabel: "resource-intensive processing",
  },
];

const practices = [
  {
    number: "01",
    title: "3D visualization",
    text:
      "We use digital visualization to explore design, proportion and fit before unnecessary physical sampling begins.",
  },
  {
    number: "02",
    title: "Laser fading",
    text:
      "Laser technology gives designers precise control over denim effects while helping reduce dependence on traditional finishing methods.",
  },
  {
    number: "03",
    title: "Ozone washing",
    text:
      "Ozone-based finishing helps us rethink conventional denim washing and move towards more resource-conscious production.",
  },
];

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function SustainabilityPage() {
  const [dark, setDark] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = sustainabilitySlides[activeSlide];

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === sustainabilitySlides.length - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? sustainabilitySlides.length - 1 : current - 1
    );
  };

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <main className="sustainability-page">

      {/* NAVIGATION */}

      <header className="nav-wrap">
        <div className="nav container">

          <a className="wordmark" href="/">
            <span className="wordmark-mark">✦</span>
            <span>
              inthing<span className="dot">.</span>
            </span>
          </a>

          <nav className="desktop-nav">
            <a href="/">Home</a>
            <a href="/story">Story</a>
            <a href="/#denim">Denim</a>
            <a href="/sustainability">Sustainability</a>
            <a href="/#impact">Impact</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              aria-label="Toggle colour theme"
              onClick={() => setDark((value) => !value)}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>

        </div>
      </header>


      {/* HERO */}

      <section className="sustainability-hero section">

        <div className="container">

          <div className="section-topline">
            <span>02 / SUSTAINABILITY</span>
            <span>DENIM WITH Best IMPACT</span>
          </div>

          <div className="sustainability-hero-grid">

            {/* LEFT */}

            <div className="sustainability-intro">

              <Reveal>
                <p className="eyebrow">SUSTAINABILITY</p>

                <h1>
                  Being Fundamentally{" "}
                  <em>right.</em>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="sustainability-lead">
                  Producing a single pair of jeans takes 3,800 litres of
                  water. 🤯 It's time to rethink the blue.
                </p>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="sustainability-description">
                  At Inthing Creations, we're shifting away from
                  chemical-heavy, water-wasting traditions and leaning into
                  3D visualization, laser fading, and ozone washing.
                  Sustainable manufacturing isn't a premium exception
                  anymore — it's an operational imperative.
                </p>
              </Reveal>

              <Reveal delay={0.22}>
                <a href="#better-denim" className="round-cta">
                  <span>Explore our approach</span>
                  <ArrowUpRight size={18} />
                </a>
              </Reveal>

            </div>


            {/* SLIDER */}

            <Reveal
              delay={0.12}
              className="sustainability-slider-wrap"
            >

              <div
                className="sustainability-slider"
                onTouchStart={(event) => {
                  event.currentTarget.dataset.startX =
                    event.touches[0].clientX;
                }}
                onTouchEnd={(event) => {
                  const startX = Number(
                    event.currentTarget.dataset.startX
                  );

                  const endX = event.changedTouches[0].clientX;

                  if (startX - endX > 50) {
                    nextSlide();
                  }

                  if (endX - startX > 50) {
                    previousSlide();
                  }
                }}
              >

                <AnimatePresence mode="wait">

                  <motion.div
                    key={activeSlide}
                    className="sustainability-slide"
                    initial={{ opacity: 0, x: 45 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -45 }}
                    transition={{
                      duration: 0.5,
                      ease,
                    }}
                  >

                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title}
                    />

                    <div className="sustainability-slide-overlay" />

                    <div className="sustainability-slide-content">

                      <p className="sustainability-slide-eyebrow">
                        {currentSlide.eyebrow}
                      </p>

                      <h2>
                        {currentSlide.title}
                      </h2>

                      <p>
                        {currentSlide.text}
                      </p>

                      <div className="sustainability-stat">
                        <strong>
                          {currentSlide.stat}
                        </strong>

                        <span>
                          {currentSlide.statLabel}
                        </span>
                      </div>

                    </div>

                  </motion.div>

                </AnimatePresence>


                {/* SLIDER CONTROLS */}

                <div className="sustainability-slider-controls">

                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous sustainability slide"
                  >
                    <ArrowLeft size={19} />
                  </button>

                  <div className="sustainability-dots">

                    {sustainabilitySlides.map((slide, index) => (
                      <button
                        key={slide.eyebrow}
                        type="button"
                        className={
                          index === activeSlide ? "active" : ""
                        }
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Go to ${slide.eyebrow}`}
                      />
                    ))}

                  </div>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next sustainability slide"
                  >
                    <ArrowRight size={19} />
                  </button>

                </div>

              </div>

            </Reveal>

          </div>

        </div>

      </section>


      {/* BETTER DENIM SECTION */}

      <section
        id="better-denim"
        className="section sustainability-practices"
      >

        <div className="container">

          <div className="section-topline">
            <span>03 / THE BETTER WAY</span>
            <span>LESS WASTE / MORE INTENT</span>
          </div>


          <div className="sustainability-practices-heading">

            <Reveal>
              <p className="eyebrow">THE PROCESS MATTERS</p>

              <h2>
                Better denim starts
                <br />
                <em>before the jeans.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p>
                Sustainability isn't a final-stage decision. It belongs
                inside the design and manufacturing process from the very
                beginning.
              </p>
            </Reveal>

          </div>


          <div className="sustainability-practice-grid">

            {practices.map((practice, index) => (

              <Reveal
                key={practice.number}
                delay={index * 0.08}
                className="sustainability-practice"
              >

                <span className="sustainability-practice-number">
                  {practice.number}
                </span>

                <h3>
                  {practice.title}
                </h3>

                <p>
                  {practice.text}
                </p>

                <span className="sustainability-practice-line" />

              </Reveal>

            ))}

          </div>

        </div>

      </section>


      {/* MANIFESTO */}

      <section className="sustainability-manifesto">

        <div className="container">

          <Reveal>

            <p className="eyebrow">
              OUR POSITION
            </p>

            <h2>
              Sustainable manufacturing
              <br />
              isn't a premium exception.
              <br />
              <em>It's the standard.</em>
            </h2>

          </Reveal>

        </div>

      </section>

    </main>
  );
}