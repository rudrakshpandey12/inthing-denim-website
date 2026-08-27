import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

import "./styles.css";

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1800&q=90",

  model:
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=90",

  denim:
    "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1400&q=90",

  detail:
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=90",

  lifestyle:
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=90",

  jacket:
    "https://images.unsplash.com/photo-1523205565295-f8e91625443b?auto=format&fit=crop&w=1400&q=90",
};

const ease = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  delay = 0,
  y = 45,
  className = "",
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function WordReveal({ children, delay = 0 }) {
  return (
    <span className="word-mask">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ImageReveal({ src, alt, className = "" }) {
  return (
    <div className={`image-reveal ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{
          scale: 1.14,
          opacity: 0,
        }}
        whileInView={{
          scale: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
      />
    </div>
  );
}

function ArrowButton({ children, dark = false }) {
  return (
    <motion.a
      href="#collections"
      className={`arrow-button ${dark ? "dark" : ""}`}
      whileHover="hover"
      initial="rest"
    >
      <span>{children}</span>

      <motion.span
        className="arrow-circle"
        variants={{
          rest: { x: 0 },
          hover: { x: 5 },
        }}
      >
        <ArrowRight size={18} />
      </motion.span>
    </motion.a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const heroImageY = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 120]
  );

  const heroImageScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    [1, 1.08]
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const heroSlides = [
    {
      title: (
        <>
          DENIM
          <br />
          <span>WITH INTENT.</span>
        </>
      ),
      description:
        "Thoughtfully designed denim made around movement, individuality and everyday life.",
      image: IMAGES.hero,
      label: "01 / THE DENIM PIECE",
    },
    {
      title: (
        <>
          BUILT FOR
          <br />
          <span>YOUR EVERYDAY.</span>
        </>
      ),
      description:
        "Comfort, character and confidence — designed into every fit.",
      image: IMAGES.model,
      label: "02 / EVERYDAY DENIM",
    },
    {
      title: (
        <>
          MADE TO
          <br />
          <span>MOVE WITH YOU.</span>
        </>
      ),
      description:
        "From fabric selection to final stitch, every detail has a purpose.",
      image: IMAGES.detail,
      label: "03 / CRAFT & DETAIL",
    },
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <main className="site">

      {/* SCROLL PROGRESS */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
      />

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">

          <a href="#top" className="logo">
            <span className="logo-star">✦</span>
            <span>
              inthing<span className="logo-dot">.</span>
            </span>
          </a>

          <nav className="desktop-navigation">
            <a href="#story">Story</a>
            <a href="#collections">Collections</a>
            <a href="#philosophy">Philosophy</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            className="menu-trigger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span>OPEN MENU</span>
            <Menu size={19} />
          </button>

        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-top">
              <div className="logo">
                <span className="logo-star">✦</span>
                <span>
                  inthing<span className="logo-dot">.</span>
                </span>
              </div>

              <button
                className="mobile-close"
                onClick={() => setMenuOpen(false)}
              >
                <X size={25} />
              </button>
            </div>

            <nav>
              {[
                ["Story", "#story"],
                ["Collections", "#collections"],
                ["Philosophy", "#philosophy"],
                ["Contact", "#contact"],
              ].map(([name, href], index) => (
                <motion.a
                  key={name}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease,
                  }}
                >
                  <span>0{index + 1}</span>
                  {name}
                  <ArrowUpRight size={22} />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="top" className="hero">

        <div className="hero-noise" />

        <div className="hero-grid">

          {/* HERO TEXT */}
          <div className="hero-content">

            <Reveal>
              <p className="eyebrow">
                PREMIUM DENIM / INDIA
              </p>
            </Reveal>

            <div className="hero-title">
              <WordReveal>
                {currentSlide.title}
              </WordReveal>
            </div>

            <Reveal delay={0.25}>
              <p className="hero-description">
                {currentSlide.description}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <ArrowButton>
                Discover Inthing
              </ArrowButton>
            </Reveal>

          </div>

          {/* HERO IMAGE */}
          <motion.div
            className="hero-image-area"
            style={{
              y: heroImageY,
              scale: heroImageScale,
            }}
            key={activeSlide}
            initial={{
              opacity: 0,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >

            <div className="hero-image-frame">

              <img
                src={currentSlide.image}
                alt="Inthing denim collection"
              />

              <div className="hero-image-overlay" />

              <div className="hero-image-label">
                <span>INTHING</span>
                <small>DENIM / 2026</small>
              </div>

            </div>

            <div className="hero-caption">
              {currentSlide.label}
            </div>

          </motion.div>

        </div>

        {/* HERO CONTROLS */}
        <div className="hero-controls">

          <button
            onClick={() =>
              setActiveSlide(
                activeSlide === 0
                  ? heroSlides.length - 1
                  : activeSlide - 1
              )
            }
            aria-label="Previous slide"
          >
            <ArrowRight className="previous-arrow" size={22} />
          </button>

          <div className="slide-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={
                  activeSlide === index ? "active" : ""
                }
                onClick={() => setActiveSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setActiveSlide(
                (activeSlide + 1) % heroSlides.length
              )
            }
            aria-label="Next slide"
          >
            <ArrowRight size={22} />
          </button>

        </div>

        {/* TICKER */}
        <div className="ticker">
          <motion.div
            className="ticker-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>FIT</span>
            <i>✦</i>
            <span>FABRIC</span>
            <i>✦</i>
            <span>FORM</span>
            <i>✦</i>
            <span>CRAFT</span>
            <i>✦</i>
            <span>FIT</span>
            <i>✦</i>
            <span>FABRIC</span>
            <i>✦</i>
            <span>FORM</span>
            <i>✦</i>
            <span>CRAFT</span>
            <i>✦</i>
          </motion.div>
        </div>

      </section>

      {/* QUOTE */}
      <section className="quote-section">

        <div className="quote-mark">“</div>

        <Reveal className="quote-inner">

          <p className="section-eyebrow">
            THE INTHING BELIEF
          </p>

          <h2>
            Denim is not just
            <em> what you wear.</em>
            <br />
            It's how you
            <strong> move.</strong>
          </h2>

          <div className="quote-line" />

          <p className="quote-small">
            Originality. Quality. Innovation. Fit.
          </p>

        </Reveal>

      </section>

      {/* STORY */}
      <section id="story" className="story section">

        <div className="section-header">

          <span>01 / OUR STORY</span>

          <span>
            FROM DENIM ROOTS
          </span>

        </div>

        <div className="story-grid">

          <Reveal className="story-heading">

            <p className="eyebrow">
              BUILT TO BE WORN
            </p>

            <h2>
              FROM DENIM
              <br />
              ROOTS TO
              <br />
              <em>MODERN STYLE.</em>
            </h2>

          </Reveal>

          <Reveal
            delay={0.15}
            className="story-copy"
          >

            <p className="large-copy">
              We believe great denim should feel
              effortless — confident, comfortable
              and unmistakably yours.
            </p>

            <p>
              Inthing brings together considered
              proportions, expressive washes and
              everyday functionality to create denim
              that becomes part of your identity.
            </p>

            <a href="#collections" className="text-link">
              Explore the collection
              <ArrowUpRight size={17} />
            </a>

          </Reveal>

        </div>

        <div className="story-image-grid">

          <ImageReveal
            src={IMAGES.lifestyle}
            alt="Inthing denim lifestyle"
            className="story-large-image"
          />

          <Reveal className="story-side-card">

            <span className="card-number">
              01
            </span>

            <h3>
              Designed
              <br />
              with purpose.
            </h3>

            <p>
              Every silhouette starts with fit,
              proportion and the way people
              actually live.
            </p>

          </Reveal>

        </div>

      </section>

      {/* COLLECTIONS */}
      <section
        id="collections"
        className="collections section"
      >

        <div className="section-header">

          <span>02 / COLLECTIONS</span>

          <span>EXPLORE THE DENIM</span>

        </div>

        <Reveal className="collections-intro">

          <h2>
            FIND YOUR
            <br />
            <em>EVERYDAY FIT.</em>
          </h2>

          <p>
            Denim designed for different
            moments, moods and movements.
          </p>

        </Reveal>

        <div className="collection-grid">

          {[
            {
              number: "01",
              title: "STRAIGHT",
              subtitle: "THE CLASSIC",
              image: IMAGES.hero,
            },
            {
              number: "02",
              title: "BAGGY",
              subtitle: "THE STATEMENT",
              image: IMAGES.model,
            },
            {
              number: "03",
              title: "SLIM",
              subtitle: "THE ESSENTIAL",
              image: IMAGES.denim,
            },
          ].map((item, index) => (

            <Reveal
              key={item.number}
              delay={index * 0.12}
              className="collection-card-wrap"
            >

              <motion.article
                className="collection-card"
                whileHover="hover"
                initial="rest"
              >

                <div className="collection-image">

                  <motion.img
                    src={item.image}
                    alt={item.title}
                    variants={{
                      rest: {
                        scale: 1,
                      },
                      hover: {
                        scale: 1.06,
                      },
                    }}
                    transition={{
                      duration: 0.7,
                      ease,
                    }}
                  />

                  <div className="collection-overlay" />

                  <span className="collection-number">
                    {item.number}
                  </span>

                  <motion.div
                    className="collection-arrow"
                    variants={{
                      rest: {
                        opacity: 0,
                        x: -10,
                      },
                      hover: {
                        opacity: 1,
                        x: 0,
                      },
                    }}
                  >
                    <ArrowUpRight size={24} />
                  </motion.div>

                </div>

                <div className="collection-info">

                  <div>
                    <span>
                      {item.subtitle}
                    </span>

                    <h3>
                      {item.title}
                    </h3>
                  </div>

                  <ArrowRight size={20} />

                </div>

              </motion.article>

            </Reveal>

          ))}

        </div>

      </section>

      {/* EDITORIAL QUOTE + IMAGE */}
      <section
        id="philosophy"
        className="editorial section"
      >

        <div className="editorial-image">

          <ImageReveal
            src={IMAGES.jacket}
            alt="Denim fashion"
          />

          <div className="editorial-circle" />

        </div>

        <div className="editorial-copy">

          <Reveal>

            <p className="eyebrow">
              03 / THE INTHING WAY
            </p>

            <h2>
              MAKE IT
              <br />
              USEFUL.
              <br />
              MAKE IT
              <br />
              <em>LAST.</em>
            </h2>

          </Reveal>

          <Reveal delay={0.15}>

            <p>
              We design pieces that are meant to
              leave the wardrobe and become part
              of real life.
            </p>

            <ArrowButton dark>
              Our philosophy
            </ArrowButton>

          </Reveal>

        </div>

      </section>

      {/* DENIM DETAIL */}
      <section className="detail-section">

        <div className="detail-image">
          <ImageReveal
            src={IMAGES.detail}
            alt="Denim fabric detail"
          />
        </div>

        <div className="detail-copy">

          <Reveal>

            <span className="detail-number">
              04
            </span>

            <h2>
              DETAILS
              <br />
              YOU CAN
              <br />
              <em>FEEL.</em>
            </h2>

            <p>
              Texture. Weight. Wash. Stitch.
              The smallest details change how
              denim looks and how it lives.
            </p>

          </Reveal>

        </div>

      </section>

      {/* MANIFESTO */}
      <section className="manifesto">

        <div className="manifesto-image">

          <img
            src={IMAGES.denim}
            alt=""
          />

          <div className="manifesto-overlay" />

        </div>

        <Reveal className="manifesto-content">

          <p className="eyebrow">
            INTHING / DENIM
          </p>

          <h2>
            WEAR IT.
            <br />
            LIVE IT.
            <br />
            <em>MAKE IT YOURS.</em>
          </h2>

          <ArrowButton dark>
            Discover Inthing
          </ArrowButton>

        </Reveal>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="contact section"
      >

        <div className="section-header">

          <span>05 / CONTACT</span>

          <span>LET'S TALK DENIM</span>

        </div>

        <div className="contact-grid">

          <Reveal>

            <p className="eyebrow">
              HAVE AN IDEA?
            </p>

            <h2>
              LET'S MAKE
              <br />
              IT
              <em>WEARABLE.</em>
            </h2>

          </Reveal>

          <Reveal delay={0.15}>

            <div className="contact-card">

              <p>
                For enquiries, collaborations
                and business opportunities.
              </p>

              <a href="mailto:inthingjeanssales@gmail.com">
                inthingjeanssales@gmail.com
              </a>

              <a href="tel:+919899076333">
                +91 9899076333
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <ArrowUpRight size={17} />
              </a>

            </div>

          </Reveal>

        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="footer-main">

          <a href="#top" className="logo">
            <span className="logo-star">✦</span>
            <span>
              inthing<span className="logo-dot">.</span>
            </span>
          </a>

          <p>
            Premium denim.
            <br />
            Thoughtfully made.
          </p>

          <a href="#top" className="back-top">
            BACK TO TOP
            <ArrowUp size={17} />
          </a>

        </div>

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} INTHING
          </span>

          <span>
            DENIM WITH INTENT.
          </span>

        </div>

      </footer>

    </main>
  );
}