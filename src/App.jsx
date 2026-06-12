import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProfileCard from "./components/reactbits/ProfileCard.jsx";
import SpotlightCard from "./components/reactbits/SpotlightCard.jsx";

const works = [
  {
    title: "Auto Reels",
    category: "Auto / Reels / Premiere Pro",
    description:
      "Вертикальный авто-ролик с живым темпом, чистыми субтитрами и подачей, заточенной под удержание внимания в ленте.",
    video: "/portfolio/match-cut.mp4",
    poster: "/portfolio/match-cut-poster.jpg",
    portrait: true,
    accent: "blue",
  },
  {
    title: "Подкаст: визуализация",
    category: "Подкаст / Shorts",
    description:
      "Фрагмент подкаста с крупными титрами, выразительными паузами и спокойной драматургией кадра.",
    video: "/portfolio/podkast-vizualizatsiya.mp4",
    poster: "/portfolio/podkast-vizualizatsiya-poster.jpg",
    portrait: true,
    accent: "cyan",
  },
  {
    title: "Steam Reels",
    category: "Promo / Motion",
    description:
      "Минималистичное промо с акцентом на свет, композицию и ощущение дорогого визуального ритма.",
    video: "/portfolio/stim-rils.mp4",
    poster: "/portfolio/stim-rils-poster.jpg",
    portrait: true,
    accent: "violet",
  },
  {
    title: "UI Монтаж",
    category: "Motion design / Interface",
    description:
      "Демонстрация интерфейса с упором на тайминг, микроанимации и ощущение дорогого цифрового продукта.",
    video: "/portfolio/process-montazha-ui.mp4",
    poster: "/portfolio/process-montazha-ui-poster.jpg",
    featured: true,
    accent: "cyan",
  },
  {
    title: "UI animation",
    category: "Social media edit",
    description:
      "Динамичный монтаж с ритмичными склейками, музыкальными акцентами и аккуратной архитектурой кадра.",
    video: "/portfolio/ui-motion.mp4",
    poster: "/portfolio/ui-motion-poster.jpg",
    accent: "blue",
  },
  {
    title: "Motivational Shorts",
    category: "YouTube / Shorts",
    description:
      "Короткий motivational edit с крупной графикой, резкими акцентами и быстрым визуальным посылом без лишнего шума.",
    video: "/portfolio/motivatsionnyy-podkast.mp4",
    poster: "/portfolio/motivatsionnyy-podkast-poster.jpg",
    accent: "silver",
  },
];

const portraitWorks = works.filter((work) => work.portrait);
const landscapeWorks = works.filter((work) => !work.portrait);

const approach = [
  {
    title: "Ритм",
    text: "Монтаж держится на темпе, паузах и акцентах, которые вовремя подхватывают внимание.",
  },
  {
    title: "Звук",
    text: "SFX, музыка и голос собираются в одну драматургию, а не существуют отдельно друг от друга.",
  },
  {
    title: "Детали",
    text: "Микроанимации, свет и композиция добавляют глубину и делают даже короткий ролик собранным.",
  },
  {
    title: "Формат",
    text: "Адаптирую под YouTube, соцсети, подкасты и промо, сохраняя читаемость и характер проекта.",
  },
];

const contacts = [
  { label: "Email", value: "r3nvio@mail.ru", href: "mailto:r3nvio@mail.ru" },
  { label: "Telegram", value: "@quasar241", href: "https://t.me/quasar241" },
  { label: "VK", value: "w3akness0", href: "https://vk.com/w3akness0" },
  { label: "Instagram", value: "@r3nvio0", href: "https://www.instagram.com/r3nvio0" },
];

const logoAssets = {
  icon: "/assets/r3nvio_icon_offwhite.png",
  portrait: "/assets/alexander-portrait-noir.png",
};

const ease = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease },
  },
};

const cardReveal = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease },
  },
};

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g"]);
const VIDEO_WARMUP_ROOT_MARGIN = "240px 0px";
function isDataSaverEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const connection = navigator.connection;
  return Boolean(connection?.saveData) || SLOW_CONNECTION_TYPES.has(connection?.effectiveType ?? "");
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function AnimatedText({ text, as: Tag = "p", className = "" }) {
  return (
    <Tag className={`split-text ${className}`.trim()} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="split-word-wrap" key={`${word}-${index}`} style={{ "--word-delay": `${index * 70}ms` }}>
          <span className="split-word">{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}

function BrandMark({ compact = false }) {
  return (
    <a className={compact ? "brand compact" : "brand"} href="#top" aria-label="r3nvio">
      <span className="brand-symbol">
        <img src={logoAssets.icon} alt="" />
      </span>
      <span className="brand-name">r3nvio</span>
    </a>
  );
}

function LightButton({ href, children, variant = "primary" }) {
  const opensNewTab = href.startsWith("http");

  return (
    <a
      className={`light-button ${variant}`}
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

function PortfolioVideo({ work }) {
  const previewRef = useRef(null);
  const videoRef = useRef(null);
  const playIntentRef = useRef(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [videoInstanceKey, setVideoInstanceKey] = useState(0);

  useEffect(() => {
    if (shouldLoadVideo || isDataSaverEnabled()) {
      return undefined;
    }

    const node = previewRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { rootMargin: VIDEO_WARMUP_ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!isActivated || !isReady || !playIntentRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Native controls stay available if autoplay is blocked after the source loads.
      } finally {
        playIntentRef.current = false;
      }
    };

    playVideo();
  }, [isActivated, isReady, videoInstanceKey]);

  function activateVideo() {
    playIntentRef.current = true;
    setHasError(false);
    setIsReady(false);
    setIsActivated(true);
    setShouldLoadVideo(true);
  }

  function retryVideo() {
    playIntentRef.current = true;
    setHasError(false);
    setIsReady(false);
    setIsActivated(true);
    setShouldLoadVideo(true);
    setVideoInstanceKey((currentKey) => currentKey + 1);
  }

  function handleVideoReady() {
    setIsReady(true);
  }

  function handleVideoError() {
    playIntentRef.current = false;
    setHasError(true);
    setIsReady(false);
  }

  return (
    <div className="work-preview" ref={previewRef}>
      <video
        key={`${work.video}-${videoInstanceKey}`}
        ref={videoRef}
        src={shouldLoadVideo ? work.video : undefined}
        poster={work.poster}
        controls={isActivated && !hasError}
        playsInline
        preload={isActivated ? "auto" : "metadata"}
        onCanPlay={handleVideoReady}
        onLoadedData={handleVideoReady}
        onError={handleVideoError}
      />

      {!isActivated && (
        <button
          type="button"
          className="video-overlay-button"
          onClick={activateVideo}
          aria-label={`Открыть видео ${work.title}`}
        >
          <span className="video-overlay-icon" aria-hidden="true">
            ►
          </span>
          <span>Открыть видео</span>
          <small>Загружается только по клику, чтобы не перегружать страницу.</small>
        </button>
      )}

      {isActivated && !isReady && !hasError && (
        <div className="video-status-overlay" aria-live="polite">
          <strong>Подгружаю видео…</strong>
          <span>Обычно это быстрее, потому что остальные ролики не тянут сеть одновременно.</span>
        </div>
      )}

      {hasError && (
        <div className="video-status-overlay is-error" role="alert">
          <strong>Видео не загрузилось с первого раза.</strong>
          <span>Можно повторить попытку или открыть файл напрямую в новой вкладке.</span>
          <div className="video-status-actions">
            <button type="button" className="video-inline-action" onClick={retryVideo}>
              Повторить
            </button>
            <a className="video-inline-action secondary" href={work.video} target="_blank" rel="noreferrer">
              Открыть файл
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkCard({ work }) {
  return (
    <motion.article className={`work-card video-card ${work.featured ? "featured" : ""} ${work.portrait ? "portrait" : ""} accent-${work.accent}`} variants={cardReveal}>
      <PortfolioVideo work={work} />
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
  const pointerRef = useRef({ x: 0, y: 0 });
  const cursorFrameRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const lightY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  useEffect(() => {
    return () => {
      if (cursorFrameRef.current !== null) {
        window.cancelAnimationFrame(cursorFrameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event) {
    if (!pageRef.current) return;

    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (cursorFrameRef.current !== null) {
      return;
    }

    cursorFrameRef.current = window.requestAnimationFrame(() => {
      cursorFrameRef.current = null;
      if (!pageRef.current) {
        return;
      }

      pageRef.current.style.setProperty("--cursor-x", `${pointerRef.current.x}px`);
      pageRef.current.style.setProperty("--cursor-y", `${pointerRef.current.y}px`);
    });
  }

  function scrollToContacts() {
    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main id="top" className="page page-noir" ref={pageRef} onPointerMove={handlePointerMove}>
      <div className="page-background" aria-hidden="true" />

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
        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.p variants={reveal} className="eyebrow">
            Video editing / motion design / cinematic cuts
          </motion.p>
          <motion.h1 variants={reveal}>r3nvio</motion.h1>
          <motion.div variants={reveal}>
            <AnimatedText
              as="h2"
              className="hero-title"
              text="Видеомонтаж и motion design для контента, который держит внимание с первого кадра."
            />
          </motion.div>
          <motion.p variants={reveal} className="hero-text">
            Собираю ролики для YouTube, соцсетей, промо и подкастов: ритм, звук, свет и чистая графика работают как одна система.
          </motion.p>
          <motion.div variants={reveal} className="hero-actions">
            <LightButton href="#works">Смотреть работы</LightButton>
            <LightButton href="#contacts" variant="ghost">
              Связаться
            </LightButton>
          </motion.div>
        </motion.div>

        <motion.a
          href="#works"
          className="hero-reel"
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          aria-label="Смотреть работы"
        >
          <div className="reel-stage">
            <span className="reel-line top" />
            <span className="reel-line bottom" />
            <span className="reel-badge">RHYTHM / LIGHT / CUT</span>
            <div className="reel-core">
              <span className="core-ring" />
              <span className="core-ring second" />
              <img className="reel-logo" src={logoAssets.icon} alt="r3nvio" />
            </div>
            <div className="timeline">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.a>
      </section>

      <motion.section
        id="works"
        className="section works-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div className="section-heading" variants={reveal}>
          <p>Работы</p>
          <AnimatedText as="h2" text="Избранные ролики с чистым монтажом, ритмом и вниманием к подаче." />
        </motion.div>

        <div className="works-stack">
          <motion.div className="grid-group" variants={reveal}>
            <div className="grid-label">Вертикаль / Reels</div>
            <div className="works-grid portrait-grid">
              {portraitWorks.map((work) => (
                <WorkCard key={work.title} work={work} />
              ))}
            </div>
          </motion.div>

          <motion.div className="grid-group" variants={reveal}>
            <div className="grid-label">Горизонталь / Motion</div>
            <div className="works-grid landscape-grid">
              {landscapeWorks.map((work) => (
                <WorkCard key={work.title} work={work} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="section about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="about-copy-shell" variants={reveal}>
          <SpotlightCard className="about-copy about-copy-noir" spotlightColor="rgba(176, 191, 226, 0.12)">
            <p className="section-kicker">О себе</p>
            <AnimatedText
              as="h2"
              text="Ритм, свет и чистая подача вместо визуального шума."
            />
            <p className="about-lead">
              Меня зовут Александр, я работаю под брендом R3NVIO. Занимаюсь видеомонтажом, motion design и визуальной подачей динамичного контента для YouTube, соцсетей, промо и подкастов.
            </p>
            <p className="about-secondary">
              Для меня хороший ролик начинается не с эффекта, а с ощущения: где сделать паузу, когда усилить звук, как дать кадру воздух и оставить зрителю только главное.
            </p>
          </SpotlightCard>
        </motion.div>

        <motion.div className="portrait-placeholder" variants={cardReveal}>
          <ProfileCard
            avatarUrl={logoAssets.portrait}
            iconUrl={logoAssets.icon}
            name="Александр"
            title="Видео-монтаж / Motion design / Visual storytelling"
            handle="r3nvio"
            status="Открыт к проектам"
            contactText="Написать"
            onContactClick={scrollToContacts}
            enableTilt
            innerGradient="linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015) 24%, rgba(10,9,8,0.82) 100%)"
          />
        </motion.div>
      </motion.section>

      <motion.section
        id="approach"
        className="section approach-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div className="section-heading compact-heading" variants={reveal}>
          <p>Подход</p>
          <AnimatedText as="h2" text="Коротко о том, на чем держится сильное и читаемое видео." />
        </motion.div>
        <div className="approach-grid">
          {approach.map((item, index) => (
            <motion.article className="approach-card" variants={cardReveal} key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contacts"
        className="section contacts-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={reveal}>
          <SpotlightCard className="contacts-panel contacts-panel-noir" spotlightColor="rgba(176, 191, 226, 0.1)">
            <div>
              <p className="section-kicker">Контакты</p>
              <AnimatedText
                as="h2"
                text="Открыт к проектам по видеомонтажу, motion design, YouTube, соцсетям и промо."
              />
            </div>
            <div className="contacts-list">
              {contacts.map((contact) => (
                <a
                  className="contact-link"
                  href={contact.href}
                  key={contact.label}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <strong>{contact.label}</strong>
                </a>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.section>

      <footer className="site-footer">
        <BrandMark compact />
        <span>Видеомонтаж / Motion design / YouTube / Соцсети / Промо</span>
      </footer>
    </main>
  );
}
