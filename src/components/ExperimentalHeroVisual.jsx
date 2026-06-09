import TiltedCard from "./reactbits/TiltedCard.jsx";

export default function ExperimentalHeroVisual() {
  return (
    <div className="experimental-hero-shell">
      <div className="experimental-hero-glow experimental-hero-glow-a" />
      <div className="experimental-hero-glow experimental-hero-glow-b" />
      <TiltedCard
        altText="R3NVIO identity frame"
        captionText="Digital Art / Experimental"
        containerHeight="620px"
        containerWidth="100%"
        displayOverlayContent
        imageHeight="min(74vw, 540px)"
        imageSrc="/assets/r3nvio_logo_vertical_preview_dark.png"
        imageWidth="min(74vw, 540px)"
        overlayContent={
          <div className="experimental-overlay">
            <span className="experimental-chip">React Bits mood</span>
            <div className="experimental-overlay-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        }
        rotateAmplitude={10}
        scaleOnHover={1.04}
        showMobileWarning={false}
        showTooltip
      />
    </div>
  );
}
