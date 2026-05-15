import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const portfolioItems = [
  {
    title: "Подкаст / UI-анимация",
    type: "UI Motion",
    year: "2026",
    description: "Визуализация подкастного фрагмента через UI-сцену, glass-плашки, кинетический текст, пиктограммы, SFX и финальную стилизацию.",
    videoSrc: "/portfolio/podcast-ui-animation.mp4",
    status: "ready",
  },
  {
    title: "UI-анимация / рекламный кейс",
    type: "UI Animation",
    year: "2026",
    description: "Короткая UI-анимация с графическими акцентами, чистой композицией, плавным движением и премиальной визуальной подачей.",
    videoSrc: "/portfolio/ui-ad-animation.mp4",
    status: "ready",
  },
  {
    title: "UI-анимация / SFX кейс",
    type: "Motion / Sound Design",
    year: "2026",
    description: "UI/motion-ролик с акцентом на движение, саунд-дизайн, микро-SFX, ритм и финальную обработку.",
    videoSrc: "/portfolio/ui-sfx-animation.mp4",
    status: "ready",
  },
  {
    title: "Steam Support / UI-анимация",
    type: "UI Motion",
    year: "2026",
    description: "UI-анимация для Steam Support с динамичной подачей интерфейса, акцентами на действиях пользователя и чистым моушн-ритмом.",
    videoSrc: "/portfolio/steam-support-animation.mp4",
    status: "ready",
  },
  {
    title: "Монтажный кейс",
    type: "Editing Case",
    year: "2026",
    description: "Место под будущий кейс с нарезкой, L/J-cuts, match cuts, музыкальным ритмом и саунд-дизайном.",
    videoSrc: "",
    status: "soon",
  },
  {
    title: "Motion / UI кейс",
    type: "Motion / UI",
    year: "2026",
    description: "Место под будущий моушн-кейс: UI-плашки, интерфейсная графика, переходы и финальная стилизация.",
    videoSrc: "",
    status: "soon",
  },
];

const services = [
  "Монтаж Reels / Shorts",
  "UI motion design",
  "Анимированные субтитры",
  "Sound design & SFX",
  "Динамичный монтаж",
  "Цветокоррекция",
];

const contactLinks = [
  { label: "Email", icon: "mail", href: "mailto:r3nvio@mail.ru" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/r3nvio0?igsh=eXEyMzlpNGh0dTJw&utm_source=qr" },
  { label: "Telegram", icon: "send", href: "https://t.me/r3nvio" },
  { label: "ВКонтакте", icon: "vk", href: "https://vk.com/w3akness0" },
];

const logoAssets = {
  icon: "/assets/r3nvio_icon_offwhite.png",
  wordmark: "/assets/r3nvio_wordmark_white.png",
  vertical: "/assets/r3nvio_logo_vertical_preview_dark.png",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 55, scale: 0.98, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 42, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

function runSelfTests() {
  if (typeof console === "undefined") return;

  console.assert(portfolioItems.length === 6, "Expected 6 portfolio items");
  console.assert(portfolioItems.every((item) => Object.prototype.hasOwnProperty.call(item, "videoSrc")), "Every portfolio item should include videoSrc");
  console.assert(portfolioItems.every((item) => item.title && item.type && item.year), "Every portfolio item needs title, type, and year");
  console.assert(services.length >= 6, "Expected at least 6 services");
  console.assert(contactLinks.length === 4, "Expected 4 contact links");
  console.assert(contactLinks.every((link) => link.href && link.label && link.icon), "Every contact link needs label, href, and icon");
  console.assert(Object.values(logoAssets).every((src) => src.startsWith("/assets/")), "Logo assets should be served from /assets/");
  console.assert(typeof sectionReveal.visible === "object", "Expected section reveal animation config");
  console.assert(typeof cardReveal.visible === "object", "Expected card reveal animation config");
}

runSelfTests();

function Icon({ name, className = "icon" }) {
  const common = {
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": "true",
  };

  const strokeProps = {
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    arrowUpRight: (
      <svg {...common}>
        <path {...strokeProps} d="M7 17L17 7" />
        <path {...strokeProps} d="M9 7h8v8" />
      </svg>
    ),
    sparkles: (
      <svg {...common}>
        <path {...strokeProps} d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5L12 3Z" />
        <path {...strokeProps} d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
      </svg>
    ),
    layers: (
      <svg {...common}>
        <path {...strokeProps} d="M12 3l9 5-9 5-9-5 9-5Z" />
        <path {...strokeProps} d="M3 12l9 5 9-5" />
        <path {...strokeProps} d="M3 16l9 5 9-5" />
      </svg>
    ),
    mail: (
      <svg {...common}>
        <path {...strokeProps} d="M4 6h16v12H4V6Z" />
        <path {...strokeProps} d="M4 7l8 6 8-6" />
      </svg>
    ),
    instagram: (
      <svg {...common}>
        <rect {...strokeProps} x="4" y="4" width="16" height="16" rx="5" />
        <circle {...strokeProps} cx="12" cy="12" r="3.2" />
        <path {...strokeProps} d="M17.2 6.8h.01" />
      </svg>
    ),
    send: (
      <svg {...common}>
        <path {...strokeProps} d="M21 3L10 14" />
        <path {...strokeProps} d="M21 3l-7 18-4-7-7-4 18-7Z" />
      </svg>
    ),
    vk: (
      <svg {...common}>
        <path {...strokeProps} d="M4 7.5c.15 7.1 3.75 10.3 10.1 10.3h.35v-4.05c2.25.22 3.95 1.85 4.65 4.05h3.25c-.9-3.28-3.25-5-4.72-5.65 1.47-.8 3.52-2.78 4.02-4.65h-2.95c-.65 2.02-2.5 3.85-4.25 4.02V7.5h-2.95v7.05c-1.83-.45-4.15-2.45-4.25-7.05H4Z" />
      </svg>
    ),
    monitor: (
      <svg {...common}>
        <rect {...strokeProps} x="3" y="5" width="18" height="12" rx="2" />
        <path {...strokeProps} d="M8 21h8" />
        <path {...strokeProps} d="M12 17v4" />
        <path d="M10 8.2v5.6l4.8-2.8L10 8.2Z" fill="currentColor" />
      </svg>
    ),
    cursor: (
      <svg {...common}>
        <path {...strokeProps} d="M5 3l14 9-6.5 1.2L9 20 5 3Z" />
      </svg>
    ),
  };

  return icons[name] || null;
}

function LogoImage({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} draggable="false" />;
}

function ContactButton({ link, isPrimary }) {
  const isExternal = link.href.startsWith("http");
  const className = isPrimary ? "contact-button primary" : "contact-button secondary";

  return (
    <a className={className} href={link.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
      <Icon name={link.icon} className="small-icon" />
      {link.label}
    </a>
  );
}

export default function R3nvioPortfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.35]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <main className="page">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <motion.div className="background-layer" style={{ y: backgroundY }}>
        <div className="glow glow-top" />
        <div className="glow glow-bottom" />
        <div className="radial-vignette" />
      </motion.div>

      <header className="site-header">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="brand">
          <div className="brand-icon-box">
            <LogoImage src={logoAssets.icon} alt="R3NVIO icon" className="brand-icon" />
          </div>
          <LogoImage src={logoAssets.wordmark} alt="R3NVIO" className="brand-wordmark" />
        </motion.div>

        <nav className="main-nav">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <motion.section className="hero" style={{ y: heroY, opacity: heroOpacity }}>
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.14 }} className="hero-copy">
          <motion.div variants={fadeUp} className="eyebrow-pill">
            <Icon name="sparkles" className="small-icon" />
            Motion design / editing / UI visuals
          </motion.div>

          <motion.h1 variants={fadeUp}>Визуал, который движется со смыслом.</motion.h1>

          <motion.p variants={fadeUp} className="hero-description">
            R3NVIO — личный креативный бренд про чистый моушн-дизайн, точный монтаж и премиальную визуальную подачу для короткого контента.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#work" className="button button-light">
              Смотреть портфолио
              <Icon name="arrowUpRight" className="small-icon" />
            </a>
            <a href="#contact" className="button button-dark">Связаться</a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="hero-preview">
          <div className="preview-shell">
            <div className="preview-window">
              <div className="window-bar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span className="preview-label">Preview</span>
              </div>

              <div className="motion-card">
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="floating-logo-card">
                  <div className="inner-border" />
                  <LogoImage src={logoAssets.icon} alt="R3NVIO logo" className="hero-logo-icon" />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} className="rotating-ring" />
                  <div className="hero-wordmark-wrap">
                    <LogoImage src={logoAssets.wordmark} alt="R3NVIO wordmark" className="hero-wordmark" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section id="work" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22, margin: "-120px" }} variants={sectionReveal}>
          <motion.div variants={fadeUp} className="section-heading">
            <div>
              <p>Work</p>
              <h2>Избранные работы и будущие кейсы.</h2>
            </div>
          </motion.div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => {
              const iconName = index === 0 ? "monitor" : index === 1 ? "layers" : "cursor";

              return (
                <motion.article key={item.title} variants={cardReveal} whileHover={{ y: -8, scale: 1.015, rotate: index === 1 ? 0.4 : -0.4 }} transition={{ duration: 0.25 }} className="portfolio-card">
                  <div className="video-frame">
                    {item.videoSrc ? (
                      <video className="portfolio-video" src={item.videoSrc} loop playsInline controls preload="metadata" />
                    ) : (
                      <div className="video-placeholder">
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ delay: index * 0.2, duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="placeholder-icon">
                          <Icon name={iconName} className="portfolio-icon" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                  <div className="card-meta">
                    <span>{item.type}</span>
                    <span>{item.status === "soon" ? "скоро" : item.year}</span>
                  </div> 
                 {item.videoSrc ? (
  <div className="video-actions">
    <a href={item.videoSrc} download>
      Скачать видео
    </a>
  </div>
) : null}
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionReveal} className="section about-section">
        <div>
          <p className="section-kicker">About</p>
          <h2>Чистый моушн. Точный монтаж. Без визуального шума.</h2>
        </div>
        <div className="about-card">
          <p>
            Я создаю разные типы роликов с упором на ритм, читаемость, субтитры, саунд-дизайн и сдержанный моушн-дизайн. Этот сайт — основа для моего портфолио.
          </p>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service} className="service-item">{service}</div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="contact" className="section contact-section">
        <motion.div initial={{ opacity: 0, y: 60, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="contact-card">
          <div>
            <p>Contact</p>
            <h2>Создадим следующую сильную визуальную работу.</h2>
          </div>
          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <ContactButton key={link.label} link={link} isPrimary={index === 0} />
            ))}
          </div>
        </motion.div>
      </section>

     {activeVideo ? (
  <div className="video-modal">
    <button
      type="button"
      className="video-modal-close"
      onClick={() => setActiveVideo(null)}
    >
      × Закрыть
    </button>

    <video
      className="video-modal-player"
      src={activeVideo}
      controls
    />
  </div>
) : null}
 <footer className="site-footer">
        <div>
          <LogoImage src={logoAssets.icon} alt="R3NVIO icon" className="footer-logo" />
          <span>© 2026 R3NVIO</span>
        </div>
        <span>Motion design / editing / visual storytelling</span>
      </footer>
    </main>
  );
}
