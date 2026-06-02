export default function Shape({ shape, color, size = 56 }) {
  const pad = 5;
  const s = size - pad * 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = s / 2;
  const vb = `0 0 ${size} ${size}`;

  switch (shape) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox={vb}>
          <circle cx={cx} cy={cy} r={r} fill={color} />
        </svg>
      );
    case 'square':
      return (
        <svg width={size} height={size} viewBox={vb}>
          <rect x={pad} y={pad} width={s} height={s} rx={10} fill={color} />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox={vb}>
          <polygon
            points={`${cx},${pad} ${size - pad},${size - pad} ${pad},${size - pad}`}
            fill={color}
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox={vb}>
          <polygon
            points={`${cx},${pad} ${size - pad},${cy} ${cx},${size - pad} ${pad},${cy}`}
            fill={color}
          />
        </svg>
      );
    case 'star': {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const angle = (i * 36 - 90) * (Math.PI / 180);
        const rad = i % 2 === 0 ? r : r * 0.42;
        pts.push(`${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`);
      }
      return (
        <svg width={size} height={size} viewBox={vb}>
          <polygon points={pts.join(' ')} fill={color} />
        </svg>
      );
    }
    default:
      return null;
  }
}
