import NumberRaiders from "./components/ui/NumberRaiders";
import ProblemGeneration from "./components/ui/ProblemGeneration";
import { useState } from "react";

export default function App() {
  const [gameState, setGameState] = useState("MENU");

  return (
    <>
      <NumberRaiders />

      {gameState === "PROBLEM_SOLVING" && (
        <ProblemOverlay
          grade={1}
          onClose={() => setGameState("PLAYING")}
          onProblemSolved={(id, correct, grade) => {
            console.log(id, correct, grade);
          }}
        />
      )}
    </>
  );
}
