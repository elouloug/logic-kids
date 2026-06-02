import { useState, useCallback } from 'react';
import GameShell from '../../components/GameShell.jsx';
import FeedbackOverlay from '../../components/FeedbackOverlay.jsx';
import Shape from '../../components/Shape.jsx';
import { generatePuzzle } from './levels.js';
import { playWrong, playComplete } from '../../utils/sounds.js';

export default function Sorting({ onBack }) {
  const [level, setLevel] = useState(1);
  const [stars, setStars] = useState(0);
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(1));
  const [placed, setPlaced] = useState({});
  const [selected, setSelected] = useState(null);
  const [wrongItem, setWrongItem] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function reset(l) {
    setPuzzle(generatePuzzle(l));
    setPlaced({});
    setSelected(null);
    setWrongItem(null);
    setFeedback(null);
  }

  function handleLevelChange(l) {
    setLevel(l);
    reset(l);
  }

  const handleDismiss = useCallback(() => {
    setFeedback(null);
    reset(level);
  }, [level]);

  function handleItemTap(item) {
    if (placed[item.id]) return;
    setSelected((prev) => (prev === item.id ? null : item.id));
  }

  function handleBinTap(bin) {
    if (!selected) return;
    const item = puzzle.items.find((it) => it.id === selected);
    if (!item) return;

    if (item.correctBin === bin.id) {
      const newPlaced = { ...placed, [item.id]: bin.id };
      setPlaced(newPlaced);
      setSelected(null);
      if (puzzle.items.every((it) => newPlaced[it.id])) {
        setStars((s) => s + 1);
        setFeedback('complete');
      }
    } else {
      playWrong();
      setWrongItem(item.id);
      setTimeout(() => setWrongItem(null), 600);
    }
  }

  const unplaced = puzzle.items.filter((it) => !placed[it.id]);

  return (
    <GameShell
      title="מיון"
      instruction={`מיין לפי ${puzzle.criterion}`}
      level={level}
      onLevelChange={handleLevelChange}
      stars={stars}
      onBack={onBack}
    >
      {/* Bins */}
      <div className="sorting-bins">
        {puzzle.bins.map((bin) => {
          const binItems = puzzle.items.filter((it) => placed[it.id] === bin.id);
          return (
            <div key={bin.id} className="sort-bin" onClick={() => handleBinTap(bin)}>
              <div className="bin-label">
                {bin.type === 'color' && (
                  <span className="bin-color-swatch" style={{ background: bin.color }} />
                )}
                {bin.type === 'size' && (
                  <div className="bin-size-label">
                    <Shape shape={bin.shape} color={bin.color} size={bin.size} />
                    <span className="bin-text">{bin.label}</span>
                  </div>
                )}
                {bin.type === 'sides' && (
                  <div className="bin-size-label">
                    <span className="bin-icon">{bin.icon}</span>
                    <span className="bin-text">{bin.label}</span>
                  </div>
                )}
              </div>
              <div className="bin-contents">
                {binItems.map((it) => (
                  <Shape key={it.id} shape={it.shape} color={it.color} size={Math.min(it.size, 38)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unsorted pile */}
      <div className="sorting-pile">
        {unplaced.map((item) => (
          <button
            key={item.id}
            className={`choice-btn${selected === item.id ? ' selected' : ''}${wrongItem === item.id ? ' wobble' : ''}`}
            onClick={() => handleItemTap(item)}
          >
            <Shape shape={item.shape} color={item.color} size={item.size} />
          </button>
        ))}
        {unplaced.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: '1rem', padding: '0.5rem' }}>✓</p>
        )}
      </div>

      {selected && <p className="hint-msg">עכשיו בחר תיבה ⬆️</p>}
      {wrongItem && <p className="retry-msg">נסה שוב</p>}

      <FeedbackOverlay type={feedback} onDismiss={handleDismiss} />
    </GameShell>
  );
}
