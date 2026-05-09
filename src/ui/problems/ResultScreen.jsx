import Icon from './Icon';

export default function ResultScreen({
  correct,
  exprStr,
  correctAnswer,
  userAnswer,
  onNext,
  onRetry,
}) {
  const stars = correct ? 3 : userAnswer !== null ? 1 : 0;
  return (
    <div className="result-screen">
      <div className="result-icon">
        <Icon
          name={correct ? "star" : "cross"}
          size={56}
          color={correct ? "var(--sand)" : "var(--red2)"}
        />
      </div>
      <div
        style={{
          fontFamily: "var(--fp)",
          fontSize: 14,
          color: correct ? "var(--sand)" : "var(--red2)",
          textShadow: "1px 1px 0 var(--sand2)",
          lineHeight: 1.8,
          marginBottom: 8,
        }}
      >
        {correct ? "CORRECT!" : "WRONG!"}
      </div>
      <div
        className="vt"
        style={{ fontSize: 20, color: "var(--offwhite)", marginBottom: 16 }}
      >
        {correct
          ? "The temple doors swing open. Well done, adventurer!"
          : `The answer was ${correctAnswer}. Study your relics and try again!`}
      </div>

      <div className="result-stars">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`result-star ${s <= stars ? "earned" : ""}`}
            style={{ animationDelay: `${s * 0.15}s` }}
          >
            <Icon name="star" size={36} color="var(--sand)" />
          </div>
        ))}
      </div>

      <div
        style={{
          background: "var(--panel3)",
          border: "3px solid var(--border)",
          padding: "12px 20px",
          marginBottom: 20,
          display: "inline-block",
        }}
      >
        <div
          style={{
            fontFamily: "var(--fp)",
            fontSize: 8,
            color: "var(--gray)",
            marginBottom: 6,
          }}
        >
          EQUATION
        </div>
        <div
          style={{
            fontFamily: "var(--fp)",
            fontSize: 14,
            color: "var(--parch)",
          }}
        >
          {exprStr} = {correctAnswer}
        </div>
      </div>

      <div className="flex gap-10" style={{ justifyContent: "center" }}>
        {!correct && (
          <button className="px-btn px-btn-ghost" onClick={onRetry}>
            RETRY
          </button>
        )}
        <button
          className="px-btn px-btn-gold"
          onClick={onNext}
          style={{ fontSize: 10 }}
        >
          {correct ? "NEXT PROBLEM ▶" : "CONTINUE ▶"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN OVERLAY COMPONENT
// ══════════════════════════════════════════════════════════════════════════
