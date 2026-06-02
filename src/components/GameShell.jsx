import LevelPicker from './LevelPicker.jsx';

export default function GameShell({
  title,
  instruction,
  level,
  onLevelChange,
  stars,
  onBack,
  children,
}) {
  const starDisplay = '⭐'.repeat(Math.min(stars, 5)) + (stars > 5 ? ` +${stars - 5}` : '');

  return (
    <div className="shell">
      <div className="shell-header">
        <button className="back-btn" onClick={onBack} aria-label="חזרה לבית">
          🏠
        </button>
        <h2 className="shell-title">{title}</h2>
        <div className="shell-stars">{stars > 0 ? starDisplay : '☆'}</div>
      </div>

      <LevelPicker level={level} onChange={onLevelChange} />

      <p className="shell-instruction">{instruction}</p>

      <div className="shell-body">{children}</div>
    </div>
  );
}
