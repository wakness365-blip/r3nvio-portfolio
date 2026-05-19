import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

const works = [
  {
    title: "UI Motion Concept",
    category: "UI-анимация",
    description: "Анимация интерфейса с акцентом на тайминг, плавность и микро-движения.",
    video: "/portfolio/ui-ad-animation.mp4",
    poster: "/portfolio/ui-ad-animation-poster.jpg",
    featured: true,
    accent: "cyan",
  },
  {
    title: "Динамичный монтаж",
    category: "Short-form edit",
    description: "Короткий ролик с ритмичными склейками, звуковыми акцентами и чистой подачей.",
    video: "/portfolio/ui-sfx-animation.mp4",
    poster: "/portfolio/ui-sfx-animation-poster.jpg",
    accent: "blue",
  },
  {
    title: "Podcast Reel",
    category: "Вертикальный контент",
    description: "Фрагмент с субтитрами, темпом и минимальной графикой без визуального шума.",
    video: "/portfolio/podcast-ui-animation.mp4",
    poster: "/portfolio/podcast-ui-animation-poster.jpg",
    accent: "silver",
  },
  {
    title: "Product Visual",
    category: "Motion concept",
    description: "Минималистичная визуальная сцена с акцентом на свет, композицию и премиальность.",
    video: "/portfolio/steam-support-animation.mp4",
    poster: "/portfolio/steam-support-animation-poster.jpg",
    portrait: true,
    accent: "violet",
  },
  {
    title: "Visual Experiment",
    category: "Style test",
    description: "Тест атмосферы, контраста, движения и визуального ритма.",
    accent: "prism",
    abstract: true,
  },
];

const approach = [
  ["Ритм", "Монтаж строится вокруг темпа, пауз и акцентов."],
  ["Звук", "SFX, музыка и голос должны работать вместе с движением."],
  ["Детали", "Микро-анимации, свет и композиция создают ощущение качества."],
  ["Подача", "Каждый ролик должен выглядеть чисто, понятно и визуально дорого."],
];

const contacts = [
  ["Email", "r3nvio@mail.ru", "mailto:r3nvio@mail.ru"],
  ["Telegram", "@r3nvio", "https://t.me/r3nvio"],
  ["VK", "vk.com/w3akness0", "https://vk.com/w3akness0"],
  ["Instagram", "r3nvio0", "https://www.instagram.com/r3nvio0"],
];

const reveal = {
  hidden: { opacity: 0, y: 42 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function BrandMark({ compact = false }) {
  return (
    <a className={compact ? "brand compact" : "brand"} href="#top" aria-label="r3nvio">
      <span className="brand-symbol">r3</span>
      <span className="brand-name">r3nvio</span>
    </a>
  );
}

function LightButton({ href, children, variant = "primary" }) {
  const external = href.startsWith("http");

  return (
    <a className={`light-button ${variant}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function AbstractPreview() {
  return (
    <div className="abstract-preview" aria-hidden="true">
      <span className="scan-line" />
      <span className="glass-plate one" />
      <span className="glass-plate two" />
      <span className="glass-plate three" />
      <span className="motion-dot a" />
      <span className="motion-dot b" />
      <span className="motion-dot c" />
    </div>
  );
}

function WorkCard({ work, index }) {
  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -5;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    event.currentTarget.style.setProperty("--mx", `${x}px`);
    event.currentTarget.style.setProperty("--my", `${y}px`);
    event.currentTarget.style.setProperty("--rx", `${rotateX}deg`);
    event.currentTarget.style.setProperty("--ry", `${rotateY}deg`);
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  }

  return (
    <motion.article
      className={`work-card ${work.featured ? "featured" : ""} ${work.portrait ? "portrait" : ""} accent-${work.accent}`}
      variants={reveal}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ "--delay": `${index * 90}ms` }}
    >
      <div className="work-preview">
        {work.abstract ? (
          <AbstractPreview />
        ) : (
          <video src={work.video} poster={work.poster} muted loop playsInline preload="metadata" onMouseEnter={(event) => event.currentTarget.play()} onMouseLeave={(event) => event.currentTarget.pause()} />
        )}
      </div>
      <div className="work-info">
        <p>{work.category}</p>
        <h3>{work.title}</h3>
        <span>{work.description}</span>
      </div>
    </motion.article>
  );
}

export default function R3nvioPortfolio() {
  const pageRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const lightY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  function handlePointerMove(event) {
    if (!pageRef.current) return;
    pageRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
    pageRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
  }

  return (
    <main id="top" className="page" ref={pageRef} onPointerMove={handlePointerMove}>
      <motion.div className="scroll-bar" style={{ scaleX: scrollYProgress }} />
      <motion.div className="scene-light" style={{ y: lightY }} />
      <div className="grain" />
      <div className="cursor-light" />

      <header className="site-header">
        <BrandMark compact />
        <nav aria-label="Основная навигация">
          <a href="#works">Работы</a>
          <a href="#about">О себе</a>
          <a href="#approach">Подход</a>
          <a href="#contacts">Контакты</a>
        </nav>
      </header>

      <section className="hero">
        <motion.div className="hero-copy">
          <motion.p variants={reveal} className="eyebrow">Motion edit / short content / visual rhythm</motion.p>
          <motion.h1 variants={reveal}>r3nvio</motion.h1>
          <motion.h2 variants={reveal}>Монтаж и моушн-дизайн для короткого контента</motion.h2>
          <motion.p variants={reveal} className="hero-text">
            Создаю визуально точные ролики, где монтаж, звук и движение работают как единая система.
          </motion.p>
          <motion.div variants={reveal} className="hero-actions">
            <LightButton href="#works">Смотреть работы</LightButton>
            <LightButton href="#contacts" variant="ghost">Связаться</LightButton>
          </motion.div>
        </motion.div>

        <motion.div className="hero-reel" initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <div className="reel-stage">
            <span className="reel-line top" />
            <span className="reel-line bottom" />
            <span className="reel-badge">RHYTHM / LIGHT / CUT</span>
            <div className="reel-core">
              <span className="core-ring" />
              <span className="core-ring second" />
              <strong>r3</strong>
            </div>
            <div className="timeline">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section id="works" className="section works-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ staggerChildren: 0.08 }}>
        <div className="section-heading">
          <p>Работы</p>
          <h2>Избранные визуальные концепты, монтажные тесты и motion-сцены.</h2>
        </div>
        <div className="works-grid">
          {works.map((work, index) => (
            <WorkCard key={work.title} work={work} index={index} />
          ))}
        </div>
      </motion.section>

      <motion.section id="about" className="section about-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <motion.div className="about-copy" variants={reveal}>
          <p className="section-kicker">О себе</p>
          <h2>Ритм, свет и чистая подача вместо визуального шума.</h2>
          <p>
            Меня зовут Александр. Я занимаюсь монтажом, моушн-дизайном и визуальной подачей короткого контента под брендом r3nvio. В работе делаю упор на ритм, звук, детали и чистый премиальный визуал.
          </p>
        </motion.div>
        <motion.div className="portrait-placeholder" variants={reveal}>
          <span>Фото / Portrait</span>
        </motion.div>
      </motion.section>

      <motion.section id="approach" className="section approach-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ staggerChildren: 0.08 }}>
        <div className="section-heading compact-heading">
          <p>Подход</p>
          <h2>Коротко о том, на чем держится кадр.</h2>
        </div>
        <div className="approach-grid">
          {approach.map(([title, text], index) => (
            <motion.article className="approach-card" variants={reveal} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section id="contacts" className="section contacts-section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className="contacts-panel" variants={reveal}>
          <div>
            <p className="section-kicker">Контакты</p>
            <h2>Открыт к проектам по монтажу, motion design и короткому контенту.</h2>
          </div>
          <div className="contacts-list">
            {contacts.map(([label, value, href]) => (
              <a className="contact-link" href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
                <span>{label}</span>
                <strong>{value}</strong>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <footer className="site-footer">
        <BrandMark compact />
        <span>Монтаж / Моушн-дизайн / Короткий контент</span>
      </footer>
    </main>
  );
}
