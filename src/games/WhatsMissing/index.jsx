import { useState, useCallback } from 'react';
import GameShell from '../../components/GameShell.jsx';
import FeedbackOverlay from '../../components/FeedbackOverlay.jsx';
import Shape from '../../components/Shape.jsx';
import { generatePuzzle } from './levels.js';
import { itemsEqual } from '../../utils/items.js';
import { playWrong } from '../../utils/sounds.js';

export default function WhatsMissing({ onBack }) {
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

  const cellSize = level === 1 ? 72 : 56;
  const cols = puzzle.grid[0].length;

  return (
    <GameShell
      title="מה חסר"
      instruction="מה חסר?"
      level={level}
      onLevelChange={handleLevelChange}
      stars={stars}
      onBack={onBack}
    >
      <div
        className="missing-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, ${cellSize + 12}px)` }}
      >
        {puzzle.grid.flat().map((cell, i) =>
          cell ? (
            <div key={i} className="grid-cell">
              <Shape shape={cell.shape} color={cell.color} size={cellSize} />
            </div>
          ) : (
            <div key={i} className="grid-cell grid-blank">?</div>
          )
        )}
      </div>

      <div className="choices-row">
        {puzzle.choices.map((choice, i) => (
          <button
            key={i}
            className={`choice-btn${wrongIdx === i ? ' wobble' : ''}`}
            onClick={() => handleChoice(choice, i)}
          >
            <Shape shape={choice.shape} color={choice.color} size={60} />
          </button>
        ))}
      </div>

      {wrongIdx !== null && <p className="retry-msg">נסה שוב</p>}

      <FeedbackOverlay type={feedback} onDismiss={handleDismiss} />
    </GameShell>
  );
}
