import { useState, useCallback } from 'react';
import GameShell from '../../components/GameShell.jsx';
import FeedbackOverlay from '../../components/FeedbackOverlay.jsx';
import Shape from '../../components/Shape.jsx';
import { generatePuzzle } from './levels.js';
import { playWrong } from '../../utils/sounds.js';

export default function OddOneOut({ onBack }) {
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

  function handleTap(item, idx) {
    if (feedback) return;
    if (item.isOdd) {
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
      title="מי לא שייך"
      instruction="מי לא שייך?"
      level={level}
      onLevelChange={handleLevelChange}
      stars={stars}
      onBack={onBack}
    >
      <div className="oddone-grid">
        {puzzle.items.map((item, i) => (
          <button
            key={i}
            className={`choice-btn${wrongIdx === i ? ' wobble' : ''}`}
            onClick={() => handleTap(item, i)}
          >
            {puzzle.type === 'emoji' ? (
              <span className="big-emoji">{item.emoji}</span>
            ) : (
              <Shape shape={item.shape} color={item.color} size={64} />
            )}
          </button>
        ))}
      </div>

      {wrongIdx !== null && <p className="retry-msg">נסה שוב</p>}

      <FeedbackOverlay type={feedback} onDismiss={handleDismiss} />
    </GameShell>
  );
}
