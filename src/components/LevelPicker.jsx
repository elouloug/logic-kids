const LEVELS = [
  { id: 1, icon: '🌱', label: 'גיל 6' },
  { id: 2, icon: '🌿', label: 'גיל 6-8' },
  { id: 3, icon: '🌳', label: 'גיל 8-10' },
];

export default function LevelPicker({ level, onChange }) {
  return (
    <div className="level-picker">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          className={`level-btn${level === l.id ? ' active' : ''}`}
          onClick={() => onChange(l.id)}
        >
          <span>{l.icon}</span>
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}
