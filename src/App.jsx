import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { content } from "./data";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
  amount = 0.18,
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount,
        margin: "0px 0px -60px 0px",
      }}
      transition={{
        duration: 0.8,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function WordReveal({ children, delay = 0 }) {
  const words = String(children).split(" ");

  return (
    <span className="word-reveal" aria-label={children}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <motion.span
            className="word"
            initial={{
              y: "110%",
              opacity: 0,
            }}
            whileInView={{
              y: "0%",
              opacity: 1,
            }}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.055,
              ease,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MagneticLink({ href, children, className = "" }) {
  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{
        x: 6,
      }}
      transition={{
        duration: 0.3,
        ease,
      }}
    >
      {children}
    </motion.a>
  );
}

function ImageReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`image-reveal ${className}`}
      initial={{
        clipPath: "inset(12% 0% 12% 0%)",
        opacity: 0,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1.1,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

function StatReveal({ value, label, note, delay = 0 }) {
  const number = parseInt(String(value).replace(/\D/g, ""), 10);
  const suffix = String(value).replace(/[0-9]/g, "");

  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || Number.isNaN(number)) return;

    let startTime;
    const duration = 1100;

    const animate = (time) => {
      if (!startTime) startTime = time;

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(number * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, number]);

  return (
    <motion.div
      ref={ref}
      className="stat-row"
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={() => {
        setStarted(true);

        return {
          opacity: 1,
          y: 0,
        };
      }}
      viewport={{
        once: true,
        amount: 0.6,
      }}
      transition={{
        duration: 0.75,
        delay,
        ease,
      }}
    >
      <strong>
        {Number.isNaN(number) ? value : `${display}${suffix}`}
      </strong>

      <div>
        <span>{label}</span>
        {note && <small>{note}</small>}
      </div>
    </motion.div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const heroRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.2,
  });

  const heroY = useTransform(
    smoothProgress,
    [0, 0.18],
    [0, 120]
  );

  const heroScale = useTransform(
    smoothProgress,
    [0, 0.18],
    [1.08, 1]
  );

  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.15],
    [1, 0.92]
  );

  const navY = useTransform(
    scrollY,
    [0, 80],
    [0, -2]
  );

  useEffect(() => {
    document.documentElement.dataset.theme = dark
      ? "dark"
      : "light";
  }, [dark]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 60);
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const nav = useMemo(
    () => [
      ["Story", "#story"],
      ["Denim", "#denim"],
      ["Impact", "#impact"],
      ["Contact", "#contact"],
    ],
    []
  );

  const denimCards = [
    [
      "01",
      "Fit",
      "Proportion-first silhouettes that move with real bodies.",
      content.images.hero,
    ],
    [
      "02",
      "Fabric",
      "Texture, weight and wash are treated as part of the design.",
      content.images.denimTexture,
    ],
    [
      "03",
      "Construction",
      "The smallest seam can change how a garment feels.",
      content.images.seam,
    ],
    [
      "04",
      "Everyday",
      "Premium denim should work beyond the photograph.",
      content.images.lifestyle,
    ],
  ];

  return (
    <main>
      {/* GLOBAL SCROLL PROGRESS */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX: smoothProgress,
        }}
      />

      {/* NAVIGATION */}
      <motion.header
        className={`nav-wrap ${
          scrolled ? "nav-scrolled" : ""
        }`}
        style={{ y: navY }}
      >
        <div className="nav container">
          <a
            className="wordmark"
            href="#top"
            aria-label="Inthing home"
          >
            <span className="wordmark-mark">✦</span>

            <span>
              inthing<span className="dot">.</span>
            </span>
          </a>

          <nav className="desktop-nav">
            {nav.map(([label, href]) => (
              <motion.a
                href={href}
                key={href}
                whileHover={{
                  y: -2,
                }}
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              aria-label="Toggle colour theme"
              onClick={() => setDark((value) => !value)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={dark ? "sun" : "moon"}
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                >
                  {dark ? (
                    <Sun size={17} />
                  ) : (
                    <Moon size={17} />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              className="menu-btn"
              aria-label="Open menu"
              onClick={() =>
                setMenu((value) => !value)
              }
            >
              {menu ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              className="mobile-menu"
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.45,
                ease,
              }}
            >
              {nav.map(([label, href], index) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenu(false)}
                  initial={{
                    opacity: 0,
                    x: -18,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.5,
                    ease,
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* HERO */}
      <section
        id="top"
        className="hero"
        ref={heroRef}
      >
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">
                PREMIUM DENIM / INDIA
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1>
                <WordReveal>Denim</WordReveal>
                <span>
                  <WordReveal delay={0.1}>
                    with intent.
                  </WordReveal>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="hero-lead">
                {content.intro}
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <motion.a
                href="#story"
                className="round-cta"
                whileHover={{
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.98,
                }}
              >
                <span>Explore the story</span>
                <motion.span
                  className="cta-icon"
                  whileHover={{
                    rotate: 45,
                  }}
                >
                  <ArrowDownRight size={18} />
                </motion.span>
              </motion.a>
            </Reveal>
          </div>

          <motion.div
            className="hero-visual"
            style={{
              y: heroY,
              scale: heroScale,
              opacity: heroOpacity,
            }}
          >
            <motion.div
              className="hero-frame"
              initial={{
                clipPath: "inset(8% 0% 8% 0%)",
                opacity: 0,
              }}
              animate={{
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 0.15,
                ease,
              }}
            >
              <motion.img
                src={content.images.hero}
                alt="Inthing denim campaign"
                initial={{
                  scale: 1.12,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 1.6,
                  delay: 0.15,
                  ease,
                }}
              />

              <motion.div
                className="hero-stamp"
                initial={{
                  scale: 0,
                  rotate: -25,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  rotate: -8,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease,
                }}
              >
                <span>INTHING</span>
                <small>
                  FIT • FABRIC • FORM
                </small>
              </motion.div>
            </motion.div>

            <p className="image-caption">
              01 / THE PIECE COMES FIRST
            </p>
          </motion.div>
        </div>

        <div
          className="hero-ticker"
          aria-hidden="true"
        >
          <motion.div
            className="ticker-track"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>FIT</span>
            <i>✦</i>
            <span>FORM</span>
            <i>✦</i>
            <span>FABRIC</span>
            <i>✦</i>
            <span>FIT</span>
            <i>✦</i>
            <span>FORM</span>
            <i>✦</i>
            <span>FABRIC</span>
            <i>✦</i>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="section story"
      >
        <div className="container">
          <div className="section-topline">
            <span>01 / OUR STORY</span>
            <span>BUILT TO BE WORN</span>
          </div>

          <div className="story-grid">
            <Reveal>
              <h2 className="editorial-heading">
                Not just a pair of jeans.{" "}
                <em>A point of view.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="story-copy">
                <p>{content.description}</p>

                <p>
                  Inthing's existing brand story
                  speaks about originality, quality,
                  innovation and fit. This redesign
                  turns those ideas into a digital
                  experience instead of simply
                  placing them on a page.
                </p>

                <MagneticLink
                  href="#denim"
                  className="text-link"
                >
                  See what we obsess over
                  <ArrowUpRight size={16} />
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <div className="editorial-grid">
            <ImageReveal
              className="editorial-large"
            >
              <motion.img
                src={content.images.craft}
                alt="Denim craftsmanship detail"
                whileHover={{
                  scale: 1.045,
                }}
                transition={{
                  duration: 1.2,
                  ease,
                }}
              />

              <span>CRAFT / 01</span>
            </ImageReveal>

            <Reveal
              delay={0.12}
              className="editorial-small"
            >
              <motion.div
                className="quote-card"
                whileHover={{
                  y: -5,
                }}
                transition={{
                  duration: 0.4,
                  ease,
                }}
              >
                <span className="quote-mark">
                  “
                </span>

                <p>
                  We stay forward-looking without
                  losing the roots that made the
                  fabric matter.
                </p>

                <small>
                  — INTHING / BRAND BELIEF
                </small>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DENIM */}
      <section
        id="denim"
        className="section denim-section"
      >
        <div className="container">
          <div className="section-topline">
            <span>
              02 / THE DENIM UNIVERSE
            </span>
            <span>DRAG / EXPLORE</span>
          </div>

          <div className="denim-heading">
            <Reveal>
              <h2>
                Details you can{" "}
                <em>feel.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p>
                Move through the collection of ideas
                behind every Inthing piece.
              </p>
            </Reveal>
          </div>

          <motion.div
            className="feature-rail"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
          >
            {denimCards.map(
              ([num, title, text, image], index) => (
                <motion.article
                  key={num}
                  className={`feature-card ${
                    activeCard === index
                      ? "active"
                      : ""
                  }`}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 50,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                    },
                  }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.12,
                    ease,
                  }}
                  onMouseEnter={() =>
                    setActiveCard(index)
                  }
                  whileHover={{
                    y: -10,
                  }}
                >
                  <div className="feature-image">
                    <motion.img
                      src={image}
                      alt={`${title} denim story`}
                      whileHover={{
                        scale: 1.07,
                      }}
                      transition={{
                        duration: 0.8,
                        ease,
                      }}
                    />

                    <motion.div
                      className="feature-image-overlay"
                      initial={{
                        opacity: 0,
                      }}
                      whileHover={{
                        opacity: 1,
                      }}
                    />
                  </div>

                  <div className="feature-meta">
                    <motion.span
                      whileHover={{
                        x: 4,
                      }}
                    >
                      {num}
                    </motion.span>

                    <h3>{title}</h3>
                  </div>

                  <p>{text}</p>

                  <motion.span
                    className="feature-arrow"
                    whileHover={{
                      x: 5,
                      y: -5,
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.article>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* IMPACT */}
      <section
        id="impact"
        className="section impact"
      >
        <div className="container">
          <div className="section-topline">
            <span>
              03 / PEOPLE & IMPACT
            </span>
            <span>
              THE HUMAN SIDE OF DENIM
            </span>
          </div>

          <div className="impact-layout">
            <div className="impact-copy">
              <Reveal>
                <p className="eyebrow">
                  MADE BY PEOPLE
                </p>

                <h2>
                  Better clothes start with{" "}
                  <em>better work.</em>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="impact-text">
                  A denim brand is a network of
                  people — cutters, stitchers,
                  washers, finishers, designers and
                  families. This section makes that
                  human layer visible rather than
                  hiding it behind the product.
                </p>
              </Reveal>
            </div>

            <div className="stat-stack">
              {content.stats.map(
                (stat, index) => (
                  <StatReveal
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    note={stat.note}
                    delay={index * 0.08}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto">
        <motion.div
          className="manifesto-bg"
          style={{
            scale: heroScale,
          }}
        >
          <motion.img
            src={content.images.blueDenim}
            alt=""
            initial={{
              scale: 1.12,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.6,
              ease,
            }}
          />
        </motion.div>

        <div className="container manifesto-content">
          <Reveal>
            <p className="eyebrow">
              THE INTHING WAY
            </p>
          </Reveal>

          <h2 className="manifesto-heading">
            <WordReveal>
              Make it useful.
            </WordReveal>
            <br />

            <WordReveal delay={0.12}>
              Make it last.
            </WordReveal>
            <br />

            <em>
              <WordReveal delay={0.24}>
                Make it yours.
              </WordReveal>
            </em>
          </h2>

          <Reveal delay={0.3}>
            <motion.a
              href="#contact"
              className="round-cta light"
              whileHover={{
                scale: 1.025,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <span>
                Start a conversation
              </span>

              <ArrowUpRight size={18} />
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="section contact"
      >
        <div className="container">
          <div className="section-topline">
            <span>04 / CONTACT</span>
            <span>
              LET'S BUILD THE NEXT PIECE
            </span>
          </div>

          <div className="contact-grid">
            <Reveal>
              <h2>
                Have an idea?
                <br />
                <em>
                  Let's make it wearable.
                </em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <motion.div
                className="contact-card"
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
              >
                <motion.a
                  href={`mailto:${content.contact.email}`}
                  variants={reveal}
                  transition={{
                    duration: 0.6,
                    ease,
                  }}
                >
                  <Mail size={17} />
                  {content.contact.email}
                </motion.a>

                <motion.a
                  href={`tel:${content.contact.phone}`}
                  variants={reveal}
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                    ease,
                  }}
                >
                  <Phone size={17} />
                  {content.contact.phone}
                </motion.a>

                <motion.span
                  variants={reveal}
                  transition={{
                    duration: 0.6,
                    delay: 0.16,
                    ease,
                  }}
                >
                  {content.contact.hours}
                </motion.span>

                <motion.a
                  href="https://www.instagram.com/p/Db5JpBbvkew/?igsi=MXQ5NXZqbHBjZjI2NA=="
                  target="_blank"
                  rel="noreferrer"
                  variants={reveal}
                  transition={{
                    duration: 0.6,
                    delay: 0.24,
                    ease,
                  }}
                >
                  <Instagram size={17} />
                  Instagram
                </motion.a>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container footer-grid">
          <div>
            <div className="wordmark footer-mark">
              <span className="wordmark-mark">
                ✦
              </span>
              inthing
              <span className="dot">.</span>
            </div>

            <p>
              Premium denim. Thoughtfully made.
            </p>
          </div>

          <div className="footer-links">
            <motion.a
              href="https://www.inthingjeans.com/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
            >
              Current website
            </motion.a>

            <motion.a
              href="https://www.instagram.com/p/Db5JpBbvkew/?igsi=MXQ5NXZqbHBjZjI2NA=="
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 4 }}
            >
              Instagram
            </motion.a>

            <motion.a
              href="#top"
              whileHover={{ x: 4 }}
            >
              Back to top ↑
            </motion.a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Inthing
          </span>

          <span>
            Designed as an original Inthing
            experience inspired by editorial
            textile storytelling.
          </span>
        </div>
      </footer>
    </main>
  );
}