// it will display 
// click to hit the button
// reset game
// button disable/enable will also show here


function Controls({ handleHitBall, handleReset, isDisabled }) {
  return (
    <div className="controls">
      <p>
        You get total of 6 balls(1 over). The button gets disabled after that
      </p>

      <button onClick={handleHitBall} disabled={isDisabled}>
        Click to hit the ball
      </button>

      <button onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default Controls;