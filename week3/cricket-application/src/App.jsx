// it will be parent component
// will manage balls and runs
// will also keep function handleHitBall() and handleReset()

// then will send data to scoreboard and functions to the controls

import { useState } from "react";
import "./App.css";

import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";

function App() {
  const [balls, setBalls] = useState(0);
  const [runs, setRuns] = useState(0);

  function handleHitBall() {
    if (balls >= 6) return;

    const randomRun = Math.floor(Math.random() * 7);

    setBalls((prevBalls) => prevBalls + 1);
    setRuns((prevRuns) => prevRuns + randomRun);
  }

  function handleReset() {
    setBalls(0);
    setRuns(0);
  }

  return (
    <div className="container">
      <ScoreBoard balls={balls} runs={runs} />

      <Controls
        handleHitBall={handleHitBall}
        handleReset={handleReset}
        isDisabled={balls >= 6}
      />
    </div>
  );
}

export default App;