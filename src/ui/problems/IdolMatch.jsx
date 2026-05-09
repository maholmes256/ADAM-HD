import { useState } from 'react';
import { GRADE_TO_SPEC } from '../../services/mathProblem/specMap';
import Icon from './Icon';
import { generateChoices } from './utils';

export default function IdolMatch({ exprStr, correctAnswer, grade, onResult }) {
  // Build the equation as tokens with one blank slot
  // e.g. "14 + __ = 21"  or  "__ + 7 = 12"
  const spec = GRADE_TO_SPEC[grade];
  const [tiles] = useState(() => {
    const wrong = generateChoices(correctAnswer, spec?.maxNum || 40).filter(
      (v) => v !== correctAnswer,
    );
    return [correctAnswer, ...wrong.slice(0, 3)].sort(
      () => Math.random() - 0.5,
    );
  });

  const [filled, setFilled] = useState(null); // value in blank
  const [draggingTile, setDraggingTile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [usedTile, setUsedTile] = useState(null);

  function handleDrop(e) {
    e.preventDefault();
    const val = parseInt(e.dataTransfer.getData("tile"), 10);
    if (!revealed) {
      setFilled(val);
      setUsedTile(val);
    }
    setDragOver(false);
    setDraggingTile(null);
  }

  function handleSubmit() {
    if (filled === null || revealed) return;
    setRevealed(true);
    const correct = filled === correctAnswer;
    setTimeout(() => onResult(correct, filled), 900);
  }

  function handleTileClick(val) {
    if (revealed) return;
    setFilled(val);
    setUsedTile(val);
  }

  const blankState = !revealed
    ? dragOver
      ? "drag-over"
      : filled !== null
        ? "filled"
        : ""
    : filled === correctAnswer
      ? "correct-fill"
      : "wrong-fill";

  return (
    <div>
      <div className="dialogue-box mt-8" style={{ marginBottom: 16 }}>
        <div
          className="vt"
          style={{ fontSize: 18, color: "var(--offwhite)", lineHeight: 1.5 }}
        >
          Drag the golden idol tile into the blank to complete the equation!
        </div>
      </div>

      {/* Equation display with blank */}
      <div
        style={{
          background: "var(--panel3)",
          border: "4px solid var(--border2)",
          padding: "20px 16px",
          boxShadow: "inset 3px 3px 0 0 rgba(0,0,0,0.4)",
        }}
      >
        <div className="idol-equation">
          <div className="idol-token">{exprStr}</div>
          <div className="idol-token">=</div>
          {/* Drop zone */}
          <div
            className={`idol-blank ${blankState}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {filled !== null ? filled : <span className="blink">?</span>}
            {revealed && (
              <div style={{ position: "absolute", top: -10, right: -10 }}>
                <Icon
                  name={filled === correctAnswer ? "check" : "cross"}
                  size={16}
                  color={
                    filled === correctAnswer ? "var(--green2)" : "var(--red2)"
                  }
                />
              </div>
            )}
          </div>
        </div>

        {/* Tiles */}
        <div className="idol-tiles">
          {tiles.map((val) => (
            <div
              key={val}
              className={`idol-tile ${usedTile === val ? "used" : ""} ${draggingTile === val ? "dragging" : ""}`}
              draggable={!revealed && usedTile !== val}
              onDragStart={(e) => {
                e.dataTransfer.setData("tile", val);
                setDraggingTile(val);
              }}
              onDragEnd={() => setDraggingTile(null)}
              onClick={() => handleTileClick(val)}
              title="Click or drag to place"
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      <button
        className="px-btn px-btn-gold w-full mt-12"
        onClick={handleSubmit}
        disabled={filled === null || revealed}
        style={{ fontSize: 9 }}
      >
        <Icon name="idol" size={14} color="var(--black)" />
        PLACE THE IDOL
      </button>
    </div>
  );
}
