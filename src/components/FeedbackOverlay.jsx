import { useEffect, useMemo } from 'react';
import { playCorrect, playComplete } from '../utils/sounds.js';

const CONFETTI_COLORS = ['#FF6B6B','#4ECDC4','#FFE66D','#C3A6FF','#FFB3C6','#56CCF2','#95E1D3','#FFA07A'];
const NUM_PIECES = 48;

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: NUM_PIECES }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: `${(i / NUM_PIECES) * 100 + (Math.random() - 0.5) * 8}%`,
      delay: `${(Math.random() * 0.6).toFixed(2)}s`,
      duration: `${(0.9 + Math.random() * 0.7).toFixed(2)}s`,
      size: Math.round(7 + Math.random() * 9),
      rotate: Math.random() > 0.5 ? 'confetti-spin-cw' : 'confetti-spin-ccw',
    }))
  , []);

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`confetti-piece ${p.rotate}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size * (Math.random() > 0.5 ? 1 : 0.45),
            background: p.color,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function FeedbackOverlay({ type, onDismiss }) {
  useEffect(() => {
    if (type === 'correct') {
      playCorrect();
      const t = setTimeout(onDismiss, 1600);
      return () => clearTimeout(t);
    }
    if (type === 'complete') {
      playComplete();
      const t = setTimeout(onDismiss, 2200);
      return () => clearTimeout(t);
    }
  }, [type, onDismiss]);

  if (!type) return null;

  return (
    <div className="feedback-overlay" onClick={onDismiss}>
      <Confetti />
      <div className="feedback-inner">
        <div className="feedback-stars">
          {type === 'complete' ? '🌟🌟🌟' : '⭐'}
        </div>
        <div className="feedback-msg">
          {type === 'complete' ? 'מצוין! סיימת!' : 'כל הכבוד!'}
        </div>
      </div>
    </div>
  );
}
