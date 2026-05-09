import { useState } from 'react';
import Icon from './Icon';

export default function TempleLock({ correctAnswer, onResult }) {
  const [display, setDisplay] = useState("");
  const [opening, setOpening] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);
  const maxLen = String(correctAnswer).length + 1;

  function pressKey(val) {
    if (done) return;
    if (val === "CLR") {
      setDisplay("");
      setWrong(false);
      return;
    }
    if (val === "DEL") {
      setDisplay((d) => d.slice(0, -1));
      return;
    }
    if (val === "OK") {
      submit();
      return;
    }
    if (display.length >= maxLen) return;
    setDisplay((d) => d + val);
  }

  function submit() {
    if (done || !display) return;
    const val = parseFloat(display);
    if (val === correctAnswer) {
      setOpening(true);
      setDone(true);
      setTimeout(() => onResult(true, val), 900);
    } else {
      setWrong(true);
      setDisplay("");
      setTimeout(() => setWrong(false), 600);
      setTimeout(() => onResult(false, val), 600);
    }
  }

  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "CLR", "0", "DEL"];

  return (
    <div className="temple-door-wrap">
      {/* Left door */}
      <div className="temple-door">
        <div
          className={`door-panel ${opening ? "opening-left" : ""}`}
          style={{ borderRight: "2px solid var(--border)" }}
        >
          {[0, 40, 80].map((top) => (
            <div key={top} className="door-plank" style={{ top }} />
          ))}
          <div
            className={`door-lock-icon ${opening ? "unlocked" : wrong ? "" : ""}`}
            style={{
              borderColor: wrong
                ? "var(--red)"
                : opening
                  ? "var(--green)"
                  : undefined,
              background: wrong
                ? "var(--red)"
                : opening
                  ? "var(--green)"
                  : undefined,
            }}
          >
            <Icon
              name={opening ? "check" : "lock"}
              size={18}
              color={
                opening
                  ? "var(--green2)"
                  : wrong
                    ? "var(--red2)"
                    : "var(--sand)"
              }
            />
          </div>
        </div>
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 6, color: "var(--gray)" }}
        >
          DOOR A
        </span>
      </div>

      {/* Right door */}
      <div className="temple-door">
        <div
          className={`door-panel ${opening ? "opening-right" : ""}`}
          style={{ borderLeft: "2px solid var(--border)" }}
        >
          {[0, 40, 80].map((top) => (
            <div key={top} className="door-plank" style={{ top }} />
          ))}
          <div
            className={`door-lock-icon ${opening ? "unlocked" : ""}`}
            style={{
              borderColor: opening ? "var(--green)" : undefined,
              background: opening ? "var(--green)" : undefined,
            }}
          >
            <Icon
              name={opening ? "check" : "lock"}
              size={18}
              color={opening ? "var(--green2)" : "var(--sand)"}
            />
          </div>
        </div>
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 6, color: "var(--gray)" }}
        >
          DOOR B
        </span>
      </div>

      {/* Numpad */}
      <div className="temple-numpad">
        <div
          className="numpad-display"
          style={{
            color: wrong
              ? "var(--red2)"
              : display
                ? "var(--sand)"
                : "var(--border2)",
          }}
        >
          {wrong ? "WRONG!" : display || "_ _ _"}
        </div>
        <div className="numpad-grid">
          {keys.map((k) => (
            <div
              key={k}
              className={`numpad-key ${k === "CLR" || k === "DEL" ? "clr" : ""}`}
              onClick={() => pressKey(k)}
            >
              {k}
            </div>
          ))}
        </div>
        <div
          className="numpad-key enter w-full mt-8"
          onClick={submit}
          style={{ marginTop: 6 }}
        >
          UNLOCK DOOR
        </div>
      </div>
    </div>
  );
}

// ── 3. RELIC DIG ─────────────────────────────────────────────────────────
