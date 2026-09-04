import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
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

const homeCards = [
  {
    number: "01",
    category: "HERITAGE",
    title: "ROOTED IN WHERE WE BEGAN.",
    text: "A family-led journey shaped by decades of experience and a passion for denim.",
    image: content.images.craft,
    href: "/story",
  },
  {
    number: "02",
    category: "CRAFT",
    title: "MADE WITH INTENTION.",
    text: "From the fabric to the final fit, every detail is considered with purpose.",
    image: content.images.denimTexture,
    href: "#denim",
  },
  {
    number: "03",
    category: "DENIM",
    title: "DESIGNED FOR REAL LIFE.",
    text: "Modern fits, considered details and effortless comfort — denim made to move with you.",
    image: content.images.lifestyle,
    href: "#denim",
  },
  {
    number: "04",
    category: "FUTURE",
    title: "TRADITION THAT MOVES FORWARD.",
    text: "Honouring our roots while continuously evolving denim for what's next.",
    image: content.images.blueDenim,
    href: "/sustainability",
  },
];

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
  const [homeActiveCard, setHomeActiveCard] = useState(0);
  const [isMobileHome, setIsMobileHome] = useState(false);
  const [isHomeTouching, setIsHomeTouching] = useState(false);

  const homeTouchStartX = useRef(0);
  const homeTouchStartY = useRef(0);
  
  const { scrollYProgress } = useScroll();
 

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)");

    const updateMobileState = () => {
      setIsMobileHome(mediaQuery.matches);
    };

    updateMobileState();

    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  

  const nav = useMemo(
    () => [
      ["Story", "#story"],
      ["Denim", "#denim"],
      ["Sustainability", "/sustainability"],
      ["Impact", "#impact"],
      ["Contact", "#contact"]
    ],
    []
  );

  const nextHomeCard = () => {
    setHomeActiveCard((current) => (current + 1) % homeCards.length);
  };

  const previousHomeCard = () => {
    setHomeActiveCard(
      (current) => (current - 1 + homeCards.length) % homeCards.length,
    );
  };

  const goToHomeCard = (index) => {
    setHomeActiveCard(index);
  };

  useEffect(() => {
    if (isHomeTouching) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setHomeActiveCard((current) => (current + 1) % homeCards.length);
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, [isHomeTouching]);

  const handleHomeTouchStart = (event) => {
    homeTouchStartX.current = event.touches[0].clientX;
    homeTouchStartY.current = event.touches[0].clientY;

    setIsHomeTouching(true);
  };

  const handleHomeTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - homeTouchStartX.current;
    const deltaY = endY - homeTouchStartY.current;

    setIsHomeTouching(false);

    if (Math.abs(deltaX) < 50) return;

    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      nextHomeCard();
    } else {
      previousHomeCard();
    }
  };

  return (
    <main>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="nav-wrap">
        <div className="nav container">
          <a className="wordmark" href="#top" aria-label="Inthing home">
            <span className="wordmark-mark">✦</span>
            <span>
              inthing<span className="dot">.</span>
            </span>
          </a>

          <nav className="desktop-nav">
            {nav.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
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

      {/* =====================================================
    NEW HOME HERO
    ===================================================== */}

      <section id="top" className="home-intro">
        <div className="container">
          <div className="home-intro-grid">
            {/* =========================
          LEFT — HERO CONTENT
          ========================= */}
            <div className="home-intro-copy">
              <Reveal>
                <p className="home-intro-kicker">PREMIUM DENIM / INDIA</p>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="home-intro-title">
                  Denim
                  <span>with</span>
                  <span>intent.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="home-intro-description">{content.intro}</p>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="home-intro-meta">
                  <div className="home-intro-meta-label">
                    <strong>01 / THE PIECE COMES FIRST</strong>
                    FIT • FABRIC • FORM
                  </div>

                  <a href="#story" className="home-intro-cta">
                    <span>Explore the story</span>
                    <ArrowDownRight size={17} />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* =========================
          RIGHT — FEATURE SLIDER
          ========================= */}
            <div className="home-feature-area">
              {/* DESKTOP / TABLET */}
              <div className="home-feature-desktop">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={homeCards[homeActiveCard].number}
                    className="home-feature-big-card"
                    initial={{
                      opacity: 0,
                      x: 45,
                      scale: 0.985,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -45,
                      scale: 0.985,
                    }}
                    transition={{
                      duration: 0.55,
                      ease,
                    }}
                    onTouchStart={handleHomeTouchStart}
                    onTouchEnd={handleHomeTouchEnd}
                    onTouchCancel={() => setIsHomeTouching(false)}
                  >
                    {/* IMAGE */}
                    <div className="home-feature-card-image">
                      <img
                        src={homeCards[homeActiveCard].image}
                        alt={homeCards[homeActiveCard].title}
                        draggable="false"
                      />
                    </div>

                    {/* DARK GRADIENT */}
                    <div className="home-feature-card-overlay" />

                    {/* TOP INFORMATION */}
                    <div className="home-feature-card-top">
                      <span className="home-feature-card-number">
                        {homeCards[homeActiveCard].number}
                      </span>

                      <span className="home-feature-card-category">
                        {homeCards[homeActiveCard].category}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="home-feature-card-content">
                      <h3>{homeCards[homeActiveCard].title}</h3>

                      <p>{homeCards[homeActiveCard].text}</p>
                    </div>

                    {/* CARD ARROW */}
                    <a
                      href={homeCards[homeActiveCard].href}
                      className="home-feature-card-arrow"
                      aria-label={`Explore ${homeCards[homeActiveCard].category}`}
                    >
                      <ArrowUpRight size={20} />
                    </a>
                  </motion.article>
                </AnimatePresence>

                {/* =========================
              SLIDER CONTROLS
              ========================= */}
                <div className="home-feature-desktop-controls">
                  <div className="home-feature-desktop-counter">
                    <strong>
                      {String(homeActiveCard + 1).padStart(2, "0")}
                    </strong>

                    <span>/ 04</span>
                  </div>

                  <div className="home-feature-desktop-dots">
                    {homeCards.map((card, index) => (
                      <button
                        key={card.number}
                        type="button"
                        className={homeActiveCard === index ? "is-active" : ""}
                        onClick={() => goToHomeCard(index)}
                        aria-label={`Go to card ${index + 1}`}
                        aria-current={
                          homeActiveCard === index ? "true" : undefined
                        }
                      />
                    ))}
                  </div>

                  <div className="home-feature-desktop-arrows">
                    <button
                      type="button"
                      onClick={previousHomeCard}
                      aria-label="Previous feature"
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={nextHomeCard}
                      aria-label="Next feature"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* =========================
            MOBILE
            ========================= */}
              <div
                className="home-feature-mobile"
                onTouchStart={handleHomeTouchStart}
                onTouchEnd={handleHomeTouchEnd}
                onTouchCancel={() => setIsHomeTouching(false)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={homeCards[homeActiveCard].number}
                    className="home-feature-mobile-card"
                    initial={{
                      opacity: 0,
                      x: 45,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -45,
                    }}
                    transition={{
                      duration: 0.42,
                      ease,
                    }}
                  >
                    <div className="home-feature-card-image">
                      <img
                        src={homeCards[homeActiveCard].image}
                        alt={homeCards[homeActiveCard].title}
                        draggable="false"
                      />
                    </div>

                    <div className="home-feature-card-overlay" />

                    <div className="home-feature-card-top">
                      <span className="home-feature-card-number">
                        {homeCards[homeActiveCard].number}
                      </span>

                      <span className="home-feature-card-category">
                        {homeCards[homeActiveCard].category}
                      </span>
                    </div>

                    <div className="home-feature-card-content">
                      <h3>{homeCards[homeActiveCard].title}</h3>

                      <p>{homeCards[homeActiveCard].text}</p>
                    </div>

                    <a
                      href={homeCards[homeActiveCard].href}
                      className="home-feature-card-arrow"
                      aria-label={`Explore ${homeCards[homeActiveCard].category}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  </motion.article>
                </AnimatePresence>

                <div className="home-feature-mobile-controls">
                  <div className="home-feature-mobile-arrows">
                    <button
                      type="button"
                      onClick={previousHomeCard}
                      aria-label="Previous card"
                    >
                      <ArrowLeft size={17} />
                    </button>

                    <button
                      type="button"
                      onClick={nextHomeCard}
                      aria-label="Next card"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>

                  <div className="home-feature-dots">
                    {homeCards.map((card, index) => (
                      <button
                        key={card.number}
                        type="button"
                        className={`home-feature-dot ${
                          homeActiveCard === index ? "is-active" : ""
                        }`}
                        onClick={() => goToHomeCard(index)}
                        aria-label={`Go to card ${index + 1}`}
                        aria-current={
                          homeActiveCard === index ? "true" : undefined
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="home-feature-mobile-label">
                  <span>Swipe to explore</span>

                  <span>
                    {String(homeActiveCard + 1).padStart(2, "0")}
                    {" / 04"}
                  </span>
                </div>
              </div>
            </div>
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
              <h2>
                Not just a pair of jeans. <em>A point of view.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="story-copy">
                <p>{content.description}</p>
                <p>
                  Inthing's existing brand story speaks about originality,
                  quality, innovation and fit. This redesign turns those ideas
                  into a digital experience instead of simply placing them on a
                  page.
                </p>
                <MagneticLink href="/story" className="text-link">
                  Read our full story <ArrowUpRight size={16} />
                </MagneticLink>
                <MagneticLink href="#denim" className="text-link">
                  See what we obsess over <ArrowUpRight size={16} />
                </MagneticLink>
              </div>
            </Reveal>
          </div>

          <div className="editorial-grid">
            <Reveal className="editorial-large">
              <img
                src={content.images.craft}
                alt="Denim craftsmanship detail"
              />
              <span>CRAFT / 01</span>
            </Reveal>
            <Reveal delay={0.12} className="editorial-small">
              <div className="quote-card">
                <span className="quote-mark">“</span>
                <p>
                  We stay forward-looking without losing the roots that made the
                  fabric matter.
                </p>
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
              <h2>
                Details you can <em>feel.</em>
              </h2>
            </Reveal>
            <p>
              Move through the collection of ideas behind every Inthing piece.
            </p>
          </div>

          <div className="feature-rail">
            {[
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
                <span className="feature-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="section impact">
        <div className="container">
          <div className="section-topline">
            <span>04 / PEOPLE & IMPACT</span>
            <span>THE HUMAN SIDE OF DENIM</span>
          </div>

          <div className="impact-layout">
            <div className="impact-copy">
              <Reveal>
                <p className="eyebrow">MADE BY PEOPLE</p>
                <h2>
                  Better clothes start with <em>better work.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="impact-text">
                  A denim brand is a network of people — cutters, stitchers,
                  washers, finishers, designers and families. This section makes
                  that human layer visible rather than hiding it behind the
                  product.
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
      <section className="section sustainability-teaser">
        <div className="container">
          <div className="section-topline">
            <span>03 / SUSTAINABILITY</span>
            <span>RETHINKING THE BLUE</span>
          </div>

          <div className="sustainability-teaser-grid">
            <Reveal>
              <div className="sustainability-teaser-copy">
                <p className="eyebrow">BEING FUNDAMENTALLY</p>

                <h2>
                  Better denim
                  <br />
                  starts with
                  <br />
                  <em>better thinking.</em>
                </h2>

                <p>
                  Producing a single pair of jeans takes 3,800 litres of water.
                  We're rethinking the blue through 3D visualization, laser
                  fading and ozone washing.
                </p>

                <a href="/sustainability" className="round-cta">
                  <span>Explore sustainability</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a href="/sustainability" className="sustainability-teaser-image">
                <img src={content.images.denimTexture} alt="Denim texture" />

                <div className="sustainability-teaser-overlay" />

                <span>
                  3,800 L<small>water rethink</small>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="manifesto">
        <div className="manifesto-bg">
          <img src={content.images.blueDenim} alt="" />
        </div>
        <div className="container manifesto-content">
          <p className="eyebrow">THE INTHING WAY</p>
          <h2>
            Make it useful.
            <br />
            Make it last.
            <br />
            <em>Make it yours.</em>
          </h2>
          <a href="#contact" className="round-cta light">
            <span>Start a conversation</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-topline">
            <span>05 / CONTACT</span>
            <span>LET'S BUILD THE NEXT PIECE</span>
          </div>
          <div className="contact-grid">
            <Reveal>
              <h2>
                Have an idea?
                <br />
                <em>Let's make it wearable.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="contact-card">
                <a href={`mailto:${content.contact.email}`}>
                  <Mail size={17} />
                  {content.contact.email}
                </a>
                <a href={`tel:${content.contact.phone}`}>
                  <Phone size={17} />
                  {content.contact.phone}
                </a>
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
            <div className="wordmark footer-mark">
              <span className="wordmark-mark">✦</span>inthing
              <span className="dot">.</span>
            </div>
            <p>Premium denim. Thoughtfully made.</p>
          </div>
          <div className="footer-links">
            <a
              href="https://www.inthingjeans.com/"
              target="_blank"
              rel="noreferrer"
            >
              Current website
            </a>
            <a
              href="https://www.instagram.com/p/Db5JpBbvkew/?igsi=MXQ5NXZqbHBjZjI2NA=="
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Inthing</span>
          <span>
            Designed as an original Inthing experience inspired by editorial
            textile storytelling.
          </span>
        </div>
      </footer>
    </main>
  );
}