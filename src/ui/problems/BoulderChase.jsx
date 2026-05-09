import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

export default function BoulderChase({ correctAnswer, onResult }) {
  const DURATION = 18; // seconds
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (!doneRef.current) {
            doneRef.current = true;
            setDone(true);
            onResult(false, null);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [onResult]);

  function submit(e) {
    e?.preventDefault();
    if (doneRef.current) return;
    const val = parseFloat(answer);
    if (isNaN(val)) return;
    clearInterval(timerRef.current);
    doneRef.current = true;
    setDone(true);
    onResult(val === correctAnswer, val);
  }

  const pct = (timeLeft / DURATION) * 100;
  const danger = pct < 30;
  // Boulder travels from ~5% to ~70% of track
  const boulderLeft = `${5 + (1 - pct / 100) * 60}%`;

  return (
    <div>
      {/* Arena */}
      <div className="boulder-arena">
        <div className="boulder-track">
          <div className="boulder-sprite" style={{ left: boulderLeft }}>
            <div className="boulder-pixel" />
          </div>
          <div className="player-sprite">
            <Icon name="hat" size={28} color="var(--sand)" />
          </div>
        </div>
        <div
          className={`boulder-timer-bar ${danger ? "danger" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Timer label */}
      <div className="flex-between mt-8">
        <span
          style={{ fontFamily: "var(--fp)", fontSize: 7, color: "var(--gray)" }}
        >
          BOULDER DISTANCE
        </span>
        <span
          style={{
            fontFamily: "var(--fp)",
            fontSize: 8,
            color: danger ? "var(--red2)" : "var(--sand)",
          }}
        >
          {timeLeft}s
        </span>
      </div>

      {/* Dialogue */}
      <div className="dialogue-box mt-12">
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          {done
            ? "..."
            : "The boulder is gaining! Solve it FAST or get flattened!"}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={submit} className="boulder-input-wrap">
        <input
          ref={inputRef}
          type="number"
          step="any"
          className="boulder-input"
          placeholder="TYPE ANSWER FAST..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={done}
        />
        <button
          className="px-btn px-btn-gold"
          type="submit"
          disabled={done || !answer.trim()}
          style={{ fontSize: 10, padding: "12px 20px" }}
        >
          GO!
        </button>
      </form>
    </div>
  );
}

// ── 2. TEMPLE LOCK ────────────────────────────────────────────────────────
