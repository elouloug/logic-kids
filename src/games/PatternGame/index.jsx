import { useState, useCallback } from 'react';
import GameShell from '../../components/GameShell.jsx';
import FeedbackOverlay from '../../components/FeedbackOverlay.jsx';
import Shape from '../../components/Shape.jsx';
import { generatePuzzle } from './levels.js';
import { itemsEqual } from '../../utils/items.js';
import { playCorrect, playWrong } from '../../utils/sounds.js';

const ITEM_SIZE = 52;
const CHOICE_SIZE = 60;

export default function PatternGame({ onBack }) {
  const [level, setLevel] = useState(1);
  const [stars, setStars] = useState(0);
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(1));
  const [feedback, setFeedback] = useState(null);
  const [wrongIdx, setWrongIdx] = useState(null);

  function handleLevelChange(l) {
    setLevel(l);
    setPuzzle(generatePuzzle(l));
    setFeedback(null);
    setWrongIdx(null);
  }

  const handleDismiss = useCallback(() => {
    setFeedback(null);
    setWrongIdx(null);
    setPuzzle(generatePuzzle(level));
  }, [level]);

  function handleChoice(choice, idx) {
    if (feedback) return;
    if (itemsEqual(choice, puzzle.answer)) {
      setStars((s) => s + 1);
      setFeedback('correct');
    } else {
      playWrong();
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 600);
    }
  }

  return (
    <GameShell
      title="המשך הרצף"
      instruction="מה בא אחר כך?"
      level={level}
      onLevelChange={handleLevelChange}
      stars={stars}
      onBack={onBack}
    >
      <div className="pattern-sequence">
        {puzzle.sequence.map((item, i) => (
          <div key={i} className="seq-item">
            <Shape shape={item.shape} color={item.color} size={ITEM_SIZE} />
          </div>
        ))}
        <div className="seq-item seq-blank">?</div>
      </div>

      <div className="choices-row">
        {puzzle.choices.map((choice, i) => (
          <button
            key={i}
            className={`choice-btn${wrongIdx === i ? ' wobble' : ''}`}
            onClick={() => handleChoice(choice, i)}
          >
            <Shape shape={choice.shape} color={choice.color} size={CHOICE_SIZE} />
          </button>
        ))}
      </div>

      {feedback === null && wrongIdx === null ? null : (
        wrongIdx !== null ? <p className="retry-msg">נסה שוב</p> : null
      )}

      <FeedbackOverlay type={feedback} onDismiss={handleDismiss} />
    </GameShell>
  );
}
