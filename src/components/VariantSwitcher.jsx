const LABELS = {
  noir: "Cinematic Noir",
  experimental: "Digital Art",
};

export default function VariantSwitcher({ variant, onChange }) {
  return (
    <div className="variant-switcher" aria-label="Preview variants">
      <p>Preview mode</p>
      <div className="variant-switcher-buttons">
        {Object.entries(LABELS).map(([key, label]) => (
          <button
            key={key}
            className={variant === key ? "active" : ""}
            onClick={() => onChange(key)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
