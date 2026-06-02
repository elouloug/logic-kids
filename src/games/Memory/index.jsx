import { useState, useCallback } from 'react';
import GameShell from '../../components/GameShell.jsx';
import FeedbackOverlay from '../../components/FeedbackOverlay.jsx';
import { generatePuzzle } from './levels.js';
import { playCorrect, playWrong, playComplete } from '../../utils/sounds.js';

export default function Memory({ onBack }) {
  const [level, setLevel] = useState(1);
  const [stars, setStars] = useState(0);
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(1));
  const [flipped, setFlipped] = useState([]);    // card ids currently face-up (max 2)
  const [matched, setMatched] = useState([]);    // card ids successfully matched
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [wrongPair, setWrongPair] = useState([]);

  function handleLevelChange(l) {
    setLevel(l);
    setPuzzle(generatePuzzle(l));
    setFlipped([]);
    setMatched([]);
    setLocked(false);
    setFeedback(null);
    setWrongPair([]);
  }

  const handleDismiss = useCallback(() => {
    setFeedback(null);
    setPuzzle(generatePuzzle(level));
    setFlipped([]);
    setMatched([]);
    setLocked(false);
    setWrongPair([]);
  }, [level]);

  function handleCardTap(card) {
    if (locked) return;
    if (flipped.includes(card.id) || matched.includes(card.id)) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length < 2) return;

    // Two cards flipped — check match
    setLocked(true);
    const [id1, id2] = newFlipped;
    const card1 = puzzle.cards.find((c) => c.id === id1);
    const card2 = puzzle.cards.find((c) => c.id === id2);

    if (card1.value === card2.value) {
      playCorrect();
      const newMatched = [...matched, id1, id2];
      setMatched(newMatched);
      setFlipped([]);
      setLocked(false);
      if (newMatched.length === puzzle.cards.length) {
        setStars((s) => s + 1);
        setFeedback('complete');
      }
    } else {
      playWrong();
      setWrongPair([id1, id2]);
      setTimeout(() => {
        setFlipped([]);
        setWrongPair([]);
        setLocked(false);
      }, 900);
    }
  }

  const cardSize = level === 1 ? 80 : level === 2 ? 70 : 64;

  return (
    <GameShell
      title="זיכרון"
      instruction="מצא את הזוגות"
      level={level}
      onLevelChange={handleLevelChange}
      stars={stars}
      onBack={onBack}
    >
      <div
        className="memory-grid"
        style={{ gridTemplateColumns: `repeat(${puzzle.cols}, ${cardSize + 8}px)` }}
      >
        {puzzle.cards.map((card) => {
          const isFaceUp = flipped.includes(card.id) || matched.includes(card.id);
          const isMatched = matched.includes(card.id);
          const isWrong = wrongPair.includes(card.id);
          return (
            <button
              key={card.id}
              className={`mem-card${isFaceUp ? ' face-up' : ''}${isMatched ? ' matched' : ''}${isWrong ? ' wobble' : ''}`}
              style={{ width: cardSize, height: cardSize }}
              onClick={() => handleCardTap(card)}
            >
              {isFaceUp ? (
                <span className="mem-emoji">{card.value}</span>
              ) : (
                <span className="mem-back">✦</span>
              )}
            </button>
          );
        })}
      </div>

      <FeedbackOverlay type={feedback} onDismiss={handleDismiss} />
    </GameShell>
  );
}
