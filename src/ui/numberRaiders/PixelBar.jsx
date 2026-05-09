export default function PixelBar({ pct, colorClass = "bar-sand", label, showPct = true }) {
  return (
    <div>
      {label && (
        <div className="flex-between mt-8" style={{ marginBottom: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 7,
              color: "var(--gray)",
              letterSpacing: "0.5px",
            }}
          >
            {label}
          </span>
          {showPct && (
            <span
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: 7,
                color: "var(--sand)",
              }}
            >
              {pct}%
            </span>
          )}
        </div>
      )}
      <div className="stat-bar-track">
        <div
          className={`stat-bar-fill ${colorClass}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
