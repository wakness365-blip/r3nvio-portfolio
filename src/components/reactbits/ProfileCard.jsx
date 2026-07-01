import React, { useEffect, useRef } from "react";
import "./ProfileCard.css";

export default function ProfileCard({
  avatarUrl,
  iconUrl,
  name = "Александр",
  title = "Видео-монтаж / Motion design",
  handle = "r3nvio",
  status = "Открыт к проектам",
  contactText = "Связаться",
  onContactClick,
  className = "",
  enableTilt = true,
  behindGlowEnabled = true,
  innerGradient = "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 38%, rgba(8,8,8,0.72) 100%)",
}) {
  const wrapperRef = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    if (!enableTilt) return undefined;

    const wrapper = wrapperRef.current;
    const shell = shellRef.current;

    if (!wrapper || !shell) return undefined;

    let frameId = 0;
    let currentX = shell.clientWidth / 2;
    let currentY = shell.clientHeight / 2;
    let targetX = currentX;
    let targetY = currentY;
    let returningToRest = false;

    function setVariables(x, y) {
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = Math.max(0, Math.min(100, (x / width) * 100));
      const percentY = Math.max(0, Math.min(100, (y / height) * 100));
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      wrapper.style.setProperty("--pc-pointer-x", `${percentX}%`);
      wrapper.style.setProperty("--pc-pointer-y", `${percentY}%`);
      wrapper.style.setProperty("--pc-rotate-x", `${centerY / 6}deg`);
      wrapper.style.setProperty("--pc-rotate-y", `${-centerX / 7}deg`);
      wrapper.style.setProperty("--pc-shift-x", `${centerX / 12}px`);
      wrapper.style.setProperty("--pc-shift-y", `${centerY / 14}px`);
    }

    function tick() {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      setVariables(currentX, currentY);

      const settled = Math.abs(targetX - currentX) < 0.25 && Math.abs(targetY - currentY) < 0.25;

      if (settled) {
        frameId = 0;
        if (returningToRest) {
          shell.classList.remove("active");
        }
        return;
      }

      frameId = window.requestAnimationFrame(tick);
    }

    function run() {
      if (!frameId) {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    function updateFromEvent(event) {
      const rect = shell.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      returningToRest = false;
      shell.classList.add("active");
      run();
    }

    function handlePointerEnter(event) {
      updateFromEvent(event);
    }

    function handlePointerMove(event) {
      updateFromEvent(event);
    }

    function handlePointerLeave() {
      targetX = shell.clientWidth / 2;
      targetY = shell.clientHeight / 2;
      returningToRest = true;
      run();
    }

    setVariables(currentX, currentY);
    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enableTilt]);

  return (
    <div
      ref={wrapperRef}
      className={`profile-card-wrapper ${className}`.trim()}
      style={{
        "--pc-avatar-url": `url(${avatarUrl})`,
        "--pc-icon-url": iconUrl ? `url(${iconUrl})` : "none",
        "--pc-inner-gradient": innerGradient,
      }}
    >
      {behindGlowEnabled ? <div className="profile-card-behind" aria-hidden="true" /> : null}
      <div ref={shellRef} className="profile-card-shell">
        <article className="profile-card-surface">
          <span className="profile-card-grid" aria-hidden="true" />
          <span className="profile-card-orbit" aria-hidden="true" />
          <span className="profile-card-gloss" aria-hidden="true" />

          <div className="profile-card-topline">
            <span className="profile-card-kicker">R3NVIO / author frame</span>
            <span className="profile-card-status">{status}</span>
          </div>

          <div className="profile-card-portrait" aria-hidden="true">
            <span className="profile-card-frame" />
            <span className="profile-card-icon" />
            <span className="profile-card-serial">01</span>
            <img src={avatarUrl} alt="" />
          </div>

          <div className="profile-card-copy-panel">
            <div className="profile-card-meta">
              <p className="profile-card-handle">@{handle}</p>
              <span className="profile-card-meta-line" />
              <p className="profile-card-role">YouTube / Reels / TikTok</p>
            </div>

            <div className="profile-card-copy">
              <h3>{name}</h3>
              <p className="profile-card-title">{title}</p>
              <p className="profile-card-note">
                Чистый монтаж, точный ритм и визуальная подача без лишнего шума.
              </p>
            </div>

            <button className="profile-card-button" type="button" onClick={onContactClick}>
              {contactText}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
