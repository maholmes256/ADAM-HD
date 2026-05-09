import { useState } from 'react';
import { GRADE_TO_SPEC } from '../../services/mathProblem/specMap';
import Icon from './Icon';
import { generateChoices } from './utils';

export default function RelicDig({ correctAnswer, grade, onResult }) {
  const [choices] = useState(() =>
    generateChoices(correctAnswer, GRADE_TO_SPEC[grade]?.maxNum || 40),
  );
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const letters = ["A", "B", "C", "D"];

  function pick(val) {
    if (revealed) return;
    setSelected(val);
    setRevealed(true);
    const correct = val === correctAnswer;
    setTimeout(() => onResult(correct, val), 900);
  }

  return (
    <div>
      <div className="dialogue-box mt-8" style={{ marginBottom: 16 }}>
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          Excavate the correct answer from the rubble! Choose wisely — only one
          relic is genuine.
        </div>
      </div>
      <div className="relic-grid">
        {choices.map((val, i) => {
          let state = "";
          if (revealed) {
            if (val === correctAnswer) state = "correct";
            else if (val === selected) state = "wrong";
            else state = "missed";
          }
          return (
            <div
              key={val}
              className={`relic-choice ${revealed ? `revealed ${(state=="correct" && val==correctAnswer)?"correct" : "wrong"}` : ""}`}
              onClick={() => pick(val)}
            >
              {!revealed && <div className="relic-dust" />}
              <div className="relic-letter">{letters[i]}</div>
              <div className="relic-num">{val}</div>
              {revealed && state === "correct" && (
                <Icon name="check" size={16} color="var(--green2)" />
              )}
              {revealed && state === "wrong" && (
                <Icon name="cross" size={16} color="var(--red2)" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4. IDOL MATCH (drag & drop) ───────────────────────────────────────────
