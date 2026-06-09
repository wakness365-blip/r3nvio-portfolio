import { useRef } from "react";
import "./SpotlightCard.css";

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.18)",
}) {
  const ref = useRef(null);

  function handleMouseMove(event) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
    ref.current.style.setProperty("--spotlight-color", spotlightColor);
  }

  return (
    <div
      ref={ref}
      className={`rb-spotlight-card ${className}`.trim()}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}
