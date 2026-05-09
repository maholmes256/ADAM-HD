import { useEffect, useState } from 'react';
import { generateProblem, evalExpr, exprToString } from '../services/mathProblem/generator';
import { storeProblem, validateAnswer } from '../firebase/problemQueries';
import { useAuth } from '../firebase/AuthContext';
import BoulderChase from './problems/BoulderChase';
import Icon from './problems/Icon';
import IdolMatch from './problems/IdolMatch';
import RelicDig from './problems/RelicDig';
import ResultScreen from './problems/ResultScreen';
import TempleLock from './problems/TempleLock';
import { MINI_GAME_LABELS, MINI_GAMES } from './problems/constants';
import { randInt } from './problems/utils';
import STYLES from './problems/styles';

export default function ProblemOverlay({
  grade: fallbackGrade = 1,
  onClose, // called when player dismisses (e.g. back to world)
  onProblemSolved, // callback(problemId, correct, grade)
}) {
  const { currentUser } = useAuth();
  const grade = Number(currentUser?.grade || fallbackGrade || 1);
  const [problem, setProblem] = useState(() => generateProblem(grade));
  const [miniGame, setMiniGame] = useState(
    MINI_GAMES[randInt(0, MINI_GAMES.length - 1)],
  );
  const [phase, setPhase] = useState("select"); // select | play | result
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [result, setResult] = useState(null); // { correct, userAnswer }
  const [problemNum, setProblemNum] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const [remoteProblem, setRemoteProblem] = useState(null);
  const [firebaseError, setFirebaseError] = useState(null);

  const exprStr = exprToString(problem.expr).slice(1,-1);
  const correctAnswer = evalExpr(problem.expr);
  const exprLen = exprStr.length;
  const exprSize = exprLen > 20 ? "sz-sm" : exprLen > 12 ? "sz-md" : "sz-lg";
  const playerLevel = Number(currentUser?.level || 1);
  const playerXp = Number(currentUser?.xp || 0);
  const currentLevelXp = Math.max(0, (playerLevel - 1) * 200);
  const nextLevelXp = playerLevel * 200;
  const xpIntoLevel = Math.max(0, playerXp - currentLevelXp);
  const xpNeeded = nextLevelXp - currentLevelXp;
  const xpPct = Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100));

  useEffect(() => {
    let cancelled = false;

    storeProblem(problem.expr, {
      gradeLevel: grade,
      difficulty: grade,
      topic: "arithmetic",
      type: "generated",
    })
      .then((id) => {
        if (!cancelled) {
          setRemoteProblem({ localId: problem.problemId, id });
          setFirebaseError(null);
        }
      })
      .catch((error) => {
        console.warn("Firebase problem write failed", error);
        if (!cancelled) setFirebaseError(error);
      });

    return () => {
      cancelled = true;
    };
  }, [problem.problemId, grade, problem.expr]);

  // ── Start playing selected mini-game ────────────────────────────────────
  function startGame() {
    setPhase("play");
    setAnimKey((k) => k + 1);
  }

  // ── Handle mini-game result ──────────────────────────────────────────────
  async function handleResult(correct, userAnswer) {
    let resolvedCorrect = correct;

    if (remoteProblem?.localId === problem.problemId) {
      try {
        resolvedCorrect = await validateAnswer(remoteProblem.id, userAnswer);
      } catch (error) {
        console.warn("Firebase answer validation failed", error);
        setFirebaseError(error);
        resolvedCorrect = Number(userAnswer) === Number(correctAnswer);
      }
    }

    setResult({ correct: resolvedCorrect, userAnswer });
    setPhase("result");

    if (resolvedCorrect) {
      setScore((s) => s + (streak >= 2 ? 150 : 100));
      setStreak((s) => s + 1);
    } else {
      setLives((l) => l - 1);
      setStreak(0);
    }

    onProblemSolved?.(
      remoteProblem?.localId === problem.problemId ? remoteProblem.id : problem.problemId,
      resolvedCorrect,
      grade,
    );
  }

  // ── Next problem ─────────────────────────────────────────────────────────
  function nextProblem() {
    if (result?.correct) {
      onClose?.();
      return;
    }

    if (lives <= 0 && !result?.correct) {
      onClose?.();
      return;
    }
    setProblem(generateProblem(grade));
    setMiniGame(MINI_GAMES[randInt(0, MINI_GAMES.length - 1)]);
    setPhase("select");
    setResult(null);
    setProblemNum((n) => n + 1);
    setAnimKey((k) => k + 1);
  }

  function retryProblem() {
    setPhase("select");
    setResult(null);
    setAnimKey((k) => k + 1);
  }

  // ── Render mini-game ─────────────────────────────────────────────────────
  function renderMiniGame() {
    const props = {
      problem,
      exprStr,
      correctAnswer,
      grade,
      onResult: handleResult,
    };
    switch (miniGame) {
      case "boulder":
        return <BoulderChase {...props} />;
      case "temple":
        return <TempleLock {...props} />;
      case "relic":
        return <RelicDig {...props} />;
      case "idol":
        return <IdolMatch {...props} />;
      default:
        return null;
    }
  }

  const mgIconMap = {
    boulder: "boulder",
    temple: "lock",
    relic: "shovel",
    idol: "idol",
  };

  return (
    <>
      <style>{STYLES}</style>
      <div
        className="overlay-backdrop"
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div className="overlay-card">
          {/* ── HEADER ── */}
          <div className="ov-header">
            <div className="ov-game-badge">
              <Icon name={mgIconMap[miniGame]} size={16} color="var(--sand)" />
              {phase === "select"
                ? "CHOOSE YOUR CHALLENGE"
                : phase === "result"
                  ? "RESULT"
                  : MINI_GAME_LABELS[miniGame]}
            </div>

            <div className="flex gap-12" style={{ alignItems: "center" }}>
              {/* Score */}
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 8,
                  color: "var(--sand)",
                }}
              >
                {score} XP
              </div>

              {/* Streak */}
              {streak >= 2 && (
                <div
                  style={{
                    fontFamily: "var(--fp)",
                    fontSize: 7,
                    color: "var(--sand3)",
                    border: "2px solid var(--sand2)",
                    padding: "3px 7px",
                    background: "rgba(200,164,86,0.15)",
                    animation: "blink 1s step-end infinite",
                  }}
                >
                  {streak}x STREAK
                </div>
              )}

              {/* Lives */}
              <div className="ov-lives">
                {[1, 2, 3].map((i) => (
                  <Icon
                    key={i}
                    name="heart"
                    size={16}
                    color={i <= lives ? "var(--red2)" : "var(--border)"}
                  />
                ))}
              </div>

              {/* Grade */}
              <div className="ov-grade-badge">GR.{grade}</div>

              <div
                style={{
                  minWidth: 150,
                  border: "2px solid var(--sand2)",
                  background: "rgba(12, 8, 4, 0.86)",
                  boxShadow: "2px 2px 0 0 var(--black)",
                  padding: "6px 8px",
                }}
              >
                <div
                  className="flex-between"
                  style={{
                    fontFamily: "var(--fp)",
                    fontSize: 7,
                    color: "var(--sand)",
                    marginBottom: 5,
                  }}
                >
                  <span>LV {playerLevel}</span>
                  <span>{xpIntoLevel}/{xpNeeded} XP</span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#080604",
                    border: "2px solid var(--border)",
                    boxShadow: "inset 1px 1px 0 0 var(--black)",
                  }}
                >
                  <div
                    style={{
                      width: `${xpPct}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, var(--sand2), var(--sand))",
                    }}
                  />
                </div>
              </div>

              {/* Problem counter */}
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                #{problemNum}
              </div>

              {/* Close */}
              <button
                className="px-btn px-btn-ghost px-btn-sm"
                style={{ padding: "6px 10px", fontSize: 7 }}
                onClick={onClose}
              >
                ✖ FLEE
              </button>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="ov-body">
            {/* Problem Stage — always visible */}
            {phase !== "result" && (
              <div
                key={animKey}
                className="problem-stage"
                style={{ animation: "cardPop 0.2s steps(4)" }}
              >
                <div className="problem-label">★ SOLVE THIS INSCRIPTION ★</div>
                <div className={`problem-expr ${exprSize}`}>{exprStr}</div>
                <div
                  className="problem-expr sz-md"
                  style={{ color: "var(--gray)", marginTop: 8 }}
                >
                  = ?
                </div>
              </div>
            )}

            {firebaseError && (
              <div
                className="feedback-banner wrong"
                style={{ fontSize: 7, padding: "8px 12px" }}
              >
                FIREBASE SYNC OFFLINE - LOCAL VALIDATION ACTIVE
              </div>
            )}

            {/* SELECT PHASE — choose mini-game */}
            {phase === "select" && (
              <>
                <div
                  style={{
                    fontFamily: "var(--fp)",
                    fontSize: 7,
                    color: "var(--gray)",
                    textAlign: "center",
                    letterSpacing: "2px",
                  }}
                >
                  CHOOSE YOUR CHALLENGE MODE
                </div>
                <div className="mg-selector">
                  {MINI_GAMES.map((mg) => (
                    <div
                      key={mg}
                      className={`mg-card ${miniGame === mg ? "selected" : ""}`}
                      onClick={() => setMiniGame(mg)}
                    >
                      <Icon
                        name={mgIconMap[mg]}
                        size={28}
                        color={miniGame === mg ? "var(--sand)" : "var(--gray)"}
                      />
                      <div className="mg-card-label">
                        {MINI_GAME_LABELS[mg]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini-game description */}
                <div className="dialogue-box">
                  <div
                    className="flex gap-12"
                    style={{ alignItems: "flex-start" }}
                  >
                    <Icon name="hat" size={24} color="var(--sand)" />
                    <div
                      className="vt"
                      style={{
                        fontSize: 18,
                        color: "var(--offwhite)",
                        lineHeight: 1.5,
                      }}
                    >
                      {
                        {
                          boulder:
                            "A massive boulder is rolling your way! Type the answer before it flattens you. Speed is everything!",
                          temple:
                            "A locked temple door blocks your path. Use the number pad to punch in the combination and open it!",
                          relic:
                            "Four relics are buried in the rubble, but only one holds the true answer. Excavate wisely!",
                          idol: "Drag the correct golden idol tile into the blank slot to complete the ancient equation!",
                        }[miniGame]
                      }
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PLAY PHASE — render mini-game */}
            {phase === "play" && (
              <div
                key={`play-${animKey}`}
                style={{ animation: "cardPop 0.18s steps(3)" }}
              >
                {renderMiniGame()}
              </div>
            )}

            {/* RESULT PHASE */}
            {phase === "result" && result && (
              <ResultScreen
                correct={result.correct}
                gameName={MINI_GAME_LABELS[miniGame]}
                exprStr={exprStr}
                correctAnswer={correctAnswer}
                userAnswer={result.userAnswer}
                onNext={nextProblem}
                onRetry={retryProblem}
              />
            )}
          </div>

          {/* ── FOOTER ── */}
          {phase === "select" && (
            <div className="ov-footer">
              <button
                className="px-btn px-btn-ghost"
                onClick={onClose}
                style={{ fontSize: 7 }}
              >
                <Icon name="skip" size={12} color="var(--gray)" />
                BACK TO WORLD
              </button>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                GR.{grade} ·{" "}
                {exprStr.length > 16 ? exprStr.slice(0, 16) + "…" : exprStr}
              </div>
              <button
                className="px-btn px-btn-gold"
                onClick={startGame}
                style={{ fontSize: 10, padding: "12px 24px" }}
              >
                <Icon name="boulder" size={14} color="var(--black)" />
                START CHALLENGE
              </button>
            </div>
          )}

          {phase === "play" && (
            <div className="ov-footer">
              <span
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--gray)",
                }}
              >
                {MINI_GAME_LABELS[miniGame]}
              </span>
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontFamily: "var(--fp)",
                  fontSize: 7,
                  color: "var(--border2)",
                }}
              >
                GRADE {grade} · PROBLEM #{problemNum}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
