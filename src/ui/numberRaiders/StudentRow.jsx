import PixelBar from './PixelBar';

export default function StudentRow({ s, showReset, onReset }) {
  return (
    <div className="student-row">
      <div className="student-avatar">{s.init}</div>
      <div style={{ flex: 1 }}>
        <div className="flex-between">
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: 8,
              color: "var(--white)",
            }}
          >
            {s.name}
          </span>
          <span className="px-badge badge-sand">LV {s.level}</span>
        </div>
        <div className="mt-8">
          <PixelBar pct={Math.round((s.xp % 200) / 2)} colorClass="bar-sand" />
        </div>
        <div className="flex gap-12 mt-8">
          <span
            style={{
              fontFamily: "var(--font-vt)",
              fontSize: 16,
              color: "var(--gray)",
            }}
          >
            ACC <span style={{ color: "var(--sand)" }}>{s.acc}%</span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-vt)",
              fontSize: 16,
              color: "var(--gray)",
            }}
          >
            STREAK <span style={{ color: "var(--green2)" }}>{s.streak}</span>
          </span>
        </div>
      </div>
      {showReset && (
        <button
          className="px-btn px-btn-red px-btn-sm"
          onClick={() => onReset?.(s.id)}
        >
          RESET
        </button>
      )}
    </div>
  );
}
