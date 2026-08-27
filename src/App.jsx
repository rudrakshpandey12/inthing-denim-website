import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  X
} from "lucide-react";
import { content } from "./data";

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({ href, children, className = "" }) {
  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.a>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = useMemo(
    () => [
      ["Story", "#story"],
      ["Denim", "#denim"],
      ["Impact", "#impact"],
      ["Contact", "#contact"]
    ],
    []
  );

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <header className="nav-wrap">
        <div className="nav container">
          <a className="wordmark" href="#top" aria-label="Inthing home">
            <span className="wordmark-mark">✦</span>
            <span>inthing<span className="dot">.</span></span>
          </a>

          <nav className="desktop-nav">
            {nav.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              aria-label="Toggle colour theme"
              onClick={() => setDark((v) => !v)}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="menu-btn"
              aria-label="Open menu"
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              className="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {nav.map(([label, href], i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenu(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="hero" ref={heroRef}>
        <div className="container hero-grid">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">PREMIUM DENIM / INDIA</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>
                Denim
                <span>with intent.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-lead">{content.intro}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <a href="#story" className="round-cta">
                <span>Explore the story</span>
                <ArrowDownRight size={18} />
              </a>
            </Reveal>
          </div>

          <motion.div className="hero-visual" style={{ y: heroY, scale: heroScale }}>
            <div className="hero-frame">
              <img src={content.images.hero} alt="Inthing denim campaign" />
              <div className="hero-stamp">
                <span>INTHING</span>
                <small>FIT • FABRIC • FORM</small>
              </div>
            </div>
            <p className="image-caption">01 / THE PIECE COMES FIRST</p>
          </motion.div>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>FIT</span><i>✦</i><span>FORM</span><i>✦</i><span>FABRIC</span><i>✦</i>
            <span>FIT</span><i>✦</i><span>FORM</span><i>✦</i><span>FABRIC</span><i>✦</i>
          </div>
        </div>
      </section>

      <section id="story" className="section story">
        <div className="container">
          <div className="section-topline">
            <span>01 / OUR STORY</span>
            <span>BUILT TO BE WORN</span>
          </div>

          <div className="story-grid">
            <Reveal>
              <h2>Not just a pair of jeans. <em>A point of view.</em></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="story-copy">
                <p>{content.description}</p>
                <p>
                  Inthing's existing brand story speaks about originality, quality,
                  innovation and fit. This redesign turns those ideas into a digital
                  experience instead of simply placing them on a page.
                </p>
                <MagneticLink href="#denim" className="text-link">
                  See what we obsess over <ArrowUpRight size={16} />
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <div className="editorial-grid">
            <Reveal className="editorial-large">
              <img src={content.images.craft} alt="Denim craftsmanship detail" />
              <span>CRAFT / 01</span>
            </Reveal>
            <Reveal delay={0.12} className="editorial-small">
              <div className="quote-card">
                <span className="quote-mark">“</span>
                <p>We stay forward-looking without losing the roots that made the fabric matter.</p>
                <small>— INTHING / BRAND BELIEF</small>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="denim" className="section denim-section">
        <div className="container">
          <div className="section-topline">
            <span>02 / THE DENIM UNIVERSE</span>
            <span>DRAG / EXPLORE</span>
          </div>
          <div className="denim-heading">
            <Reveal>
              <h2>Details you can <em>feel.</em></h2>
            </Reveal>
            <p>Move through the collection of ideas behind every Inthing piece.</p>
          </div>

          <div className="feature-rail">
            {[
              ["01", "Fit", "Proportion-first silhouettes that move with real bodies.", content.images.hero],
              ["02", "Fabric", "Texture, weight and wash are treated as part of the design.", content.images.denimTexture],
              ["03", "Construction", "The smallest seam can change how a garment feels.", content.images.seam],
              ["04", "Everyday", "Premium denim should work beyond the photograph.", content.images.lifestyle]
            ].map(([num, title, text, image], i) => (
              <motion.article
                key={num}
                className={`feature-card ${activeCard === i ? "active" : ""}`}
                onMouseEnter={() => setActiveCard(i)}
                whileHover={{ y: -8 }}
              >
                <div className="feature-image">
                  <img src={image} alt={`${title} denim story`} />
                </div>
                <div className="feature-meta">
                  <span>{num}</span>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
                <span className="feature-arrow"><ArrowUpRight size={18} /></span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="section impact">
        <div className="container">
          <div className="section-topline">
            <span>03 / PEOPLE & IMPACT</span>
            <span>THE HUMAN SIDE OF DENIM</span>
          </div>

          <div className="impact-layout">
            <div className="impact-copy">
              <Reveal>
                <p className="eyebrow">MADE BY PEOPLE</p>
                <h2>Better clothes start with <em>better work.</em></h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="impact-text">
                  A denim brand is a network of people — cutters, stitchers,
                  washers, finishers, designers and families. This section makes
                  that human layer visible rather than hiding it behind the product.
                </p>
              </Reveal>
            </div>

            <div className="stat-stack">
              {content.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.06}>
                  <div className="stat-row">
                    <strong>{stat.value}</strong>
                    <div>
                      <span>{stat.label}</span>
                      {stat.note && <small>{stat.note}</small>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-bg">
          <img src={content.images.blueDenim} alt="" />
        </div>
        <div className="container manifesto-content">
          <p className="eyebrow">THE INTHING WAY</p>
          <h2>Make it useful.<br />Make it last.<br /><em>Make it yours.</em></h2>
          <a href="#contact" className="round-cta light">
            <span>Start a conversation</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-topline">
            <span>04 / CONTACT</span>
            <span>LET'S BUILD THE NEXT PIECE</span>
          </div>
          <div className="contact-grid">
            <Reveal>
              <h2>Have an idea?<br /><em>Let's make it wearable.</em></h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="contact-card">
                <a href={`mailto:${content.contact.email}`}><Mail size={17} />{content.contact.email}</a>
                <a href={`tel:${content.contact.phone}`}><Phone size={17} />{content.contact.phone}</a>
                <span>{content.contact.hours}</span>
                <a
                  href="https://www.instagram.com/p/Db5JpBbvkew/?igsi=MXQ5NXZqbHBjZjI2NA=="
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={17} /> Instagram
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="wordmark footer-mark"><span className="wordmark-mark">✦</span>inthing<span className="dot">.</span></div>
            <p>Premium denim. Thoughtfully made.</p>
          </div>
          <div className="footer-links">
            <a href="https://www.inthingjeans.com/" target="_blank" rel="noreferrer">Current website</a>
            <a href="https://www.instagram.com/p/Db5JpBbvkew/?igsi=MXQ5NXZqbHBjZjI2NA==" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Inthing</span>
          <span>Designed as an original Inthing experience inspired by editorial textile storytelling.</span>
        </div>
      </footer>
    </main>
  );
}