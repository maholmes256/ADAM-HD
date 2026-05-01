import { useState, useSyncExternalStore } from "react";
import { gameState } from "./store/gameState";
import { uiState } from "./store/uiState";
import ProblemOverlay from "./ui/ProblemGeneration";
import NumberRaiders from "./ui/NumberRaiders";
import { useAuth } from "./firebase/AuthContext";

const XP_PER_CORRECT_PROBLEM = 100;

export default function App() {
  const state = useSyncExternalStore(uiState.subscribe, uiState.getSnapshot);
  const [view, setView] = useState("hub");
  const { currentUser, awardXp } = useAuth();

  function returnToHub() {
    uiState.closeProblemOverlay();
    setView("hub");
  }

  function closeOverlayAndConsumeOrb() {
    const activeOrbEntity = uiState.getSnapshot().activeOrbEntity;
    if (activeOrbEntity !== null) {
      gameState.world?.destroyEntity(activeOrbEntity);
      uiState.consumeActiveOrb();
      return;
    }

    uiState.closeProblemOverlay();
  }

  return (
    <>
      <div
        style={{
          display: view === "hub" ? "block" : "none",
          height: "100%",
        }}
      >
        <NumberRaiders
          initialScreen="home"
          onStartGame={() => setView("ecs")}
        />
      </div>

      {view === "ecs" && (
        <button
          onClick={returnToHub}
          style={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 900,
            pointerEvents: "auto",
            background: "#c8a456",
            color: "#0d0a06",
            border: "2px solid #9a7a38",
            boxShadow: "4px 4px 0 0 #5a4020",
            padding: "10px 14px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
          }}
        >
          HOME
        </button>
      )}

      {state.overlayOpen && (
        <ProblemOverlay
          grade={state.activeGrade}
          onClose={closeOverlayAndConsumeOrb}
          onProblemSolved={async (problemId, correct, grade) => {
            console.log(problemId, correct, grade);
            if (!correct || !currentUser?.id) return;

            try {
              await awardXp(XP_PER_CORRECT_PROBLEM);
            } catch (error) {
              console.warn("Firebase XP update failed", error);
            }
          }}
        />
      )}
    </>
  );
}
