import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const languages = {
  ru: "RU",
  en: "EN",
};

const copy = {
  ru: {
    nav: { work: "Work", process: "Process", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Motion design / editing / UI visuals",
      status: "Открыт к проектам: Reels, UI motion, монтаж",
      title: "Визуал, который движется со смыслом.",
      description:
        "R3NVIO — личный креативный бренд про чистый моушн-дизайн, точный монтаж и премиальную визуальную подачу для короткого контента.",
      primary: "Смотреть портфолио",
      secondary: "Связаться",
    },
    work: {
      kicker: "Work",
      title: "Работы и визуальные кейсы.",
      soon: "скоро",
      download: "Скачать видео",
      openCase: "Открыть кейс",
    },
    process: {
      kicker: "Process",
      title: "Как собирается ролик: от смысла до финального UI-движения.",
      steps: [
        {
          title: "Идея",
          text: "Собираю задачу, настроение, референсы и главный визуальный акцент ролика.",
        },
        {
          title: "Монтаж",
          text: "Выстраиваю ритм, структуру, паузы, акценты и читаемость фрагмента.",
        },
        {
          title: "UI Motion",
          text: "Добавляю интерфейсные слои, плашки, кинетику, переходы и глубину.",
        },
        {
          title: "Sound & Finish",
          text: "Довожу SFX, финальную обработку, цвет и ощущение премиального кадра.",
        },
      ],
    },
    about: {
      kicker: "About",
      title: "Чистый моушн. Точный монтаж. Без визуального шума.",
      text:
        "Я создаю разные типы роликов с упором на ритм, читаемость, субтитры, саунд-дизайн и сдержанный моушн-дизайн. Этот сайт — основа для моего портфолио.",
      services: [
        "Монтаж Reels / Shorts",
        "UI motion design",
        "Анимированные субтитры",
        "Sound design & SFX",
        "Динамичный монтаж",
        "Цветокоррекция",
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Создадим следующую сильную визуальную работу.",
    },
    caseModal: {
      close: "× Закрыть",
      task: "Задача",
      role: "Роль",
      tools: "Инструменты",
      result: "Итог",
    },
    footer: "Motion design / editing / visual storytelling",
  },
  en: {
    nav: { work: "Work", process: "Process", about: "About", contact: "Contact" },
    hero: {
      eyebrow: "Motion design / editing / UI visuals",
      status: "Available for projects: Reels, UI motion, editing",
      title: "Visuals that move with intention.",
      description:
        "R3NVIO is a personal creative brand focused on clean motion design, precise editing, and premium visual direction for short-form content.",
      primary: "View portfolio",
      secondary: "Contact",
    },
    work: {
      kicker: "Work",
      title: "Work and visual cases.",
      soon: "soon",
      download: "Download video",
      openCase: "Open case",
    },
    process: {
      kicker: "Process",
      title: "How a video is built: from idea to polished UI motion.",
      steps: [
        {
          title: "Idea",
          text: "Define the brief, mood, references, and the main visual hook.",
        },
        {
          title: "Edit",
          text: "Shape pacing, structure, pauses, emphasis, and readability.",
        },
        {
          title: "UI Motion",
          text: "Add interface layers, panels, kinetic type, transitions, and depth.",
        },
        {
          title: "Sound & Finish",
          text: "Polish SFX, final treatment, color, and the premium frame feel.",
        },
      ],
    },
    about: {
      kicker: "About",
      title: "Clean motion. Precise editing. No visual noise.",
      text:
        "I create short-form videos with a focus on rhythm, readability, subtitles, sound design, and restrained UI motion. This site is the base for my portfolio.",
      services: [
        "Reels / Shorts editing",
        "UI motion design",
        "Animated subtitles",
        "Sound design & SFX",
        "Dynamic editing",
        "Color correction",
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let's create the next strong visual piece.",
    },
    caseModal: {
      close: "× Close",
      task: "Task",
      role: "Role",
      tools: "Tools",
      result: "Result",
    },
    footer: "Motion design / editing / visual storytelling",
  },
};

const portfolioItems = [
  {
    id: "podcast-ui",
    title: {
      ru: "Подкаст / UI-анимация",
      en: "Podcast / UI Animation",
    },
    type: "UI Motion",
    year: "2026",
    description: {
      ru: "Визуализация подкастного фрагмента через UI-сцену, glass-плашки, кинетический текст, пиктограммы, SFX и финальную стилизацию.",
      en: "A podcast fragment visualized through a UI scene, glass panels, kinetic text, icons, SFX, and final styling.",
    },
    videoSrc: "/portfolio/podcast-ui-animation.mp4",
    posterSrc: "/portfolio/podcast-ui-animation-poster.jpg",
    status: "ready",
    case: {
      ru: {
        task: "Превратить разговорный фрагмент в динамичный визуальный ролик, который удерживает внимание без перегруза.",
        role: "Монтаж, UI-композиция, моушн, SFX и финальная стилизация.",
        tools: "Premiere Pro, After Effects, UI panels, kinetic typography, SFX.",
        result: "Получился чистый подкастный кейс с интерфейсной подачей и читаемым ритмом.",
      },
      en: {
        task: "Turn a spoken podcast fragment into a dynamic visual piece that holds attention without clutter.",
        role: "Editing, UI composition, motion, SFX, and final styling.",
        tools: "Premiere Pro, After Effects, UI panels, kinetic typography, SFX.",
        result: "A clean podcast case with an interface-driven visual language and readable pacing.",
      },
    },
  },
  {
    id: "ui-ad",
    title: {
      ru: "UI-анимация / рекламный кейс",
      en: "UI Animation / Ad Case",
    },
    type: "UI Animation",
    year: "2026",
    description: {
      ru: "Короткая UI-анимация с графическими акцентами, чистой композицией, плавным движением и премиальной визуальной подачей.",
      en: "A short UI animation with graphic accents, clean composition, smooth motion, and a premium visual feel.",
    },
    videoSrc: "/portfolio/ui-ad-animation.mp4",
    posterSrc: "/portfolio/ui-ad-animation-poster.jpg",
    status: "ready",
    case: {
      ru: {
        task: "Сделать рекламный UI-ролик, который быстро считывается и выглядит технологично.",
        role: "UI-анимация, композиция, движение элементов и финальный визуальный полиш.",
        tools: "After Effects, shape animation, motion timing, sound accents.",
        result: "Короткий рекламный кейс с чистой структурой и сильным первым впечатлением.",
      },
      en: {
        task: "Create a UI ad piece that reads fast and feels modern and tech-forward.",
        role: "UI animation, composition, element motion, and final visual polish.",
        tools: "After Effects, shape animation, motion timing, sound accents.",
        result: "A compact ad case with a clean structure and strong first impression.",
      },
    },
  },
  {
    id: "ui-sfx",
    title: {
      ru: "UI-анимация / SFX кейс",
      en: "UI Animation / SFX Case",
    },
    type: "Motion / Sound Design",
    year: "2026",
    description: {
      ru: "UI/motion-ролик с акцентом на движение, саунд-дизайн, микро-SFX, ритм и финальную обработку.",
      en: "A UI/motion piece focused on movement, sound design, micro-SFX, rhythm, and final treatment.",
    },
    videoSrc: "/portfolio/ui-sfx-animation.mp4",
    posterSrc: "/portfolio/ui-sfx-animation-poster.jpg",
    status: "ready",
    case: {
      ru: {
        task: "Собрать короткий ролик, где звук и движение работают как единый интерфейсный удар.",
        role: "Моушн, SFX, ритм, монтажная сборка и финальный баланс.",
        tools: "After Effects, Premiere Pro, sound design, micro-interactions.",
        result: "Плотный короткий кейс с понятным ритмом и подчёркнутыми UI-акцентами.",
      },
      en: {
        task: "Build a short piece where sound and motion land as one interface-driven hit.",
        role: "Motion, SFX, pacing, edit assembly, and final balance.",
        tools: "After Effects, Premiere Pro, sound design, micro-interactions.",
        result: "A tight short case with clear rhythm and emphasized UI accents.",
      },
    },
  },
  {
    id: "steam-support",
    title: {
      ru: "Steam Support / UI-анимация",
      en: "Steam Support / UI Animation",
    },
    type: "UI Motion",
    year: "2026",
    description: {
      ru: "UI-анимация для Steam Support с динамичной подачей интерфейса, акцентами на действиях пользователя и чистым моушн-ритмом.",
      en: "UI animation for Steam Support with dynamic interface staging, user-action accents, and clean motion rhythm.",
    },
    videoSrc: "/portfolio/steam-support-animation.mp4",
    posterSrc: "/portfolio/steam-support-animation-poster.jpg",
    orientation: "portrait",
    status: "ready",
    case: {
      ru: {
        task: "Показать интерфейсный сценарий Steam Support как вертикальный UI-ролик для короткого формата.",
        role: "Вертикальный монтаж, UI-motion, акценты действий, адаптация под сайт.",
        tools: "After Effects, Premiere Pro, vertical layout, UI motion, web compression.",
        result: "Готовый вертикальный кейс, который теперь корректно открывается и скачивается с сайта.",
      },
      en: {
        task: "Present a Steam Support interface scenario as a vertical UI piece for short-form viewing.",
        role: "Vertical editing, UI motion, action accents, and website adaptation.",
        tools: "After Effects, Premiere Pro, vertical layout, UI motion, web compression.",
        result: "A finished vertical case that plays and downloads correctly from the site.",
      },
    },
  },
];

const contactLinks = [
  { label: "Telegram", icon: "send", href: "https://t.me/r3nvio" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/r3nvio0?igsh=eXEyMzlpNGh0dTJw&utm_source=qr" },
  { label: "Email", icon: "mail", href: "mailto:r3nvio@mail.ru" },
  { label: "ВКонтакте", icon: "vk", href: "https://vk.com/w3akness0" },
];

const logoAssets = {
  icon: "/assets/r3nvio_icon_offwhite.png",
  wordmark: "/assets/r3nvio_wordmark_white.png",
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
  console.assert(portfolioItems.filter((item) => item.status === "ready").every((item) => item.posterSrc && item.case), "Ready items need poster and case data");
  console.assert(Object.keys(copy).length === 2, "Expected two languages");
  console.assert(contactLinks.length === 4, "Expected 4 contact links");
  console.assert(contactLinks.every((link) => link.href && link.label && link.icon), "Every contact link needs label, href, and icon");
  console.assert(Object.values(logoAssets).every((src) => src.startsWith("/assets/")), "Logo assets should be served from /assets/");
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
    globe: (
      <svg {...common}>
        <circle {...strokeProps} cx="12" cy="12" r="8.5" />
        <path {...strokeProps} d="M3.8 12h16.4" />
        <path {...strokeProps} d="M12 3.5c2.1 2.1 3.1 4.9 3.1 8.5s-1 6.4-3.1 8.5" />
        <path {...strokeProps} d="M12 3.5C9.9 5.6 8.9 8.4 8.9 12s1 6.4 3.1 8.5" />
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
  const [lang, setLang] = useState("ru");
  const [activeCase, setActiveCase] = useState(null);
  const t = copy[lang];

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

        <div className="header-controls">
          <nav className="main-nav">
            <a href="#work">{t.nav.work}</a>
            <a href="#process">{t.nav.process}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="language-switch" aria-label="Language switcher">
            <Icon name="globe" className="small-icon" />
            {Object.entries(languages).map(([code, label]) => (
              <button key={code} type="button" className={lang === code ? "active" : ""} onClick={() => setLang(code)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <motion.section className="hero" style={{ y: heroY, opacity: heroOpacity }}>
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.14 }} className="hero-copy">
          <motion.div variants={fadeUp} className="eyebrow-pill">
            <Icon name="sparkles" className="small-icon" />
            {t.hero.eyebrow}
          </motion.div>

          <motion.div variants={fadeUp} className="availability-pill">
            <span />
            {t.hero.status}
          </motion.div>

          <motion.h1 variants={fadeUp}>{t.hero.title}</motion.h1>

          <motion.p variants={fadeUp} className="hero-description">
            {t.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#work" className="button button-light">
              {t.hero.primary}
              <Icon name="arrowUpRight" className="small-icon" />
            </a>
            <a href="#contact" className="button button-dark">{t.hero.secondary}</a>
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
                <div className="ui-preview-scene">
                  <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="ui-panel ui-panel-left">
                    <span>Motion</span>
                    <strong>00:14</strong>
                  </motion.div>

                  <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }} className="ui-panel ui-panel-right">
                    <span>Style</span>
                    <strong>Clean UI</strong>
                  </motion.div>

                  <motion.div animate={{ y: [0, -10, 0], rotate: [0, 0.7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="brand-core">
                    <div className="brand-core-orbit orbit-one" />
                    <div className="brand-core-orbit orbit-two" />
                    <div className="brand-core-inner">
                      <LogoImage src={logoAssets.icon} alt="R3NVIO logo" className="hero-logo-icon" />
                    </div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 13, repeat: Infinity, ease: "linear" }} className="rotating-ring" />
                  </motion.div>

                  <div className="ui-timeline">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>

                  <div className="hero-wordmark-wrap">
                    <LogoImage src={logoAssets.wordmark} alt="R3NVIO wordmark" className="hero-wordmark" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <section id="work" className="section">
        <motion.div initial={false} animate="visible" variants={sectionReveal}>
          <motion.div variants={fadeUp} className="section-heading">
            <div>
              <p>{t.work.kicker}</p>
              <h2>{t.work.title}</h2>
            </div>
          </motion.div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => {
              const iconName = index === 0 ? "monitor" : index === 1 ? "layers" : "cursor";
              const title = item.title[lang];
              const description = item.description[lang];

              return (
                <motion.article key={item.id} variants={cardReveal} whileHover={{ y: -8, scale: 1.015, rotate: index === 1 ? 0.4 : -0.4 }} transition={{ duration: 0.25 }} className={`portfolio-card${item.orientation === "portrait" ? " portrait-card" : ""}`}>
                  <div className={`video-frame${item.orientation === "portrait" ? " portrait-frame" : ""}`}>
                    {item.videoSrc ? (
                      <video className="portfolio-video" src={item.videoSrc} poster={item.posterSrc} loop playsInline controls preload="metadata" />
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
                    <span>{item.status === "soon" ? t.work.soon : item.year}</span>
                  </div>
                  {item.videoSrc ? (
                    <div className="video-actions">
                      <button type="button" className="case-button" onClick={() => setActiveCase(item)}>
                        {t.work.openCase}
                      </button>
                      <a href={item.videoSrc} download>
                        {t.work.download}
                      </a>
                    </div>
                  ) : null}
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </section>

      <motion.section id="process" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="section process-section">
        <div className="section-heading">
          <div>
            <p>{t.process.kicker}</p>
            <h2>{t.process.title}</h2>
          </div>
        </div>
        <div className="process-grid">
          {t.process.steps.map((step, index) => (
            <motion.div key={step.title} variants={cardReveal} className="process-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={sectionReveal} className="section about-section">
        <div>
          <p className="section-kicker">{t.about.kicker}</p>
          <h2>{t.about.title}</h2>
        </div>
        <div className="about-card">
          <p>{t.about.text}</p>
          <div className="services-grid">
            {t.about.services.map((service) => (
              <div key={service} className="service-item">{service}</div>
            ))}
          </div>
        </div>
      </motion.section>

      <section id="contact" className="section contact-section">
        <motion.div initial={{ opacity: 0, y: 60, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }} className="contact-card">
          <div>
            <p>{t.contact.kicker}</p>
            <h2>{t.contact.title}</h2>
          </div>
          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <ContactButton key={link.label} link={link} isPrimary={index === 0} />
            ))}
          </div>
        </motion.div>
      </section>

      {activeCase ? (
        <div className="case-modal">
          <div className="case-modal-card">
            <button type="button" className="video-modal-close" onClick={() => setActiveCase(null)}>
              {t.caseModal.close}
            </button>
            <p className="section-kicker">{activeCase.type}</p>
            <h2>{activeCase.title[lang]}</h2>
            <div className="case-modal-grid">
              {["task", "role", "tools", "result"].map((key) => (
                <div key={key} className="case-detail">
                  <span>{t.caseModal[key]}</span>
                  <p>{activeCase.case[lang][key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <footer className="site-footer">
        <div>
          <LogoImage src={logoAssets.icon} alt="R3NVIO icon" className="footer-logo" />
          <span>© 2026 R3NVIO</span>
        </div>
        <span>{t.footer}</span>
      </footer>
    </main>
  );
}
