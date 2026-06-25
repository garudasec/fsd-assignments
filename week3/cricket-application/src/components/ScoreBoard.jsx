// it will display cricket score board
// balls: X
// runs: Y
// here state will not present, it will receive values from App.jsx

function ScoreBoard({ balls, runs }) {
  return (
    <div className="scoreboard">
      <h1>Cricket Score Board</h1>

      <h2>Balls : {balls}</h2>

      <h2>Runs : {runs}</h2>
    </div>
  );
}

export default ScoreBoard;